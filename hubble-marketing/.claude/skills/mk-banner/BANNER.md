---
name: mk-banner
description: Edición de imágenes y producción de banners para Vivero Las Rosas. Usa Gemini API para editar fondos, color grade y efectos visuales. Puede operar en modo edición standalone (solo procesar foto) o modo banner completo (foto + overlay + Notion). Actívalo cuando el usuario diga "genera el banner", "edita esta foto", "quítale el fondo", "haz la imagen del post", "procesa las fotos pendientes", o cuando `../STATE-marketing.md` muestre mk-estrategia ✅.
---

# Skill: mk-banner
## Edición de Imágenes + Producción de Banners · Gemini API + Google Drive + Pillow

Este skill tiene tres modos de operación:

**Modo lote** — procesa todas las fotos en `productos_crudo`: pre-edita color → Gemini quita fondo → exporta WebP 800×1000 → sube a `banners_output`. Activar cuando el usuario diga "corre el lote", "procesa las fotos", "batch".

**Modo corrección individual** — el usuario señala un problema en una foto ya procesada ("se ve chueca", "el fondo quedó gris", "la planta quedó cortada", etc.). Claude Code debe:
1. Descargar la foto del Drive y leerla visualmente
2. Diagnosticar el problema por sí mismo — no pedir explicaciones adicionales
3. Construir un prompt Gemini específico para ese defecto concreto
4. Reprocesar y subir el resultado reemplazando el anterior
Activar cuando el usuario mencione el nombre de una foto + un problema de calidad, aunque sea vago ("arréglala", "quedó rara", "chueca").

**Modo banner completo** — pipeline completo: descarga foto de Drive → edita con Gemini → corrección de color con Pillow → overlay de texto con tipografía de marca → sube resultado → actualiza Notion.

Nunca usa el MCP de Drive para transferir imágenes — solo para obtener IDs y metadatos.

---

## Modo Corrección Individual — Protocolo

Cuando el usuario diga algo como *"la IMG_0892 se ve chueca, arréglala"*:

**1. Ver antes de actuar.** Descargar la imagen y leerla visualmente. No preguntar qué está mal — diagnosticarlo.

**2. Diagnosticar con precisión.** Identificar el defecto real:
- Planta inclinada / mal centrada → corrección de composición
- Fondo con manchas o tonos inconsistentes → regenerar fondo
- Planta cortada en el encuadre → ajustar crop o pedir regeneración
- Maceta invisible / mal separada del fondo → reforzar contraste en el prompt
- Sombras duras o artificiales → suavizar en el prompt
- Artefactos de Gemini (partes clonadas, texturas extrañas) → regenerar con prompt más restrictivo

**3. Construir el prompt corrector.** Usar PROMPT_BASE como base y agregar instrucciones específicas para el defecto detectado. Ejemplos:

- Para planta inclinada: añadir `"The plant appears tilted in the original — keep it exactly as photographed, do not straighten or recompose."`
- Para fondo con manchas: añadir `"The background must be perfectly uniform #F9F9F9 — no shadows, no gradients, no texture variations anywhere."`
- Para artefactos: añadir `"Do NOT clone, mirror or repeat any part of the plant. Every leaf and stem must appear exactly once."`

**4. Verificación visual obligatoria antes de subir.** Después de que Gemini genera el output, leer el archivo de imagen con la herramienta Read y compararlo visualmente contra las referencias. Verificar:
- ¿La planta es la misma que en la foto original? (Gemini a veces genera una planta diferente)
- ¿La maceta es la correcta?
- ¿El fondo es blanco #F9F9F9 limpio?
- ¿La base de madera es la misma que en la original?

Si alguno de estos falla → NO subir a Drive. Reportar al usuario con descripción específica del problema y preguntar cómo proceder.

Si solo hay diferencia de color → corregir automáticamente con `post_verify_color()` y subir.

**5. Regla de oro ante feedback de color:** Si el usuario dice que el color quedó desaturado o apagado, la ÚNICA acción permitida es ajustar `GEMINI_COMPENSATION` en `pre_edit_color()`. NUNCA modificar el prompt de Gemini por razones de color — hacerlo causa que Gemini reemplace plantas, madera y fondos por versiones inventadas.

---

## Filosofía de Ejecución

**Python maneja los archivos, Claude maneja la estrategia.** El MCP de Drive solo se usa para buscar IDs de carpetas y actualizar Notion. Todo transfer de imagen (subir/bajar) pasa por Python + google-api-python-client directamente — HTTP nativo, sin base64 por contexto.

**Una imagen a la vez por defecto.** El modo iterativo es el default: presenta el concepto, espera aprobación, genera, muestra resultado. El modo lote es opcional y requiere confirmación explícita.

**Detectar el modo antes de ejecutar.** Si el usuario dice "edita la foto" o "sin texto" o "solo el fondo" → modo edición. Si dice "genera el banner" o "post del calendario" → modo banner completo. En duda, preguntar.

