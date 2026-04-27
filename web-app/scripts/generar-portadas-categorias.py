"""
Genera las 5 imágenes de portada para las páginas de categoría de Vivero Las Rosas.
Usa Gemini API (google-genai). Guarda los resultados en ./public/categorias-portadas/
Línea visual: fotografía realista, luz natural, cálida, jardines y espacios mexicanos.
"""

import os
import sys
from pathlib import Path

# ── API key ────────────────────────────────────────────────────────────────────
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    env_path = Path(__file__).parent.parent / ".env.local"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ[k.strip()] = v.strip()
        api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    print("ERROR: GEMINI_API_KEY no encontrada.")
    sys.exit(1)

from google import genai
from google.genai import types

client = genai.Client(api_key=api_key)

# ── Carpeta de salida ──────────────────────────────────────────────────────────
output_dir = Path(__file__).parent.parent / "public" / "categorias-portadas"
output_dir.mkdir(parents=True, exist_ok=True)

# ── Instrucción visual base ────────────────────────────────────────────────────
BASE = (
    "Photorealistic photography, shot on professional camera, natural light, "
    "cinematic depth of field, warm-green tones, no text, no people, no logos. "
    "Style: authentic Mexican residential garden, clean and elegant, not staged. "
    "Mood: calm, lush, inviting. No AI-looking textures or artifacts."
)

# ── Prompts por categoría ──────────────────────────────────────────────────────
CATEGORIAS = [
    {
        "slug": "exterior",
        "filename": "portada-exterior.jpg",
        "prompt": (
            f"{BASE} "
            "A lush residential garden patio in Guadalajara, Mexico. "
            "Stone floor, wooden outdoor furniture partially visible, tropical plants surrounding the space — "
            "tall palm trees, bougainvillea climbing a stone wall, dense green shrubs in the foreground. "
            "Morning golden light filtering through the plants. Wide establishing shot."
        ),
    },
    {
        "slug": "interior",
        "filename": "portada-interior.jpg",
        "prompt": (
            f"{BASE} "
            "Modern Mexican apartment living room filled with indoor plants. "
            "Large monstera in a ceramic pot, pothos trailing from a shelf, "
            "natural light flooding through a big window with sheer curtains, "
            "neutral cream walls, mid-century wooden furniture. Soft morning light."
        ),
    },
    {
        "slug": "sol",
        "filename": "portada-sol.jpg",
        "prompt": (
            f"{BASE} "
            "Sun-drenched terrace or rooftop garden bathed in bright midday light. "
            "Terracotta pots with vibrant flowering plants — bougainvillea, lavender and salvia in full bloom. "
            "Clear blue sky partially visible in background. Strong warm golden tones, high contrast light."
        ),
    },
    {
        "slug": "sombra",
        "filename": "portada-sombra.jpg",
        "prompt": (
            f"{BASE} "
            "A shaded garden corner beneath a large tree canopy. "
            "Dappled, filtered light creating soft shadows on the ground. "
            "Dense green foliage — ferns, calatheas and tropical shade plants in the foreground. "
            "Mossy stone path visible. Cool, humid, peaceful atmosphere."
        ),
    },
    {
        "slug": "semisombra",
        "filename": "portada-semisombra.jpg",
        "prompt": (
            f"{BASE} "
            "A covered outdoor corridor or pergola of a Mexican home. "
            "Diffused, soft natural light filtering through a wooden lattice roof. "
            "Hanging pothos and trailing plants cascading from above, "
            "terracotta pots with lush green plants along the sides. "
            "Warm, gentle, peaceful tones."
        ),
    },
]

# ── Modelos a intentar ─────────────────────────────────────────────────────────
MODELOS = [
    "imagen-4.0-generate-001",
    "gemini-3.1-flash-image-preview",
    "gemini-2.5-flash-image",
]

# ── Generación ─────────────────────────────────────────────────────────────────
resultados = {}

for cat in CATEGORIAS:
    out_path = output_dir / cat["filename"]

    if out_path.exists():
        print(f"⏭  {cat['slug']}: ya existe → {out_path}")
        resultados[cat["slug"]] = str(out_path)
        continue

    print(f"\n🌿 Generando: {cat['slug']} ...")

    generado = False
    for modelo in MODELOS:
        try:
            if "imagen-" in modelo:
                # Imagen 4 usa generate_images
                response = client.models.generate_images(
                    model=modelo,
                    prompt=cat["prompt"],
                    config=types.GenerateImagesConfig(
                        number_of_images=1,
                        aspect_ratio="16:9",
                        output_mime_type="image/jpeg",
                    ),
                )
                img_data = response.generated_images[0].image.image_bytes
            else:
                # Gemini flash image usa generate_content
                response = client.models.generate_content(
                    model=modelo,
                    contents=cat["prompt"],
                    config=types.GenerateContentConfig(
                        response_modalities=["IMAGE", "TEXT"],
                    ),
                )
                img_data = None
                for part in response.candidates[0].content.parts:
                    if hasattr(part, "inline_data") and part.inline_data:
                        img_data = part.inline_data.data
                        break
                if not img_data:
                    raise ValueError("No se recibió imagen en la respuesta")

            out_path.write_bytes(img_data)
            print(f"   ✅ [{modelo}] → {out_path}")
            resultados[cat["slug"]] = str(out_path)
            generado = True
            break

        except Exception as e:
            print(f"   ⚠  {modelo} falló: {e}")
            continue

    if not generado:
        print(f"   ❌ No se pudo generar {cat['slug']} con ningún modelo.")

# ── Resumen ────────────────────────────────────────────────────────────────────
print("\n══════════════════════════════════════")
print(f"✅ Generadas: {len(resultados)}/5")
print(f"📁 Carpeta: {output_dir}")
print("\nPróximo paso:")
print("  node scripts/upload-images.mjs ./public/categorias-portadas imagenes/categorias")
print("══════════════════════════════════════")
