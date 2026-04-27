import os, sys, glob

# ── 0. Cargar .env si GEMINI_API_KEY no está en el entorno ──────────────────
if not os.environ.get("GEMINI_API_KEY"):
    env_path = os.path.join(os.path.dirname(__file__), "../../.env")
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

# ── 1. Instalar dependencias ─────────────────────────────────────────────────
import subprocess
for pkg in ["google-genai", "google-api-python-client",
            "google-auth-oauthlib", "pillow", "pillow-heif"]:
    subprocess.run([sys.executable, "-m", "pip", "install", pkg, "-q",
                    "--break-system-packages"], capture_output=True)

# ── 2. Drive auth ─────────────────────────────────────────────────────────────
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload, MediaFileUpload
import io

SCOPES = ["https://www.googleapis.com/auth/drive"]
CREDS_PATH = os.path.expanduser("~/gdrive-credentials.json")
TOKEN_PATH = os.path.expanduser("~/.gdrive-token.json")

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

service = get_drive_service()
print("Drive autenticado ✓")

# ── 3. Descargar ciclamen de productos_crudo ─────────────────────────────────
CICLAMEN_ID = "1kKMkn_KkKAmITQSvM0BglWRZ21leQL3m"
BANNERS_OUTPUT_ID = "1SuhZffCyiiIXj09IWmetdmrQLW4kENyt"
TMP_DIR = os.path.dirname(os.path.abspath(__file__))

heic_path = os.path.join(TMP_DIR, "ciclamen_original.heic")
request = service.files().get_media(fileId=CICLAMEN_ID)
with open(heic_path, "wb") as fh:
    dl = MediaIoBaseDownload(fh, request)
    done = False
    while not done:
        _, done = dl.next_chunk()
print(f"Descargado: {heic_path}")

# ── 4. Convertir HEIC → JPEG ─────────────────────────────────────────────────
from pillow_heif import register_heif_opener
register_heif_opener()
from PIL import Image, ImageEnhance

jpeg_path = heic_path.replace(".heic", ".jpg")
img_orig = Image.open(heic_path).convert("RGB")
img_orig.save(jpeg_path, "JPEG", quality=95)
print(f"Convertido a JPEG: {jpeg_path}")

# ── 5. Cargar referencia de color (local) ────────────────────────────────────
PROJECT_ROOT = os.path.abspath(os.path.join(TMP_DIR, "../../"))
ref_folder = os.path.join(PROJECT_ROOT, "marketing", "referencias_color")
color_ref_path = None
for ext in ["*.jpg", "*.jpeg", "*.png", "*.JPG", "*.JPEG", "*.PNG"]:
    matches = glob.glob(os.path.join(ref_folder, ext))
    if matches:
        color_ref_path = matches[0]
        break
if color_ref_path:
    print(f"Referencia de color: {os.path.basename(color_ref_path)}")
else:
    print("Sin referencia de color local — continuando sin ella")

# ── 6. Editar con Gemini ──────────────────────────────────────────────────────
from google import genai
from google.genai import types

PROMPT = """MANTENER INTACTO EL SUJETO: Conserva exactamente los píxeles originales de la planta, \
la flor, la maceta y la base de madera. Queda estrictamente prohibido alterar la \
saturación, el tono o la luminosidad del sujeto.

REEMPLAZAR ÚNICAMENTE EL FONDO: Sustituir el fondo por un ciclorama de estudio \
fotográfico continuo y liso (sin esquinas). El color exacto de la superficie es un \
'blanco alabastro' o 'blanco roto' mate y ultra-limpio (equivalente visual al color \
hexadecimal #F9F9F9). Es un tono neutro, sin subtonos azules, amarillos ni grises oscuros."""

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

contents = []

# Agregar referencia de color si existe
if color_ref_path:
    ext_ref = color_ref_path.lower().split(".")[-1]
    mime_ref = "image/png" if ext_ref == "png" else "image/jpeg"
    with open(color_ref_path, "rb") as f:
        ref_bytes = f.read()
    contents.append(types.Part.from_bytes(data=ref_bytes, mime_type=mime_ref))
    contents.append("Esta es la imagen de REFERENCIA DE COLOR Y MOOD. Úsala para igualar la temperatura de luz, el contraste y la paleta cromática en la edición.")

# Agregar imagen principal
with open(jpeg_path, "rb") as f:
    img_bytes = f.read()
contents.append(types.Part.from_bytes(data=img_bytes, mime_type="image/jpeg"))
contents.append(PROMPT)

MODELS = ["gemini-3.1-flash-image-preview", "gemini-2.5-flash-preview-05-20", "gemini-2.0-flash-exp-image-generation"]
gemini_out = None

for model_name in MODELS:
    try:
        print(f"Intentando modelo: {model_name}")
        resp = client.models.generate_content(
            model=model_name,
            contents=contents,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
            )
        )
        for part in resp.candidates[0].content.parts:
            if hasattr(part, "inline_data") and part.inline_data:
                gemini_out = os.path.join(TMP_DIR, "ciclamen_gemini.jpg")
                with open(gemini_out, "wb") as f:
                    f.write(part.inline_data.data)
                print(f"Imagen generada [{model_name}]: {gemini_out}")
                break
        if gemini_out:
            break
    except Exception as e:
        print(f"  {model_name} falló: {e}")

if not gemini_out:
    print("ERROR: Ningún modelo Gemini funcionó.")
    sys.exit(1)

# ── 7. Boost de saturación post-Gemini ───────────────────────────────────────
img_edit = Image.open(gemini_out).convert("RGB")
enhancer = ImageEnhance.Color(img_edit)
img_boosted = enhancer.enhance(1.25)
final_path = os.path.join(TMP_DIR, "ciclamen_editado.jpg")
img_boosted.save(final_path, "JPEG", quality=93)
print(f"Saturación boosteada ×1.25: {final_path}")

# ── 8. Upscale a 2K (2048px lado largo) ──────────────────────────────────────
w, h = img_boosted.size
if w >= h:
    new_w, new_h = 2048, int(2048 * h / w)
else:
    new_w, new_h = int(2048 * w / h), 2048
img_2k = img_boosted.resize((new_w, new_h), Image.LANCZOS)
final_path = os.path.join(TMP_DIR, "ciclamen_editado_2k.jpg")
img_2k.save(final_path, "JPEG", quality=93)
print(f"Upscale 2K: {new_w}×{new_h}px → {final_path}")

# ── 9. Subir a banners_output ─────────────────────────────────────────────────
file_metadata = {
    "name": "ciclamen_fondo_limpio_2k.jpg",
    "parents": [BANNERS_OUTPUT_ID]
}
media = MediaFileUpload(final_path, mimetype="image/jpeg", resumable=True)
uploaded = service.files().create(
    body=file_metadata,
    media_body=media,
    fields="id, webViewLink"
).execute()

print(f"\n✅ Subido a banners_output:")
print(f"   {uploaded.get('webViewLink')}")