---

## Requisitos de Entrada

Verificar antes de ejecutar:
- `../STATE-marketing.md` muestra `mk-estrategia: ✅` y hay pilares + calendario registrados.
- `../MEMORY.md` (compartido) tiene paleta canónica y ADN visual (cargarlos para el prompt y la corrección de color).
- `GEMINI_API_KEY` disponible como variable de entorno o pedirla al usuario.
- `~/gdrive-credentials.json` existe en el home del usuario.
- Calendario editorial con al menos un post en estado "Pendiente".

---

## Stack Técnico

```
Python 3.x
google-genai          ← Gemini API (imagen editing)
google-api-python-client  ← Drive upload/download directo
google-auth-oauthlib  ← OAuth para Drive
Pillow (PIL)          ← resize, text overlay, compositing
requests              ← descarga de fuentes
```

Instalación (si falta alguno):
```bash
pip install google-genai google-api-python-client google-auth-oauthlib pillow requests --break-system-packages -q
```

---

## Fase A — Sincronización

Leer `../MEMORY.md` (compartido) y `../STATE-marketing.md` (bitácora). Cargar en contexto:

Desde `../MEMORY.md`:
- ADN Visual (paleta canónica, tipografía, elementos de marca).
- IDs de referencias compartidas (página principal en Notion).

Desde `../STATE-marketing.md`:
- IDs operativos de Drive (sección "Referencias operativas" — carpetas de fotos).
- ID de base de datos Notion del calendario editorial.
- Pilares activos → carpeta de Drive mapping.
- Calendario vigente y historial de banners ya producidos.

**Mapping pilar → carpeta Drive:**
| Pilar | Carpeta Drive |
|-------|--------------|
| Encuentra tu planta | `productos_editadas` o `productos_crudo` |
| El vivero por dentro | `vivero` |
| Jardines que transforman | `paisajismo` |
| Aprende a cuidar | `productos_editadas` |
| Plantas para regalar | `productos_editadas` |

**Verificar GEMINI_API_KEY — cargar automáticamente desde .env:**
```python
import os

# Intentar cargar desde .env si no está en el entorno
if not os.environ.get("GEMINI_API_KEY"):
    env_path = os.path.join(os.getcwd(), ".env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ[key.strip()] = val.strip()
        print("Variables cargadas desde .env")

if not os.environ.get("GEMINI_API_KEY"):
    print("ERROR: GEMINI_API_KEY no encontrada.")
    print("Solución permanente — ejecuta esto UNA VEZ en tu terminal:")
    print('echo \'export GEMINI_API_KEY="tu-key"\' >> ~/.zshrc && source ~/.zshrc')
    exit(1)
```

**Solución permanente para el usuario (hacerlo una sola vez):**
```bash
echo 'export GEMINI_API_KEY="AIzaSy..."' >> ~/.zshrc
source ~/.zshrc
```
Después de esto, la key está disponible en TODAS las sesiones de terminal, incluyendo Claude Code. No vuelve a pedirla.

---

## Fase B — Selección del Post

Preguntar al usuario:

```
¿Cómo quieres trabajar?

1. Modo iterativo — un post específico (recomendado para revisar y ajustar)
2. Modo lote — todos los posts pendientes del calendario

¿Cuál prefieres?
```

### Modo iterativo
Obtener posts pendientes del calendario de Notion (Status = "Pendiente").
Presentar lista numerada y esperar elección.

Una vez elegido, mostrar el brief completo del post:
```
## Post seleccionado — [Fecha] · [Plataforma]

Pilar: [nombre]
Formato: [dimensiones]
Concepto: [descripción]
Hook: "[texto]"
Dirección visual: [descripción detallada]
CTA: [acción]

¿Procedemos con esta dirección o ajustamos algo antes de generar?
```

No generar hasta tener confirmación explícita.

### Modo lote
Mostrar cuántos posts pendientes hay y sus fechas.
Pedir confirmación antes de iniciar el loop.

---

## Fase C — Setup del Entorno Python

Generar y ejecutar script de setup una sola vez por sesión:

```python
# setup_banner_env.py
import subprocess
import sys
import os

# Instalar dependencias
packages = [
    "google-genai",
    "google-api-python-client", 
    "google-auth-oauthlib",
    "pillow",
    "requests"
]
for pkg in packages:
    subprocess.run([sys.executable, "-m", "pip", "install", pkg, "-q", 
                   "--break-system-packages"], capture_output=True)

# Descargar fuente Playfair Display si no existe
font_path = "/tmp/PlayfairDisplay-Regular.ttf"
if not os.path.exists(font_path):
    import requests
    font_url = "https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf"
    r = requests.get(font_url, timeout=10)
    with open(font_path, "wb") as f:
        f.write(r.content)
    print(f"Fuente descargada: {font_path}")

print("Entorno listo")
```

