"""
Lote: productos_crudo → fondo limpio + maceta ref (Gemini) → web_producto (WebP 800×1000) → banners_output
Modo edición — sin texto ni overlay.

Variables de entorno:
  MAX_FOTOS=2       procesar solo N fotos (muestra)
  DRY_RUN=1         no subir a Drive, solo guardar localmente para verificación visual
  MACETA_FILE_ID    ID del HEIC de referencia de maceta en Drive (default hardcoded)
"""

import os, io, glob, colorsys, sys, time
import numpy as np
from pathlib import Path

# colour-science se importa después de instalar (ver loop de pip abajo)

# ── Dependencias ────────────────────────────────────────────────────────────
import subprocess
for pkg in ["google-genai", "google-api-python-client", "google-auth-oauthlib", "pillow", "pillow-heif", "numpy", "colour-science"]:
    subprocess.run([sys.executable, "-m", "pip", "install", pkg, "-q", "--break-system-packages"], capture_output=True)

from google import genai
from google.genai import types
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload, MediaFileUpload
from PIL import Image, ImageEnhance
import colour

try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except Exception:
    pass

# ── Configuración ────────────────────────────────────────────────────────────
PROJECT_ROOT   = "/Users/santiagobarragan/Desktop/vivero_las_rosas"
FOLDER_CRUDO     = "1gLJh_DJPpLdsrGEdEx_WEDqAmOkR3lyH"   # productos_crudo
FOLDER_OUTPUT    = "1SuhZffCyiiIXj09IWmetdmrQLW4kENyt"   # banners_output
MACETA_FILE_ID   = os.environ.get("MACETA_FILE_ID", "1ItPe6FIMf5UkK0gmp1fAo-kHoLwRvh8n")  # MACETA.HEIC en vivero
REF_COLOR_FOLDER = os.path.join(PROJECT_ROOT, "marketing", "referencias_color")
TMP_DIR          = os.environ.get("TMP_DIR", "/tmp/vivero_batch")
CREDS_PATH       = os.path.expanduser("~/gdrive-credentials.json")
TOKEN_PATH       = os.path.expanduser("~/.gdrive-token.json")
SCOPES           = ["https://www.googleapis.com/auth/drive"]
DRY_RUN          = os.environ.get("DRY_RUN", "0") == "1"

# Fotos que necesitan cambio de maceta (bolsa negra / maceta negra / canasta)
# Las demás ya tienen la maceta blanca cerámica rombos — solo se les quita el fondo
NEEDS_MACETA = {
    "IMG_1158.HEIC",  # Adenium — bolsa negra
    "IMG_1160.HEIC",  # Euphorbia milii — maceta negra
    "IMG_1162.HEIC",  # Amaryllis — maceta negra
    "IMG_1193.HEIC",  # Tibouchina — bolsa negra
    "IMG_1206.HEIC",  # Maranta — maceta negra
    "IMG_1208.HEIC",  # Hibiscus grande — bolsa negra
    "IMG_1210.HEIC",  # Palmera Areca — bolsa negra
    "IMG_1212.HEIC",  # Rosa rosada — bolsa negra
    "IMG_1214.HEIC",  # Gerbera naranja — canasta mimbre
    "IMG_1217.HEIC",  # Syngonium — maceta negra
}

GEMINI_MODELS  = ["gemini-3.1-flash-image-preview", "gemini-2.5-flash-image", "gemini-3-pro-image-preview"]

