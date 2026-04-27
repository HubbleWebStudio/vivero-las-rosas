# Plantilla: Playwright Screenshot Script

Este script debe crearse como `./web-app/screenshot.mjs` durante la fase de arranque.

## Instalación previa (una sola vez por proyecto)

```bash
# Dentro de ./web-app/
npm install -D @playwright/test
npx playwright install chromium
```

```javascript
import { chromium } from "@playwright/test";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = path.join(__dirname, "..", "temporary_screenshots");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function takeScreenshot(label = "default") {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log(`📸 Capturando ${BASE_URL}...`);
  try {
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500); // Espera a las animaciones de Framer Motion

    const timestamp = Date.now();
    const fileName = `screenshot-${timestamp}-${label}.png`;
    const fullPath = path.join(OUTPUT_DIR, fileName);

    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`✅ Captura guardada en: temporary_screenshots/${fileName}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  } finally {
    await browser.close();
  }
}

const label = process.argv[2] || "manual";
takeScreenshot(label);
```

## Uso

```bash
# Dentro de ./web-app/ (con el servidor de desarrollo corriendo en localhost:3000)
node screenshot.mjs hero
node screenshot.mjs categorias
```

Las capturas se guardan en `./temporary_screenshots/` (raíz del workspace, fuera de `web-app/`).
Leer el archivo de screenshot con la herramienta Read para comparar contra la referencia visual.