---

## Fase D — Autenticación con Google Drive

Generar y ejecutar script de auth. El token se guarda y reutiliza entre sesiones:

```python
# drive_auth.py
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os, json

SCOPES = ['https://www.googleapis.com/auth/drive']
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

if __name__ == "__main__":
    service = get_drive_service()
    print("Drive autenticado correctamente")
```

**Primera vez:** abrirá el navegador para autorizar. Después usa el token guardado automáticamente.

---

## Fase E — Descarga de Foto desde Drive

Listar archivos disponibles en la carpeta correcta según el pilar del post.
Si hay múltiples fotos, presentarlas al usuario para que elija (por nombre).

```python
# download_photo.py
from googleapiclient.http import MediaIoBaseDownload
from drive_auth import get_drive_service
import io, os

def list_photos_in_folder(folder_id):
    """Lista imágenes en una carpeta de Drive."""
    service = get_drive_service()
    results = service.files().list(
        q=f"'{folder_id}' in parents and mimeType contains 'image/' and trashed=false",
        fields="files(id, name, mimeType)",
        orderBy="name"
    ).execute()
    return results.get("files", [])

def download_photo(file_id, output_path):
    """Descarga una imagen de Drive a disco local."""
    service = get_drive_service()
    request = service.files().get_media(fileId=file_id)
    with open(output_path, "wb") as f:
        downloader = MediaIoBaseDownload(f, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
    print(f"Descargada: {output_path}")
    return output_path
```

---

## Fase F — Edición con Gemini API

### Biblioteca de Prompts

Los prompts son configurables. Empezar siempre con el PROMPT_BASE y ajustar según el pilar y la dirección visual del post. No casarse con un solo prompt — explorar variaciones según los resultados.

**⛔ REGLA CRÍTICA — Lo que NUNCA va en el prompt de Gemini:**
- Descripciones de color o textura de elementos existentes ("madera con tonos miel", "planta verde rica", etc.)
- Instrucciones para mejorar, enriquecer o restaurar colores de la planta o la madera
- Cualquier solicitud que implique modificar la apariencia de un elemento que ya existe en la foto

Si se añaden esas instrucciones, Gemini reemplaza superficies enteras por otras inventadas (cambió la tabla de madera original por una hardwood diferente) o abandona el fondo blanco completamente. **El color lo maneja exclusivamente Pillow** — ajustar `GEMINI_COMPENSATION` en `pre_edit_color()`, nunca el prompt.

#### PROMPT_BASE (producto con fondo limpio) — punto de partida validado
```
MANTENER INTACTO EL SUJETO: Conserva exactamente los píxeles originales de la planta, 
la flor, la maceta y la base de madera. Queda estrictamente prohibido alterar la 
saturación, el tono o la luminosidad del sujeto.

REEMPLAZAR ÚNICAMENTE EL FONDO: Sustituir el fondo por un ciclorama de estudio 
fotográfico continuo y liso (sin esquinas). El color exacto de la superficie es un 
'blanco alabastro' o 'blanco roto' mate y ultra-limpio (equivalente visual al color 
hexadecimal #F9F9F9). Es un tono neutro, sin subtonos azules, amarillos ni grises oscuros.
```
**Ideal para:** Pilar 1 (Encuentra tu planta), Pilar 4 (Aprende a cuidar), Pilar 5 (Plantas para regalar). Fotos de producto en crudo con fondo de vivero o fondo sucio.

#### PROMPT_AMBIENTE — para fotos de espacio/vivero/jardín
```
Enhance this photo maintaining its authentic feel. Warm up the light to feel like 
soft natural afternoon sunlight. Boost the depth and richness of the green tones. 
Keep all elements intact — only adjust light, color temperature and atmosphere.
Target mood: [descripción del mood del post según dirección visual]
Do NOT add text, logos, or any graphic elements.
```
**Ideal para:** Pilar 2 (El vivero por dentro), Pilar 3 (Jardines que transforman).

#### Agregar prompts nuevos aquí conforme se prueben y validen

---

### Nota sobre modelos Gemini de imagen

**Modelo confirmado (2026-04):** `gemini-3.1-flash-image-preview` — es el modelo que usa el cliente en AI Studio con mejores resultados. Usar siempre como primera opción.

**Problema conocido:** Todos los modelos Gemini actuales de edición regeneran la imagen completa (no solo el fondo), lo que provoca cierta desaturación del sujeto. No es un bug — es el comportamiento del modelo.

**Solución permanente — pipeline pre-Gemini + Pillow:**

La corrección de color se aplica **ANTES** de enviar a Gemini, no después. Gemini desatura al regenerar; si pre-boosteamos con compensación, el resultado final aterriza en el rango correcto sin necesidad de post-procesado.

