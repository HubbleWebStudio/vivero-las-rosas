"""
Reparación dirigida de 3 fotos con defectos de calidad post-Gemini.
- IMG_0882: planta morada chueca → enderezar
- IMG_0888: sombra esquina inferior izquierda → eliminar
- IMG_0892: sombra esquina inferior izquierda → eliminar
"""

import os, sys, time
from pathlib import Path

import subprocess
for pkg in ["google-genai", "google-api-python-client", "google-auth-oauthlib", "pillow"]:
    subprocess.run([sys.executable, "-m", "pip", "install", pkg, "-q", "--break-system-packages"], capture_output=True)

from google import genai
from google.genai import types
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload, MediaFileUpload
from PIL import Image

FOLDER_CRUDO  = "1gLJh_DJPpLdsrGEdEx_WEDqAmOkR3lyH"
FOLDER_OUTPUT = "1SuhZffCyiiIXj09IWmetdmrQLW4kENyt"
TMP_DIR       = "/tmp/vivero_repair"
TOKEN_PATH    = os.path.expanduser("~/.gdrive-token.json")
CREDS_PATH    = os.path.expanduser("~/gdrive-credentials.json")
SCOPES        = ["https://www.googleapis.com/auth/drive"]
GEMINI_MODELS = ["gemini-3.1-flash-image-preview", "gemini-2.5-flash-image"]

os.makedirs(TMP_DIR, exist_ok=True)

# ── API Key ──────────────────────────────────────────────────────────────────
if not os.environ.get("GEMINI_API_KEY"):
    env_path = "/Users/santiagobarragan/Desktop/vivero_las_rosas/.env"
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

# ── Prompts de reparación ─────────────────────────────────────────────────────
PROMPT_ENDEREZAR = """Esta es una foto de producto de una planta en maceta sobre fondo blanco de estudio.

PROBLEMA: La planta o la maceta aparece inclinada/chueca — no está vertical.

CORRECCIÓN REQUERIDA:
1. Endereza la planta y la maceta para que queden perfectamente verticales, como si estuvieran sobre una superficie plana y nivelada.
2. Mantén el fondo blanco alabastro (#F9F9F9) limpio y continuo, sin esquinas visibles.
3. Conserva exactamente los colores, texturas y detalles originales de la planta y la maceta.
4. El resultado debe verse como una foto de catálogo profesional: planta centrada, recta y bien encuadrada.

Do NOT add text, watermarks, logos, or any graphic elements."""

PROMPT_SOMBRA = """Esta es una foto de producto de una planta en maceta sobre una superficie de madera, con fondo blanco de estudio.

PROBLEMA: Hay una sombra indeseada cayendo sobre la superficie de madera en la esquina inferior izquierda.

CORRECCIÓN REQUERIDA:
1. Elimina únicamente la sombra que cae sobre la madera en la esquina inferior izquierda.
2. Restaura el color y la textura natural de la madera en esa zona, como si la iluminación fuera pareja y uniforme en toda la superficie — sin sombra, sin cambio de tono.
3. La madera restaurada debe verse continua y natural, con la misma veta, color y brillo que el resto de la superficie visible.
4. No toques la planta, la maceta, ni el fondo blanco.

Do NOT add text, watermarks, logos, or any graphic elements."""

# ── Fotos a reparar: nombre en Drive → prompt a usar ─────────────────────────
REPAIRS = {
    "IMG_0888_web_producto.webp": {"prompt": PROMPT_SOMBRA, "desc": "sombra sobre madera inf. izq."},
    "IMG_0892_web_producto.webp": {"prompt": PROMPT_SOMBRA, "desc": "sombra sobre madera inf. izq."},
}

# ── Drive auth ────────────────────────────────────────────────────────────────
def get_service():
    creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
    if creds.expired and creds.refresh_token:
        creds.refresh(Request())
    return build("drive", "v3", credentials=creds)

def download_file(service, file_id, dest):
    req = service.files().get_media(fileId=file_id)
    with open(dest, "wb") as fh:
        dl = MediaIoBaseDownload(fh, req)
        done = False
        while not done:
            _, done = dl.next_chunk()
    return dest

def upload_file(service, local_path, folder_id, filename):
    ext = local_path.lower().rsplit(".", 1)[-1]
    mime = "image/webp" if ext == "webp" else "image/jpeg"
    meta = {"name": filename, "parents": [folder_id]}
    media = MediaFileUpload(local_path, mimetype=mime, resumable=True)
    f = service.files().create(body=meta, media_body=media, fields="id,webViewLink").execute()
    return f.get("id"), f.get("webViewLink")

def export_web_producto(image_path):
    img = Image.open(image_path).convert("RGB")
    ow, oh = img.size
    target_ratio = 800 / 1000
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
    out = f"{base}_reparada.webp"
    img.save(out, format="WEBP", quality=82)
    size_kb = os.path.getsize(out) / 1024
    print(f"  Exportado: {out}  ({size_kb:.0f} KB)")
    return out

def gemini_repair(input_path, prompt):
    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    with open(input_path, "rb") as f:
        img_bytes = f.read()
    ext = input_path.lower().rsplit(".", 1)[-1]
    mime_map = {"jpg":"image/jpeg","jpeg":"image/jpeg","png":"image/png","webp":"image/webp"}
    mime_type = mime_map.get(ext, "image/jpeg")
    contents = [types.Part.from_bytes(data=img_bytes, mime_type=mime_type), prompt]
    for model_name in GEMINI_MODELS:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=types.GenerateContentConfig(response_modalities=["IMAGE", "TEXT"])
            )
            for part in response.candidates[0].content.parts:
                if hasattr(part, "inline_data") and part.inline_data:
                    out = input_path.replace(".webp", "_gemini.webp")
                    with open(out, "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"  Gemini OK [{model_name}]")
                    return out
        except Exception as e:
            print(f"  Modelo {model_name} falló: {e}")
            continue
    return None

# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    print("\n=== Reparación dirigida — 3 fotos ===\n")
    service = get_service()

    # Listar productos_crudo para obtener IDs
    results = service.files().list(
        q=f"'{FOLDER_CRUDO}' in parents and mimeType contains 'image/' and trashed=false",
        fields="files(id, name)",
        orderBy="name"
    ).execute()
    drive_files = {f["name"]: f["id"] for f in results.get("files", [])}

    for filename, info in REPAIRS.items():
        print(f"── {filename}  [{info['desc']}]")
        if filename not in drive_files:
            print(f"  No encontrada en productos_crudo — saltando.")
            continue

        file_id = drive_files[filename]
        local_dl = os.path.join(TMP_DIR, filename)
        download_file(service, file_id, local_dl)
        print(f"  Descargada → {local_dl}")

        repaired = gemini_repair(local_dl, info["prompt"])
        if not repaired:
            print(f"  ERROR: Gemini no produjo imagen. Saltando.")
            continue

        web_path = export_web_producto(repaired)

        stem = Path(filename).stem.replace("_web_producto", "")
        upload_name = f"{stem}_reparada_web_producto.webp"
        _, url = upload_file(service, web_path, FOLDER_OUTPUT, upload_name)
        print(f"  Subida → {url}\n")

        if filename != list(REPAIRS.keys())[-1]:
            time.sleep(2)

    print("=== FIN ===")

if __name__ == "__main__":
    main()