# Prompt con reemplazo de maceta y enderezado.
# CRÍTICO: No describir colores/texturas del sujeto existente — Gemini lo reemplaza.
# La maceta de referencia se pasa como segunda imagen al modelo.
PROMPT_CON_MACETA = """The second image attached is a REFERENCE for a white ceramic pot with diamond relief texture. Use it ONLY to know the exact pot model — do not copy its background or lighting.

KEEP INTACT: The plant (leaves, stems, flowers) exactly as photographed. Do NOT alter its color, saturation, or luminosity.

KEEP THE WOODEN BASE: If the original photo has a rustic wooden pallet or table as the base surface, PRESERVE IT exactly — do not remove, replace, or retouch the wood. It must remain visible beneath the pot.

REPLACE THE POT: Substitute the original pot with the white ceramic diamond-texture pot shown in the reference image. Keep proportions natural — the plant should sit naturally in the new pot.

THE POT MUST BE PURE NEUTRAL WHITE: The diamond-texture ceramic pot must be absolutely pure neutral white — no pink, blue, yellow, or any color tint. The diamond relief shadows must be neutral gray only, never colored.

REPLACE THE BACKGROUND: Replace only the background behind the plant with a continuous smooth studio cyclorama (alabaster white #F9F9F9, no corners, no shadows, no gradients).


STRAIGHTEN: If the plant or composition appears tilted, straighten it so the subject is centered and vertical.

Do NOT add text, watermarks, logos, or any graphic elements."""

os.makedirs(TMP_DIR, exist_ok=True)

# ── API Key ──────────────────────────────────────────────────────────────────
if not os.environ.get("GEMINI_API_KEY"):
    env_path = os.path.join(PROJECT_ROOT, ".env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip()

if not os.environ.get("GEMINI_API_KEY"):
    print("ERROR: GEMINI_API_KEY no encontrada.")
    sys.exit(1)

# ── Drive auth ───────────────────────────────────────────────────────────────
def get_drive_service():
    creds = None
    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDS_PATH, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_PATH, "w") as f:
            f.write(creds.to_json())
    return build("drive", "v3", credentials=creds)

# ── Listar fotos en carpeta ───────────────────────────────────────────────────
def list_images(service, folder_id):
    results = service.files().list(
        q=f"'{folder_id}' in parents and mimeType contains 'image/' and trashed=false",
        fields="files(id, name, mimeType)",
        orderBy="name",
        pageSize=200
    ).execute()
    return results.get("files", [])

# ── Descargar foto ────────────────────────────────────────────────────────────
def download_file(service, file_id, dest_path):
    request = service.files().get_media(fileId=file_id)
    with open(dest_path, "wb") as fh:
        dl = MediaIoBaseDownload(fh, request)
        done = False
        while not done:
            _, done = dl.next_chunk()
    return dest_path

# ── Métricas de color en Oklch (espacio perceptualmente uniforme) ─────────────
def plant_chroma_avg(img_path):
    """Mide el Chroma promedio en Oklch, excluyendo fondo blanco, negro puro y madera.
    Oklch es perceptualmente uniforme — Chroma equivale a la 'saturación percibida'
    sin los artefactos de HSV (no linealidades cerca de primarios, hue shifts).
    Muestreo 1 de cada 3 píxeles para velocidad."""
    img = Image.open(img_path).convert("RGB")
    arr = np.array(img, dtype=np.float32)[::3, ::3] / 255.0  # submuestreo

    oklch = colour.convert(arr, 'sRGB', 'Oklch')
    L = oklch[..., 0]
    C = oklch[..., 1]
    H = oklch[..., 2]  # hue en grados (0–360)

    # Excluir:
    # - fondo blanco de estudio (L > 0.93)
    # - negro puro (L < 0.06)
    # - tonos madera/tierra: hue 25°–75° con luminosidad media (madera natural)
    is_wood = (H >= 25) & (H <= 75) & (L > 0.25) & (L < 0.80) & (C > 0.03)
    mask = (L < 0.93) & (L > 0.06) & ~is_wood
    C_plant = C[mask]
    return float(C_plant.mean()) if C_plant.size > 0 else 0.0

def measure_reference_target(ref_folder):
    """Promedia el Chroma Oklch de TODAS las imágenes en la carpeta de referencias.
    Más referencias = target más robusto y representativo de la marca."""
    exts = {".jpg", ".jpeg", ".png", ".webp"}
    ref_files = [f for f in Path(ref_folder).iterdir() if f.suffix.lower() in exts]
    if not ref_files:
        print(f"ERROR: No hay imágenes de referencia en {ref_folder}")
        sys.exit(1)
    chromas = []
    for rf in ref_files:
        c = plant_chroma_avg(str(rf))
        chromas.append(c)
        print(f"  Ref [{rf.name}]: chroma_oklch={c:.4f}")
    avg = sum(chromas) / len(chromas)
    print(f"  → Target Chroma Oklch promedio ({len(chromas)} refs): {avg:.4f}")
    return avg