**Pipeline de color validado (2026-04):**
1. Medir `TARGET_SAT` promediando TODAS las imágenes en `marketing/referencias_color/` (excluir píxeles blancos y negros puros del cálculo — solo medir la planta)
2. Pre-editar cada foto cruda: `factor = TARGET_SAT × GEMINI_COMPENSATION / img_sat` donde `GEMINI_COMPENSATION = 1.20`
3. Enviar foto pre-editada a Gemini → Gemini aplica su descuento natural (~15-20%)
4. Resultado final en rango de marca, sin post-procesado adicional

**Por qué pre-editar y no post-editar:**
- Post-editar con referencia externa jala TODOS los colores hacia el mismo perfil → efecto "clon"
- Post-editar sin referencia no compensa variaciones de Gemini → inconsistencia
- Pre-editar es equivalente a "preparar el negativo antes de revelar": la foto ya viene lista, Gemini solo quita el fondo

**Carpeta de referencias:** `marketing/referencias_color/` — agregar 3-5 fotos con el color de marca deseado. Más referencias = target más robusto. El target se recalcula automáticamente en cada corrida del script.

**GEMINI_COMPENSATION = 1.20** — ajustar si en un lote el resultado llega muy brillante (bajar a 1.10) o muy apagado (subir a 1.30).

**Resolución de salida:** Solicitar 2K (2048px en el lado largo). Los modelos Gemini de imagen aceptan el parámetro en `image_generation_config`. Mantener el input en alta resolución (fotos iPhone = 3024×4032, no comprimir antes de enviar a Gemini).

**Modelo a usar en orden de preferencia:**
1. `gemini-3.1-flash-image-preview` ← primario, validado en AI Studio
2. `gemini-2.5-flash-image` ← fallback

### Script de generación:

