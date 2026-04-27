---
name: wd-construccion
description: Úsalo para construir secciones de un proyecto ya scaffoldeado, una a la vez. Actívalo cuando el usuario diga "construye el hero", "siguiente sección", "haz la sección X", o cuando el proyecto ya tenga scaffolding y haya imágenes en references/sections/.
---

# Skill: Construcción sección por sección

Una sección a la vez. No construyas la siguiente hasta aprobar la actual.

> **Regla de tokens:** Lee la imagen de cada sección UNA SOLA VEZ en el Paso 1. Extrae toda la información necesaria en ese único read. No recargues la imagen en pasos posteriores. Si ya tienes el análisis escrito, úsalo — no releas el archivo.

---

## Antes de empezar

1. Leer `./MEMORY.md` (compartido) — confirmar colores, fuentes y tokens canónicos del cliente.
2. Leer `./STATE-web.md` (bitácora propia) — confirmar qué secciones están construidas y cuál sigue.
3. Verificar que exista la imagen de la sección en `./references/sections/`.
   - Si no existe: **pedir la imagen al usuario antes de escribir una línea de código.**

---

## Por cada sección — ciclo obligatorio

### Paso 1 — Análisis milimétrico de la imagen de sección

Lee `./references/sections/0X.png` **una sola vez** y extrae todo en un único paso:

```
Sección: [nombre]
Layout: [grid cols / flex / full-width / split 50-50 / etc.]
Elementos: [lista exacta de lo que hay]
Colores específicos: [cualquier valor que no esté en los tokens base]
Tipografía: [tamaño estimado, peso, estilo de cada texto visible]
Espaciados: [padding interno, gaps entre elementos]
Efectos: [gradientes, overlays, sombras, border-radius concreto]
Texto real visible: [transcribe todo el texto que aparece]
Dudas: [cualquier detalle que no se vea claro — preguntar al usuario]
```

Si hay dudas anotadas → **preguntar antes de construir.** No volver a leer la imagen para responder dudas — si la duda no se puede resolver con lo ya extraído, pedir aclaración al usuario.

### Paso 1.5 — Consulta puntual a `wd-biblioteca` (solo si aplica)

Si tras el análisis hay una decisión abierta que la imagen no resuelve y el `./MEMORY.md` compartido no contempla — por ejemplo: qué chart usar para una data, qué set de íconos, qué comportamiento hover estándar, qué patrón de CTA, qué fuente combina con una serif ya elegida — invocar la biblioteca en modo puntual:

```bash
cd ./hubble-web-designer/.claude/skills/wd-biblioteca
python3 scripts/search.py "[query]" --domain <dominio>
```

Dominios disponibles: `style`, `color`, `typography`, `google-fonts`, `icons`, `chart`, `landing`, `product`, `ux`, `react`, `web`.

Transcribir al análisis de la sección la decisión tomada con 1 línea de justificación. **No volcar el resultado crudo al chat** — solo la decisión.

Si la sección se resuelve íntegramente con lo visible en la imagen y los tokens ya activos, **saltar este paso.** La biblioteca no es obligatoria en cada sección; es obligatoria cuando hay una subdecisión abierta.

### Paso 2 — Construir el componente

Archivo: `./web-app/src/components/features/[NombreSeccion].tsx`