# ── Color grading en Oklch — Pre-edición ANTES de Gemini ─────────────────────
# Gemini desatura ~15-20% al regenerar el fondo. Compensamos pre-boosteando
# en espacio Oklch (perceptualmente uniforme) con curva sigmoide:
# - Colores apagados: boost proporcional hacia target
# - Colores vívidos: soft-clip suave — sin fluorescencia, sin hue shifts
# Referencia: Poynton "Digital Video and HD" cap. 7; Oklab/Oklch (Björn Ottosson 2020)

GEMINI_COMPENSATION = 1.20  # Compensación para la desaturación de Gemini
                             # Subir a 1.30 si el lote sale apagado; bajar a 1.10 si sale brillante
OKLCH_C_MAX        = 0.40   # Techo absoluto de Chroma — por encima es gamut out-of-range para sRGB
SIGMOID_K          = 12.0   # Pendiente de la curva (mayor k = transición más nítida al techo)

def _sigmoid_chroma_map(C_in, C_avg_in, C_target, C_max=OKLCH_C_MAX, k=SIGMOID_K):
    """Curva sigmoide calibrada para mapear chroma de entrada a salida.

    Propiedades matemáticas:
    - En C_in = C_avg_in: C_out = C_target (pivote exacto)
    - C_in → ∞: C_out → C_max (soft-clip perceptual)
    - C_in → 0:  C_out → 0   (preserva negros y grises)
    - Derivada continua — sin escalones visuales

    Fórmula: C_out = C_max · sigmoid(k · (C_in − x0))
    donde x0 = C_avg_in − logit(C_target/C_max) / k
    """
    ratio = float(np.clip(C_target / C_max, 0.01, 0.99))
    x0 = C_avg_in - np.log(ratio / (1.0 - ratio)) / k
    return C_max / (1.0 + np.exp(-k * (C_in - x0)))

def pre_edit_color(img_path, target_chroma):
    """Color grading quirúrgico en Oklch con curva sigmoide.

    PIPELINE:
      sRGB → Oklch  →  sigmoid(C)  →  Oklch → sRGB
    El canal L (lightness percibida) y h (hue) no se tocan — solo C (chroma).

    REGLA CRÍTICA: Si el color del lote sale desaturado, ajustar solo
    GEMINI_COMPENSATION. NUNCA añadir descripciones de color al prompt de Gemini
    — eso hace que Gemini reemplace superficies existentes (madera, plantas).
    """
    img_chroma = plant_chroma_avg(img_path)
    if img_chroma < 0.005:
        print(f"  Pre-edit: chroma muy baja ({img_chroma:.4f}), sin ajuste.")
        return

    C_target = target_chroma * GEMINI_COMPENSATION
    print(f"  Pre-edit Oklch: C_avg={img_chroma:.4f} → C_target={C_target:.4f}  (k={SIGMOID_K})")

    img = Image.open(img_path).convert("RGB")
    arr = np.array(img, dtype=np.float64) / 255.0

    # sRGB → Oklch
    oklch = colour.convert(arr, 'sRGB', 'Oklch').copy()
    L = oklch[..., 0]
    C_in = oklch[..., 1].copy()
    H = oklch[..., 2]

    # Máscara de madera/tierra — excluir del boost (hue 25°–75°, luminosidad media)
    is_wood = (H >= 25) & (H <= 75) & (L > 0.25) & (L < 0.80) & (C_in > 0.03)

    # Aplicar curva sigmoide al canal Chroma — solo píxeles que no son madera
    C_out = _sigmoid_chroma_map(C_in, img_chroma, C_target)
    oklch[..., 1] = np.where(is_wood, C_in, C_out)  # madera: sin cambio

    # Oklch → sRGB (con clip para mantener en gamut)
    result = colour.convert(oklch, 'Oklch', 'sRGB')
    result = np.clip(result, 0.0, 1.0)

    Image.fromarray((result * 255).astype(np.uint8)).save(img_path, "JPEG", quality=95)

    C_out_avg = float(_sigmoid_chroma_map(
        np.array([img_chroma]), img_chroma, C_target)[0])
    print(f"  → C promedio estimado post-edit: {C_out_avg:.4f}  (ceiling={OKLCH_C_MAX})")