```python
# gemini_edit.py
import os
from google import genai
from google.genai import types
from PIL import Image, ImageEnhance
import io

# Prompts disponibles — agregar nuevos según se validen
PROMPTS = {
    "producto_fondo_limpio": """MANTENER INTACTO EL SUJETO: Conserva exactamente los píxeles originales de la planta, la flor, la maceta y la base de madera. Queda estrictamente prohibido alterar la saturación, el tono o la luminosidad del sujeto.

REEMPLAZAR ÚNICAMENTE EL FONDO: Sustituir el fondo por un ciclorama de estudio fotográfico continuo y liso (sin esquinas). El color exacto de la superficie es un 'blanco alabastro' o 'blanco roto' mate y ultra-limpio (equivalente visual al color hexadecimal #F9F9F9). Es un tono neutro, sin subtonos azules, amarillos ni grises oscuros.""",

    "ambiente_natural": """Enhance this photo maintaining its authentic feel. Warm up the light to feel like soft natural afternoon sunlight. Boost the depth and richness of the green tones. Keep all elements intact — only adjust light, color temperature and atmosphere. Do NOT add text, logos, or any graphic elements."""
}

# Mapping pilar → prompt recomendado (punto de partida, siempre ajustable)
PILAR_PROMPT_MAP = {
    "Encuentra tu planta": "producto_fondo_limpio",
    "El vivero por dentro": "ambiente_natural",
    "Jardines que transforman": "ambiente_natural",
    "Aprende a cuidar": "producto_fondo_limpio",
    "Plantas para regalar": "producto_fondo_limpio"
}

# Modelos a intentar en orden (el primero disponible que funcione)
# gemini-3.1-flash-image-preview es el validado en AI Studio — siempre primero
GEMINI_IMAGE_MODELS = [
    "gemini-3.1-flash-image-preview",
    "gemini-2.5-flash-image",
]

def plant_sat_avg(img_path):
    """Saturación promedio de la planta, excluyendo fondo blanco y negro puro.
    CRÍTICO: excluir el fondo blanco de estudio (S<0.08, V>0.92) para medir solo la planta."""
    import colorsys
    img = Image.open(img_path).convert("RGB")
    pixels = list(img.getdata())
    total_s, n = 0, 0
    for r, g, b in pixels[::4]:
        _, s, v = colorsys.rgb_to_hsv(r/255, g/255, b/255)
        if v > 0.92 and s < 0.08:
            continue  # fondo blanco de estudio
        if v < 0.08:
            continue  # negro puro
        total_s += s
        n += 1
    return (total_s / n) if n > 0 else 0.0


def measure_reference_target(ref_folder):
    """Promedia la saturación de TODAS las imágenes en ref_folder.
    Más referencias = target más robusto. Llamar una sola vez al inicio del lote."""
    from pathlib import Path
    exts = {".jpg", ".jpeg", ".png", ".webp"}
    refs = [f for f in Path(ref_folder).iterdir() if f.suffix.lower() in exts]
    sats = [plant_sat_avg(str(r)) for r in refs]
    target = sum(sats) / len(sats) if sats else 0.30
    print(f"Target sat promedio ({len(refs)} refs): {target:.3f}")
    return target


GEMINI_COMPENSATION = 1.20  # Gemini desatura ~15-20%; subir a 1.30 si salen apagadas

def pre_edit_color(img_path, target_sat):
    """Pre-edita el color ANTES de enviar a Gemini.

    PIPELINE VALIDADO (2026-04): pre-editar antes de Gemini, NO post-procesar después.
    
    - Cada planta mantiene su paleta única (verde, rosa, naranja)
    - Todas llegan al mismo 'nivel de energía' visual después de Gemini
    - target_sat se obtiene de measure_reference_target()
    - GEMINI_COMPENSATION compensa la desaturación que Gemini aplica al regenerar el fondo
    """
    img_sat = plant_sat_avg(img_path)
    if img_sat < 0.01:
        return
    pre_target = target_sat * GEMINI_COMPENSATION
    factor = max(0.8, min(2.5, pre_target / img_sat))
    img = Image.open(img_path).convert("RGB")
    ImageEnhance.Color(img).enhance(factor).save(img_path, "JPEG", quality=95)
    print(f"  Pre-edit: {img_sat:.3f} → {pre_target:.3f}  factor {factor:.2f}×")


def upscale_to_2k(image_path, target_long_side=2048):
    """
    Upscale la imagen a 2K (2048px en el lado largo) usando LANCZOS.
    Nota: el resultado es interpolado, no nativo. Para 2K nativo, probar
    gemini-3-pro-image-preview enviando el input sin redimensionar (iPhone = 3024×4032).
    """
    img = Image.open(image_path).convert("RGB")
    w, h = img.size
    if max(w, h) >= target_long_side:
        print(f"Imagen ya es {w}×{h} — no necesita upscale")
        return image_path
    if w >= h:
        new_w = target_long_side
        new_h = int(h * target_long_side / w)
    else:
        new_h = target_long_side
        new_w = int(w * target_long_side / h)
    upscaled = img.resize((new_w, new_h), Image.LANCZOS)
    upscaled.save(image_path, "JPEG", quality=95)
    print(f"Upscale completado: {w}×{h} → {new_w}×{new_h} (LANCZOS)")
    return image_path


def export_optimized(image_path, destino="instagram"):
    """
    Exporta la imagen optimizada según el destino final.
    Cada preset define: dimensiones exactas (con crop si es necesario), formato y calidad.

    | destino        | dims exactas   | ratio | formato | calidad | peso aprox  |
    |----------------|----------------|-------|---------|---------|-------------|
    | instagram      | 1080 × 1350 px | 4:5   | JPEG    | 85%     | 150-300 KB  |
    | web_producto   | 800  × 1000 px | 4:5   | WebP    | 82%     | 30-60 KB    |
    | web_hero       | 1920 × 1080 px | 16:9  | WebP    | 80%     | 100-200 KB  |
    | archivo        | 2048px lado +  | orig  | JPEG    | 95%     | 400-600 KB  |

    IMPORTANTE: web_producto usa WebP (.webp) — verificar que el destino en Drive
    acepte ese formato. WebP produce el mismo nivel visual que JPEG con 30-40% menos peso.
    """
    from PIL import Image
    import os

    PRESETS = {
        "instagram":    {"w": 1080, "h": 1350, "quality": 85, "format": "JPEG", "ext": ".jpg"},
        "web_producto": {"w": 800,  "h": 1000, "quality": 82, "format": "WEBP", "ext": ".webp"},
        "web_hero":     {"w": 1920, "h": 1080, "quality": 80, "format": "WEBP", "ext": ".webp"},
        "archivo":      {"w": None, "h": None, "long_side": 2048, "quality": 95, "format": "JPEG", "ext": ".jpg"},
    }

    preset = PRESETS.get(destino, PRESETS["instagram"])
    img = Image.open(image_path).convert("RGB")
    orig_w, orig_h = img.size

    if preset.get("w") and preset.get("h"):
        target_w, target_h = preset["w"], preset["h"]
        target_ratio = target_w / target_h
        orig_ratio = orig_w / orig_h

        # Crop centrado al ratio objetivo antes de redimensionar
        if orig_ratio > target_ratio:
            # Imagen más ancha que el ratio — recortar lados
            new_w = int(orig_h * target_ratio)
            left = (orig_w - new_w) // 2
            img = img.crop((left, 0, left + new_w, orig_h))
        elif orig_ratio < target_ratio:
            # Imagen más alta que el ratio — recortar arriba/abajo
            new_h = int(orig_w / target_ratio)
            top = (orig_h - new_h) // 2
            img = img.crop((0, top, orig_w, top + new_h))

        img = img.resize((target_w, target_h), Image.LANCZOS)

    else:
        # Modo archivo: solo limitar el lado largo, sin crop
        long_side = preset.get("long_side", 2048)
        if max(orig_w, orig_h) > long_side:
            if orig_w >= orig_h:
                img = img.resize((long_side, int(orig_h * long_side / orig_w)), Image.LANCZOS)
            else:
                img = img.resize((int(orig_w * long_side / orig_h), long_side), Image.LANCZOS)

    base = os.path.splitext(image_path)[0]
    output_path = f"{base}_{destino}{preset['ext']}"
    img.save(output_path, format=preset["format"], quality=preset["quality"])

    size_kb = os.path.getsize(output_path) / 1024
    print(f"Exportado [{destino}]: {output_path} — {img.size[0]}×{img.size[1]}px — {size_kb:.0f} KB")
    return output_path

def load_color_reference(project_root=None):
    """
    Busca la referencia de color en marketing/referencias_color/ (local, no Drive).
    Toma la primera imagen que encuentre en esa carpeta.
    Si no hay ninguna, retorna None y el flujo continúa sin referencia.
    
    IMPORTANTE: No usar referencias/inspiracion/ — esas son inspiración de marca,
    no color grade. La carpeta correcta es marketing/referencias_color/.
    """
    import os, glob
    
    # Ruta relativa al proyecto — ajustar si se ejecuta desde otra ubicación
    if not project_root:
        # Intentar detectar la raíz del proyecto buscando CLAUDE.md
        cwd = os.getcwd()
        project_root = cwd
    
    ref_folder = os.path.join(project_root, "marketing", "referencias_color")
    
    if not os.path.exists(ref_folder):
        print(f"Carpeta referencias_color no encontrada en: {ref_folder}")
        return None
    
    # Buscar imágenes (jpg, jpeg, png, heic, webp)
    for ext in ["*.jpg", "*.jpeg", "*.png", "*.JPG", "*.JPEG", "*.PNG"]:
        matches = glob.glob(os.path.join(ref_folder, ext))
        if matches:
            print(f"Referencia de color cargada: {os.path.basename(matches[0])}")
            return matches[0]
    
    print("referencias_color está vacía — continuando sin referencia de color")
    return None


def edit_photo_with_gemini(input_path, pilar, prompt_key=None, extra_instructions="",
                           saturation_boost=1.25, color_reference_path=None):
    """
    Edita una foto con Gemini API.
    
    input_path: ruta local de la foto descargada de Drive
    pilar: nombre del pilar para seleccionar prompt recomendado
    prompt_key: forzar un prompt específico (None = usar recomendado por pilar)
    extra_instructions: instrucciones adicionales del usuario para iterar
    saturation_boost: factor de corrección post-Gemini (1.0=ninguno, 1.25=recomendado)
    """
    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    
    # Seleccionar prompt
    if not prompt_key:
        prompt_key = PILAR_PROMPT_MAP.get(pilar, "producto_fondo_limpio")
    
    base_prompt = PROMPTS.get(prompt_key, PROMPTS["producto_fondo_limpio"])
    
    # Agregar instrucciones extra si el usuario quiere iterar
    full_prompt = base_prompt
    if extra_instructions:
        full_prompt += f"\n\nADICIONAL: {extra_instructions}"
    
    # Construir contenido — con o sin referencia de color
    contents = []
    
    # Cargar imagen principal
    # NOTA: La referencia de color NO se pasa a Gemini — Gemini la ignora con
    # frecuencia y genera más errores. El ajuste de color lo hace Pillow después,
    # que sí es matemáticamente exacto. Gemini solo se encarga del fondo.
    with open(input_path, "rb") as f:
        image_bytes = f.read()
    
    ext = input_path.lower().split(".")[-1]
    mime_map = {"jpg": "image/jpeg", "jpeg": "image/jpeg",
                "png": "image/png", "heic": "image/heic", "webp": "image/webp"}
    mime_type = mime_map.get(ext, "image/jpeg")
    
    # Agregar imagen principal al contenido
    contents.append(types.Part.from_bytes(data=image_bytes, mime_type=mime_type))
    contents.append(full_prompt)
    
    # Intentar modelos en orden
    last_error = None
    for model_name in GEMINI_IMAGE_MODELS:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE", "TEXT"],
                    # Solicitar salida en alta resolución (2K)
                    image_generation_config=types.ImageGenerationConfig(
                        number_of_images=1,
                        output_mime_type="image/jpeg",
                    ) if hasattr(types, "ImageGenerationConfig") else None
                )
            )
            for part in response.candidates[0].content.parts:
                if hasattr(part, "inline_data") and part.inline_data:
                    output_path = input_path.replace(".", f"_gemini_{prompt_key}.")
                    with open(output_path, "wb") as f:
                        f.write(part.inline_data.data)
                    print(f"Imagen editada [{model_name}]: {output_path}")
                    # 1. Normalización de color — adaptativa si hay referencia, fija si no
                    # strength=0.65: se acerca a la referencia pero deja variación
                    # natural entre fotos (0.85 causaba efecto "clonado" en fotos
                    # muy desaturadas). El fondo blanco no se afecta — saturación ≈ 0.
                    ref_path = color_reference_path
                    if ref_path and os.path.exists(ref_path):
                        adaptive_color_match(output_path, ref_path, strength=0.65)
                    elif saturation_boost != 1.0:
                        boost_saturation(output_path, saturation_boost)  # fallback
                    # 2. Upscale a 2K — Gemini devuelve ~1024px, subimos a 2048px con LANCZOS
                    upscale_to_2k(output_path, target_long_side=2048)
                    return output_path
        except Exception as e:
            print(f"Modelo {model_name} falló: {e}")
            last_error = e
            continue
    
    raise Exception(f"Ningún modelo Gemini funcionó. Último error: {last_error}")
```

