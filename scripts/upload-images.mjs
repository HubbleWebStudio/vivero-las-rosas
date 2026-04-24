/**
 * upload-images.mjs
 * Script de subida masiva a Vercel Blob.
 *
 * USO:
 *   node scripts/upload-images.mjs [carpeta] [prefijo-en-blob]
 *
 * EJEMPLOS:
 *   # Subir toda la carpeta public/imagenes (imágenes actuales):
 *   node scripts/upload-images.mjs ./public/imagenes imagenes
 *
 *   # Subir un lote nuevo de 200 imágenes desde Downloads:
 *   node scripts/upload-images.mjs ~/Downloads/fotos-productos imagenes/productos
 *
 * REQUISITOS:
 *   - BLOB_READ_WRITE_TOKEN en .env.local (o en variable de entorno)
 *   - npm install @vercel/blob dotenv
 *
 * RESULTADO:
 *   - Genera/actualiza blob-manifest.json en la raíz del proyecto
 *   - El manifest mapea: ruta-relativa → URL pública en Blob
 *   - Es IDEMPOTENTE: si una imagen ya está en el manifest, la omite
 */

import { put } from '@vercel/blob';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname, relative } from 'path';
import { config } from 'dotenv';

// Cargar .env.local
config({ path: '.env.local' });

const EXTENSIONS_VALIDAS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif']);
const MANIFEST_PATH = './blob-manifest.json';

// Argumentos
const carpetaLocal  = process.argv[2] || './public/imagenes';
const prefijoBlob   = process.argv[3] || 'imagenes';

// Cargar manifest existente
let manifest = {};
if (existsSync(MANIFEST_PATH)) {
  manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
  console.log(`📂 Manifest existente cargado (${Object.keys(manifest).length} entradas)\n`);
} else {
  console.log('📂 Manifest nuevo — se creará al finalizar\n');
}

// Colectar archivos recursivamente
function colectarArchivos(dir) {
  const resultado = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      resultado.push(...colectarArchivos(fullPath));
    } else if (entry.isFile() && EXTENSIONS_VALIDAS.has(extname(entry.name).toLowerCase())) {
      resultado.push(fullPath);
    }
  }
  return resultado;
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN no encontrado en .env.local');
    console.error('   Ve a Vercel → Storage → vivero-las-rosas → .env.local → copia el token');
    process.exit(1);
  }

  const archivos = colectarArchivos(carpetaLocal);
  console.log(`🔍 Encontrados ${archivos.length} archivos en "${carpetaLocal}"\n`);

  let subidos = 0;
  let omitidos = 0;
  let errores = 0;

  for (const archivoPath of archivos) {
    // Construir la clave en Blob: prefijo/subcarpeta/nombre.ext
    const rutaRelativa = relative(carpetaLocal, archivoPath);
    const claveBlob    = `${prefijoBlob}/${rutaRelativa}`.replace(/\\/g, '/');

    if (manifest[claveBlob]) {
      console.log(`⏭️  Omitido (ya existe): ${claveBlob}`);
      omitidos++;
      continue;
    }

    try {
      const contenido = readFileSync(archivoPath);
      const { url } = await put(claveBlob, contenido, {
        access: 'public',
        addRandomSuffix: false, // mantiene el nombre exacto
      });

      manifest[claveBlob] = url;
      // Guardar después de cada subida para no perder progreso si hay error
      writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

      console.log(`✅ ${claveBlob}`);
      console.log(`   → ${url}\n`);
      subidos++;
    } catch (err) {
      console.error(`❌ Error al subir ${claveBlob}:`, err.message);
      errores++;
    }
  }

  console.log('\n══════════════════════════════════════');
  console.log(`✅ Subidos:  ${subidos}`);
  console.log(`⏭️  Omitidos: ${omitidos}`);
  console.log(`❌ Errores:  ${errores}`);
  console.log(`📄 Manifest: ${MANIFEST_PATH}`);
  console.log('══════════════════════════════════════\n');
  console.log('Próximo paso: copia las URLs del manifest a src/lib/images.ts');
}

main();