def neutralize_whites(img_path):
    """Neutraliza el cast de color en píxeles muy claros (maceta blanca, fondo).
    Detecta píxeles con L > 0.78 y C < 0.12 en Oklch y empuja su chroma a 0
    de forma gradual (no abrupta) para eliminar tonos rosados/azulados sin tocar la planta."""
    img = Image.open(img_path).convert("RGB")
    arr = np.array(img, dtype=np.float64) / 255.0

    oklch = colour.convert(arr, 'sRGB', 'Oklch').copy()
    L = oklch[..., 0]
    C = oklch[..., 1]

    # Zona blanca: alta luminosidad, chroma baja — maceta y fondo
    is_white_zone = (L > 0.78) & (C < 0.12)
    # Factor de reducción suave: a más L y menos C, más agresiva la neutralización
    strength = np.clip((L - 0.78) / 0.22, 0.0, 1.0)  # 0 en L=0.78, 1 en L=1.0
    oklch[..., 1] = np.where(is_white_zone, C * (1.0 - strength * 0.85), C)

    result = np.clip(colour.convert(oklch, 'Oklch', 'sRGB'), 0.0, 1.0)
    Image.fromarray((result * 255).astype(np.uint8)).save(img_path, "JPEG", quality=95)
    print(f"  Neutralize whites: cast de color eliminado en zonas claras.")

def post_verify_color(edited_path, target_chroma, tolerance=0.15):
    """Safety net post-Gemini en Oklch.
    Si Gemini desaturó más de lo esperado, aplica un boost adicional con la
    misma curva sigmoide. Opera en Oklch — sin hue shifts ni banding."""
    out_chroma = plant_chroma_avg(edited_path)
    threshold  = target_chroma * (1.0 - tolerance)

    if out_chroma >= threshold:
        print(f"  Post-verify: C={out_chroma:.4f} ✓ (target={target_chroma:.4f})")
        return

    # Gemini desaturó más de lo esperado — segunda pasada sigmoide
    img = Image.open(edited_path).convert("RGB")
    arr = np.array(img, dtype=np.float64) / 255.0
    oklch = colour.convert(arr, 'sRGB', 'Oklch').copy()
    oklch[..., 1] = _sigmoid_chroma_map(oklch[..., 1], out_chroma, target_chroma)
    result = np.clip(colour.convert(oklch, 'Oklch', 'sRGB'), 0.0, 1.0)
    Image.fromarray((result * 255).astype(np.uint8)).save(edited_path, "JPEG", quality=93)

    new_chroma = plant_chroma_avg(edited_path)
    print(f"  Post-verify: C={out_chroma:.4f} < {threshold:.4f} → boost sigmoide → {new_chroma:.4f} ✓")

# ── Export web_producto ───────────────────────────────────────────────────────
def export_web_producto(image_path):
    """800×1000 WebP, ratio 4:5, quality 82."""
    img = Image.open(image_path).convert("RGB")
    ow, oh = img.size
    target_ratio = 800 / 1000  # 0.8

    orig_ratio = ow / oh
    if orig_ratio > target_ratio:
        new_w = int(oh * target_ratio)
        left = (ow - new_w) // 2
        img = img.crop((left, 0, left + new_w, oh))
    elif orig_ratio < target_ratio:
        new_h = int(ow / target_ratio)
        top = (oh - new_h) // 2
        img = img.crop((0, top, ow, top + new_h))

    img = img.resize((800, 1000), Image.LANCZOS)
    base = os.path.splitext(image_path)[0]
    out = f"{base}_web_producto.webp"
    img.save(out, format="WEBP", quality=82)
    size_kb = os.path.getsize(out) / 1024
    print(f"  Exportado web_producto: {out}  ({size_kb:.0f} KB)")
    return out