---

## Fase G — Overlay de Texto con Pillow

Agregar el hook, logo y elementos de marca sobre la imagen editada.

```python
# add_overlay.py
from PIL import Image, ImageDraw, ImageFont
import os

# Dimensiones por formato
DIMENSIONS = {
    "feed_cuadrado": (1080, 1080),    # 1:1
    "feed_vertical": (1080, 1350),    # 4:5
    "story": (1080, 1920),            # 9:16
    "facebook": (1200, 630)           # 1.91:1
}

# Colores de marca
COLOR_VERDE = (106, 123, 98)     # #6A7B62
COLOR_CEREZA = (148, 26, 40)     # #941A28
COLOR_CREMA = (245, 246, 244)    # #F5F6F4
COLOR_NEGRO_SUAVE = (30, 30, 30)

def add_text_overlay(image_path, hook_text, formato, logo_path=None, 
                     hook_position="bottom", text_color="light"):
    """
    Agrega overlay de texto sobre la imagen editada.
    
    hook_text: primera línea del caption (texto en imagen)
    formato: clave de DIMENSIONS
    hook_position: "bottom" | "top" | "center"
    text_color: "light" (texto crema) | "dark" (texto verde oscuro)
    """
    dims = DIMENSIONS.get(formato, (1080, 1350))
    
    # Abrir y redimensionar
    img = Image.open(image_path).convert("RGBA")
    img = img.resize(dims, Image.LANCZOS)
    
    draw = ImageDraw.Draw(img)
    
    # Cargar fuente Playfair Display
    font_path = "/tmp/PlayfairDisplay-Regular.ttf"
    try:
        # Tamaño de fuente relativo al ancho
        font_size = int(dims[0] * 0.055)  # ~60px para 1080px
        font = ImageFont.truetype(font_path, font_size)
        font_small = ImageFont.truetype(font_path, int(font_size * 0.6))
    except:
        font = ImageFont.load_default()
        font_small = font
    
    # Color del texto
    if text_color == "light":
        txt_color = COLOR_CREMA
        shadow_color = (0, 0, 0, 180)
    else:
        txt_color = COLOR_NEGRO_SUAVE
        shadow_color = (255, 255, 255, 160)
    
    # Calcular posición del hook
    margin = int(dims[0] * 0.06)  # 6% del ancho
    max_width = dims[0] - (margin * 2)
    
    # Wrap de texto
    words = hook_text.split()
    lines = []
    current_line = []
    for word in words:
        test_line = " ".join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        if bbox[2] - bbox[0] <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(" ".join(current_line))
            current_line = [word]
    if current_line:
        lines.append(" ".join(current_line))
    
    line_height = int(font_size * 1.3)
    total_text_height = len(lines) * line_height
    
    if hook_position == "bottom":
        y_start = dims[1] - total_text_height - margin - int(dims[1] * 0.08)
    elif hook_position == "top":
        y_start = margin + int(dims[1] * 0.08)
    else:
        y_start = (dims[1] - total_text_height) // 2
    
    # Overlay oscuro/claro detrás del texto para legibilidad
    overlay_padding = int(dims[1] * 0.06)
    overlay = Image.new("RGBA", dims, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    overlay_draw.rectangle(
        [(0, y_start - overlay_padding), 
         (dims[0], y_start + total_text_height + overlay_padding)],
        fill=(0, 0, 0, 100) if text_color == "light" else (255, 255, 255, 80)
    )
    img = Image.alpha_composite(img, overlay)
    draw = ImageDraw.Draw(img)
    
    # Dibujar texto con sombra sutil
    for i, line in enumerate(lines):
        y = y_start + (i * line_height)
        bbox = draw.textbbox((0, 0), line, font=font)
        text_width = bbox[2] - bbox[0]
        x = (dims[0] - text_width) // 2  # centrado
        
        # Sombra
        draw.text((x + 2, y + 2), line, font=font, fill=shadow_color)
        # Texto principal
        draw.text((x, y), line, font=font, fill=txt_color)
    
    # Logo en esquina inferior derecha (pequeño, no invasivo)
    if logo_path and os.path.exists(logo_path):
        try:
            logo = Image.open(logo_path).convert("RGBA")
            logo_size = int(dims[0] * 0.12)  # 12% del ancho
            logo = logo.resize((logo_size, logo_size), Image.LANCZOS)
            logo_x = dims[0] - logo_size - margin
            logo_y = dims[1] - logo_size - margin
            img.paste(logo, (logo_x, logo_y), logo)
        except Exception as e:
            print(f"Logo no aplicado: {e}")
    
    # Convertir a RGB para guardar como JPEG
    output = img.convert("RGB")
    output_path = image_path.replace("_editada.", f"_banner_{formato}.")
    output.save(output_path, "JPEG", quality=92)
    print(f"Banner final: {output_path}")
    return output_path
```