Reglas estrictas:
- Usar SOLO los tokens de `./web-app/src/app/globals.css` (`@theme {}`). Si necesitas un valor nuevo, agregarlo primero al theme.
- Cero valores hardcodeados en JSX (excepto `rgba()` para overlays con opacidad variable).
- Framer Motion para entradas: `initial={{ opacity:0, y:24 }} → visible`. Stagger en listas.
- Imágenes externas → Unsplash con dimensiones correctas.
- Imágenes del cliente → **Vercel Blob, nunca `public/`**. Flujo obligatorio:
  1. **Preparar carpeta temporal dedicada** — ver "Regla de carpeta temporal" abajo. Nunca apuntar el script directamente a `/tmp`.
  2. Subir desde `./web-app/`: `node scripts/upload-images.mjs /tmp/<cliente>-upload imagenes/seccion`
  3. Leer `./web-app/blob-manifest.json` — copiar la URL generada para esa imagen
  4. Registrar la URL en `./web-app/src/lib/images.ts` bajo la sección correspondiente
  5. Referenciar en el componente: `import { IMG } from '@/lib/images'` → `src={IMG.seccion.nombre}`
  6. Borrar la carpeta temporal al terminar: `rm -rf /tmp/<cliente>-upload/`

  **Regla de carpeta temporal (crítica).** Nunca apuntar `upload-images.mjs` directamente a `/tmp`. `/tmp` contiene subcarpetas del sistema (cachés de apps, archivos de otras sesiones, etc.) y el script recorre recursivamente todo lo que encuentra — subiría cientos de archivos basura a Blob por accidente. Incidente real (2026-04-23, Vivero Las Rosas): 165 archivos de sistema subidos a Blob y borrados a mano. Flujo correcto:

  1. `mkdir -p /tmp/<cliente>-upload` — carpeta dedicada, nombrada por cliente.
  2. Copiar **solo** las imágenes a subir a esa carpeta.
  3. Correr el script contra esa ruta exacta — nunca contra `/tmp`.
  4. `rm -rf /tmp/<cliente>-upload/` al terminar.

  **Flujo Drive → Blob (sin almacenamiento local permanente).** Si las imágenes del cliente viven en Google Drive (referencias, fotos de producto, assets compartidos), el agente puede puentearlas a Blob sin dejar archivos en el repo ni en `./references/`:

  1. Descargar desde Drive con el MCP `mcp__claude_ai_Google_Drive` (`search_files` → `download_file_content`) escribiendo directamente en `/tmp/<cliente>-upload/`.
  2. `node scripts/upload-images.mjs /tmp/<cliente>-upload imagenes/<seccion>`.
  3. Copiar URLs de `./web-app/blob-manifest.json` a `./web-app/src/lib/images.ts` como siempre.
  4. `rm -rf /tmp/<cliente>-upload/` — la máquina queda limpia; la única copia persistente es la de Blob.

  Este patrón es preferible a descargar a `./references/` cuando las imágenes son producto final destinado a Blob (no referencias visuales para análisis): evita duplicidad Drive/local/Blob y mantiene Drive como fuente de verdad del cliente.
- Todo texto no real marcado con `{/* TODO: Reemplazar con contenido real */}`.

Animaciones estándar:
```tsx
// Entrada de sección
initial={{ opacity: 0, y: 24 }}
animate={isInView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.6, ease: 'easeOut' }}

// Cards con stagger
variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.09 } } }}
itemVariants={{ hidden:{ opacity:0, y:20 }, visible:{ opacity:1, y:0, transition:{ duration:0.5 } } }}

// Hover
whileHover={{ y: -4, transition: { duration: 0.2 } }}
whileTap={{ scale: 0.97 }}
```

### Paso 3 — Importar en page.tsx

Agrega el componente en `./web-app/src/app/page.tsx` en el orden correcto (arriba a abajo).

### Paso 4 — Verificación visual

Pide al usuario que abra `localhost:3000` y comparta un screenshot de la sección construida.

Compara contra el análisis del Paso 1 (no releas la imagen de referencia salvo que el usuario lo pida explícitamente):
```
□ Layout (columnas, dirección, alineación)
□ Tipografía (familia, peso, tamaño relativo)
□ Colores (fondo, texto, botones, overlays)
□ Espaciados (padding interno, gaps)
□ Border-radius
□ Efectos (sombras, gradientes, opacidades)
□ Contenido (textos, íconos, estructura de datos)
```

Lista TODAS las discrepancias antes de corregir. Corrige todas en un solo paso. Repite hasta ≥90% de fidelidad.

### Paso 5 — Aprobar y registrar

Cuando la sección esté aprobada:
1. Actualizar `./STATE-web.md` → marcar la sección como ✅ en "Progreso de construcción". Si la sección introdujo un token nuevo que afecta marca (color, fuente), **también** reflejarlo en `./MEMORY.md`.
2. Confirmar al usuario: "✅ [Sección] aprobada. ¿Continúo con [siguiente sección]?"

### Paso 6 — Pre-Entrega (al cerrar la última sección)

**Obligatorio solo cuando el usuario indica que la página está lista para entregar** (Navbar + Hero + secciones medias + CTA + Footer, todo aprobado).

Invocar el skill **`wd-auditoria`** sobre la página completa. El skill corre `npx impeccable detect` + revisión heurística + personas y produce un reporte con score técnico, score UX, carga cognitiva y plan priorizado P0-P3.

Todo P0 se resuelve antes de declarar la página lista. Los P1 se negocian con el usuario (¿se corrigen ahora o se difieren?). Los P2/P3 se loggean en backlog.

Registrar el score final y los issues aceptados conscientemente en `./STATE-web.md` bajo "Entregas". Si la auditoría introdujo un cambio con impacto cross-agent (ej. ajuste de paleta por contraste), reflejarlo también en `./MEMORY.md`.

---

## Orden recomendado de construcción

`Navbar → Hero → [secciones medias en orden visual] → CTA → Footer`

Siempre de arriba a abajo. El Navbar y Footer primero porque definen la identidad que se repite.