# ── Gemini edit ───────────────────────────────────────────────────────────────
def gemini_edit(input_path, maceta_path=None):
    """Gemini reemplaza fondo, cambia maceta (si hay referencia) y endereza.

    La referencia de COLOR no se pasa a Gemini — se aplica en Pillow (post_verify_color).
    La referencia de MACETA sí se pasa: es instrucción estructural, no de color.
    """
    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

    def mime(path):
        ext = path.lower().rsplit(".", 1)[-1]
        return {"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png",
                "heic":"image/heic","webp":"image/webp"}.get(ext, "image/jpeg")

    with open(input_path, "rb") as f:
        img_bytes = f.read()

    contents = [types.Part.from_bytes(data=img_bytes, mime_type=mime(input_path))]

    if maceta_path and os.path.exists(maceta_path):
        with open(maceta_path, "rb") as f:
            mac_bytes = f.read()
        contents.append(types.Part.from_bytes(data=mac_bytes, mime_type=mime(maceta_path)))
        contents.append(PROMPT_CON_MACETA)
        print(f"  Usando referencia de maceta: {os.path.basename(maceta_path)}")
    else:
        contents.append(PROMPT_FONDO_LIMPIO)

    for model_name in GEMINI_MODELS:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=types.GenerateContentConfig(response_modalities=["IMAGE", "TEXT"])
            )
            for part in response.candidates[0].content.parts:
                if hasattr(part, "inline_data") and part.inline_data:
                    out = input_path.replace(".", "_gemini.")
                    with open(out, "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"  Gemini OK [{model_name}]")
                    return out
        except Exception as e:
            print(f"  Modelo {model_name} falló: {e}")
            continue
    return None


PROMPT_FONDO_LIMPIO = """MANTENER INTACTO EL SUJETO: Conserva exactamente los píxeles originales de la planta, la flor y la base de madera. Queda estrictamente prohibido alterar la saturación, el tono o la luminosidad de la planta o la madera.

LA MACETA ES BLANCA CERÁMICA PURA: La maceta con textura de rombos debe ser de un blanco neutro absolutamente puro — sin tonos rosados, azulados, amarillos ni de ningún color. Las sombras de los rombos deben ser grises neutros, no rosadas ni coloreadas. Si la maceta original tiene cualquier tinte de color, corrígelo a blanco neutro puro.

REEMPLAZAR ÚNICAMENTE EL FONDO: Sustituir el fondo por un ciclorama de estudio fotográfico continuo y liso (sin esquinas). El color exacto de la superficie es un 'blanco alabastro' o 'blanco roto' mate y ultra-limpio (equivalente visual al color hexadecimal #F9F9F9). Es un tono neutro, sin subtonos azules, amarillos ni grises oscuros.

Do NOT add text, watermarks, logos, or any graphic elements."""

# ── Upload ────────────────────────────────────────────────────────────────────
def upload_file(service, local_path, folder_id, filename=None):
    if not filename:
        filename = os.path.basename(local_path)
    ext = local_path.lower().rsplit(".", 1)[-1]
    mime = "image/webp" if ext == "webp" else "image/jpeg"
    meta = {"name": filename, "parents": [folder_id]}
    media = MediaFileUpload(local_path, mimetype=mime, resumable=True)
    f = service.files().create(body=meta, media_body=media, fields="id,webViewLink").execute()
    return f.get("id"), f.get("webViewLink")

# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    print("\n=== Lote productos_crudo — inicio ===\n")

    # ── Medir target de Chroma Oklch desde carpeta de referencias ────────────
    print("Leyendo referencias de color (Oklch)...")
    TARGET_CHROMA = measure_reference_target(REF_COLOR_FOLDER)
    print(f"\nTarget Chroma Oklch: {TARGET_CHROMA:.4f}")
    print(f"Pre-target Gemini (×{GEMINI_COMPENSATION}): {TARGET_CHROMA * GEMINI_COMPENSATION:.4f}")
    print(f"  → Curva sigmoide calibrada al pivote C={TARGET_CHROMA:.4f}  ceiling={OKLCH_C_MAX}\n")

    service = get_drive_service()

    # ── Descargar maceta de referencia ────────────────────────────────────────
    maceta_local = os.path.join(TMP_DIR, "MACETA_ref.HEIC")
    if not os.path.exists(maceta_local):
        print(f"Descargando maceta de referencia (ID: {MACETA_FILE_ID})...")
        download_file(service, MACETA_FILE_ID, maceta_local)
        print(f"  Maceta descargada → {maceta_local}\n")
    else:
        print(f"Maceta de referencia ya en caché: {maceta_local}\n")

    files = list_images(service, FOLDER_CRUDO)
    if not files:
        print("No se encontraron imágenes en productos_crudo.")
        return

    print(f"Fotos encontradas: {len(files)}")
    for f in files:
        print(f"  • {f['name']}")

    if DRY_RUN:
        print(f"\n⚠️  DRY_RUN=1 — los resultados se guardan localmente, NO se suben a Drive.")
    print(f"\nDestino Drive: banners_output ({FOLDER_OUTPUT})\n")

    results = []
    offset = int(os.environ.get("OFFSET_FOTOS", 0))
    max_fotos = int(os.environ.get("MAX_FOTOS", 0)) or len(files)
    files = files[offset:offset + max_fotos]
    for i, file in enumerate(files, 1):
        name = file["name"]
        file_id = file["id"]
        print(f"[{i}/{len(files)}] Procesando: {name}")

        # 1. Descargar
        local_dl = os.path.join(TMP_DIR, name)
        download_file(service, file_id, local_dl)
        print(f"  Descargado → {local_dl}")

        # 2. Pre-editar color ANTES de Gemini
        pre_edit_color(local_dl, TARGET_CHROMA)

        # 3. Gemini — prompt según clasificación
        usar_maceta = name in NEEDS_MACETA
        print(f"  Modo: {'🔄 reemplazar maceta' if usar_maceta else '✅ ya tiene maceta — solo fondo'}")
        edited = gemini_edit(local_dl, maceta_path=maceta_local if usar_maceta else None)
        if not edited:
            print(f"  ERROR: Gemini no produjo imagen para {name}. Saltando.")
            results.append({"file": name, "status": "error_gemini", "url": None, "local": None})
            continue

        # 4. Neutralizar cast de color en zonas blancas (maceta, fondo)
        neutralize_whites(edited)

        # 5. Verificación automática de color post-Gemini (safety net)
        post_verify_color(edited, TARGET_CHROMA)

        # 6. Export web_producto
        web_path = export_web_producto(edited)
        print(f"  ✅ Output listo para verificación visual: {web_path}")

        if DRY_RUN:
            results.append({"file": name, "status": "dry_run", "url": None, "local": web_path})
            print(f"  [DRY_RUN] No subido. Verificar visualmente antes de hacer upload.\n")
        else:
            # 6. Upload a banners_output
            stem = Path(name).stem
            upload_name = f"{stem}_web_producto.webp"
            fid, url = upload_file(service, web_path, FOLDER_OUTPUT, upload_name)
            print(f"  Subido → {url}")
            results.append({"file": name, "status": "ok", "url": url, "local": web_path})
            print()

        # Pausa breve entre llamadas a Gemini
        if i < len(files):
            time.sleep(2)

    # Resumen
    print("\n=== RESUMEN ===")
    ok = [r for r in results if r["status"] == "ok"]
    dry = [r for r in results if r["status"] == "dry_run"]
    err = [r for r in results if r["status"] not in ("ok", "dry_run")]
    print(f"Procesadas: {len(ok) + len(dry)}/{len(files)}")
    for r in ok:
        print(f"  ✅ {r['file']} → {r['url']}")
    for r in dry:
        print(f"  📁 {r['file']} → {r['local']}  [pendiente verificación]")
    for r in err:
        print(f"  ❌ {r['file']} — {r['status']}")
    if dry:
        print(f"\n⚠️  {len(dry)} foto(s) en DRY_RUN — verificar visualmente y luego correr sin DRY_RUN=1 para subir.")
    print("\n=== FIN ===")

if __name__ == "__main__":
    main()