---

## Fase H — Upload a Drive

```python
# upload_to_drive.py
from googleapiclient.http import MediaFileUpload
from drive_auth import get_drive_service
import os

def upload_banner(local_path, folder_id, filename=None):
    """
    Sube el banner final a la carpeta banners_output de Drive.
    Retorna el file ID y la URL de visualización.
    """
    service = get_drive_service()
    
    if not filename:
        filename = os.path.basename(local_path)
    
    file_metadata = {
        "name": filename,
        "parents": [folder_id]
    }
    
    media = MediaFileUpload(local_path, mimetype="image/jpeg", resumable=True)
    
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields="id, webViewLink, webContentLink"
    ).execute()
    
    print(f"Subido: {file.get('webViewLink')}")
    return file.get("id"), file.get("webViewLink")
```

---

## Fase I — Actualización de Notion

Con el banner subido a Drive, actualizar el registro en el calendario:

1. Buscar la entrada en la base de datos del calendario por fecha y plataforma
2. Actualizar:
   - Campo "Archivo de imagen" → URL de Drive
   - Campo "Estado" → "Listo"

Usar el MCP de Notion para esto (no Python).

---

## Fase J — Presentación al Usuario

```
## Banner generado ✅

Post: [fecha] · [plataforma]
Pilar: [nombre]
Hook aplicado: "[texto]"

📁 Drive: [link]
📋 Notion: actualizado → Estado: Listo

¿Está bien la imagen o iteramos algo?
Opciones:
- "Ajusta el color" → regenera con Gemini con instrucción adicional
- "Cambia el texto" → nueva posición/tamaño del hook
- "Usa otra foto" → lista las demás fotos disponibles en la carpeta
- "Siguiente post" → avanza al próximo pendiente
```

