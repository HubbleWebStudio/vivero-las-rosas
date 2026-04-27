import os, sys

# ── Drive auth ────────────────────────────────────────────────────────────────
if not os.environ.get("GEMINI_API_KEY"):
    env_path = os.path.join(os.path.dirname(__file__), "../../.env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip()

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from PIL import Image

SCOPES = ["https://www.googleapis.com/auth/drive"]
TOKEN_PATH = os.path.expanduser("~/.gdrive-token.json")
CREDS_PATH = os.path.expanduser("~/gdrive-credentials.json")

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
BANNERS_OUTPUT_ID = "1SuhZffCyiiIXj09IWmetdmrQLW4kENyt"
TMP_DIR = os.path.dirname(os.path.abspath(__file__))

# ── Cargar imagen procesada ───────────────────────────────────────────────────
src_path = os.path.join(TMP_DIR, "ciclamen_editado_2k.jpg")
img = Image.open(src_path).convert("RGB")
src_w, src_h = img.size
print(f"Fuente: {src_w}×{src_h}px")

def crop_center(img, target_w, target_h):
    """Recorta al centro para ajustar al aspect ratio objetivo, luego redimensiona."""
    src_w, src_h = img.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h

    if src_ratio > target_ratio:
        # imagen más ancha — recortar lados
        new_w = int(src_h * target_ratio)
        left = (src_w - new_w) // 2
        img = img.crop((left, 0, left + new_w, src_h))
    else:
        # imagen más alta — recortar arriba/abajo
        new_h = int(src_w / target_ratio)
        top = (src_h - new_h) // 2
        img = img.crop((0, top, src_w, top + new_h))

    return img.resize((target_w, target_h), Image.LANCZOS)

def upload(local_path, filename):
    media = MediaFileUpload(local_path, mimetype="image/jpeg", resumable=True)
    f = service.files().create(
        body={"name": filename, "parents": [BANNERS_OUTPUT_ID]},
        media_body=media,
        fields="id, webViewLink"
    ).execute()
    return f.get("webViewLink")

# ── Versión Instagram Feed Vertical (1080×1350 · 4:5) ────────────────────────
ig_path = os.path.join(TMP_DIR, "ciclamen_instagram.jpg")
ig_img = crop_center(img, 1080, 1350)
ig_img.save(ig_path, "JPEG", quality=93)
print(f"Instagram 4:5 → 1080×1350px")

ig_url = upload(ig_path, "ciclamen_instagram_1080x1350.jpg")
print(f"✅ Instagram subido: {ig_url}")

# ── Versión Web Producto (800×800 · 1:1) ─────────────────────────────────────
web_path = os.path.join(TMP_DIR, "ciclamen_web_producto.jpg")
web_img = crop_center(img, 800, 800)
web_img.save(web_path, "JPEG", quality=92)
print(f"Web Producto 1:1 → 800×800px")

web_url = upload(web_path, "ciclamen_web_producto_800x800.jpg")
print(f"✅ Web Producto subido: {web_url}")