---

## Fase K — Actualización de Bitácoras

Al terminar una sesión de producción, escribir según jurisdicción:

**→ `../STATE-marketing.md` (bitácora del marketing):**
- Actualizar "Historial de contenido producido":

```markdown
| Fecha | Pilar | Plataforma | Concepto | Archivo Drive |
|-------|-------|------------|----------|---------------|
| [fecha] | [pilar] | [plataforma] | [concepto corto] | [link] |
```

- Cambiar `mk-banner` de ⏳ a ✅ cuando el primer banner quede aprobado.
- Agregar en "Aprendizajes de Gemini" cualquier técnica nueva que haya funcionado (prompt validado, ajuste de `GEMINI_COMPENSATION`, etc.).

**→ `../MEMORY.md` (compartido), solo si aplica:**
- Si durante la producción se validó un cambio de paleta (por ejemplo, el color cereza real del logo vectorial), reflejarlo en la sección "Identidad visual" con la nueva fuente de verdad.
- Si se detectó una nueva regla cross-agent (p. ej. que el fondo `#F9F9F9` también debe usarse en la web), registrarla en "Decisiones cross-agent".

**Regla:** el historial de banners y los prompts validados nunca se duplican en `../MEMORY.md`.

---

## Notas Técnicas

### Sobre el modelo Gemini para imagen
- Modelo recomendado: `gemini-2.0-flash-exp-image-generation`
- Si falla, fallback: `gemini-2.0-flash` con `response_modalities=["IMAGE"]`
- El prompt NO debe pedir texto en la imagen — eso lo maneja Pillow

### Sobre la fuente Playfair Display
- Se descarga de Google Fonts a `/tmp/` en la Fase C
- Si falla la descarga, usar `/System/Library/Fonts/Georgia.ttf` como fallback en macOS

### Sobre el logo
- Buscar en Drive: carpeta `../marketing/references/brand/` o en la carpeta VIVERO LAS ROSAS de Drive
- Si no se encuentra, omitir el logo y continuar (no bloquear la generación)

### Sobre formatos HEIC
- Las fotos del iPhone vienen en HEIC
- Pillow no soporta HEIC nativamente → convertir primero:
```bash
pip install pillow-heif --break-system-packages -q
```
```python
from pillow_heif import register_heif_opener
register_heif_opener()
# Ahora PIL puede abrir HEIC directamente
```
