# Changelog — Hubble Web Designer

Historial de cambios de la cápsula `hubble-web-designer`. Prefijo de skills: `wd-`.

Formato: `mayor.menor`. Mayor = contrato (CLAUDE.md o set de skills). Menor = mejora dentro de una fase.

Cada entrada: **fecha · versión · agregado / cambiado / corregido / eliminado · razón · propagación**.

---

## [3.2] — 2026-04-23 · Regla de carpeta temporal dedicada en el flujo Vercel Blob + flujo Drive → Blob

### Cambiado
- `wd-construccion` v1.4 — Paso 2 ("Imágenes del cliente → Vercel Blob") expandido con dos secciones:
  - **Regla de carpeta temporal (crítica):** prohíbe apuntar `upload-images.mjs` directamente a `/tmp`. El script recorre recursivamente todo lo que encuentra, y `/tmp` contiene cachés del sistema y archivos de otras apps. Obliga a `mkdir -p /tmp/<cliente>-upload`, copiar solo las imágenes a subir, correr el script contra esa ruta, y `rm -rf` al terminar.
  - **Flujo Drive → Blob:** documenta el patrón de puentear imágenes desde Google Drive (MCP `mcp__claude_ai_Google_Drive`) a Vercel Blob sin escribir en `./references/` ni en el repo. La única copia persistente queda en Blob; Drive sigue siendo la fuente de verdad del cliente.
- El flujo numerado del Paso 2 pasó de 4 a 6 pasos (agregados: 1 "preparar carpeta temporal" y 6 "borrar carpeta temporal").

### Razón
Incidente 2026-04-23 en Vivero Las Rosas: se apuntó `upload-images.mjs` a `/tmp` para una prueba y el script subió 165 archivos de sistema a Vercel Blob (subcarpetas de otras apps, cachés, archivos de otras sesiones de Claude). Los archivos se eliminaron a mano del store y del `blob-manifest.json`, pero el skill permitía repetir el error — no había regla escrita sobre aislar la entrada del script. Santiago pidió codificarlo antes de que el flujo Drive → Blob se automatice y el riesgo se multiplique. El flujo Drive → Blob se documentó en la misma iteración porque reforzaba el mismo patrón (una sola carpeta temporal dedicada, creada y destruida en la misma sesión) y mantiene a Drive como única fuente persistente fuera de Blob.

### Propagación
Cápsula canónica: `./proyectos/vivero_las_rosas/hubble-web-designer/`. Única instancia activa. Próximos onboardings ya clonan esta versión.

### Salto
Registrado como **3.2** (menor dentro de fase 3.x): cambia el contrato de una sola skill (`wd-construccion`), no cambia el set de skills ni el `CLAUDE.md`. La regla del Maestro reserva `4.0` para otro cambio estructural del conjunto de skills.

---

## [3.1] — 2026-04-23 · Contrato de memoria compartida

### Cambiado
- `CLAUDE.md` de la cápsula — nuevo handshake: ahora se leen en orden `../MEMORY.md` (cuaderno compartido cross-agent) **y** `../STATE-web.md` (bitácora propia del web-designer). Antes se leía un único `./MEMORY.md` local que mezclaba marca y ejecución.
- `wd-arranque` v1.1 — lee `../MEMORY.md` para marca/paleta/tipografías; escribe secciones construidas, scaffolding y progreso en `../STATE-web.md`. Tokens nuevos que afecten marca siguen bajando al compartido.
- `wd-construccion` v1.3 — separación explícita en el handshake: `../MEMORY.md` (compartido) para confirmar tokens canónicos del cliente, `../STATE-web.md` (propio) para saber qué sección sigue. Al cerrar una sección, progreso → STATE; solo tokens de marca nuevos bajan a MEMORY.
- `wd-refinamiento` v1.3 — precondiciones leen ambos cuadernos; registros de refinamiento se escriben según tipo (paleta/fuente/tokens canónicos → MEMORY; secciones construidas o componentes nuevos → STATE).
- `wd-diseño` v2.2 — Fase A guarda los tokens del `MASTER.md` en MEMORY compartido; STATE-web solo linkea al `MASTER.md` para futuras iteraciones. Fase D registra score y entregas en STATE-web; cambios de token canónico también en MEMORY.
- `wd-auditoria` v1.1 — al cerrar, entregas y scores viven en STATE-web; solo cambios cross-agent (ajuste de paleta por contraste, por ejemplo) bajan a MEMORY compartido.

### Razón
- Aplicar el patrón de memoria compartida validado por el Maestro en skill `ops-consolidar-memoria`: un solo cuaderno compartido para lo que todos los agentes necesitan ver (marca, arquetipos, paleta, fuentes, fechas clave, decisiones cross-agent) + una bitácora por agente para su ejecución específica. Evita drift entre copias de la misma información y mantiene contextos limpios (el web-designer ya no carga el calendario editorial del marketing, y el marketing ya no carga el progreso de secciones web).
- Eliminar duplicados detectados en Vivero Las Rosas: la paleta vivía en dos `MEMORY.md` con drift (`#6A7C62` en código vs `#6A7B62` en marketing). Ahora hay una única fuente de verdad en `../MEMORY.md`.

### Propagación
Cápsula canónica: `./proyectos/vivero_las_rosas/hubble-web-designer/`. Migración de memoria ejecutada el 2026-04-23. Próximos onboardings ya clonan esta versión.

### Salto
Se registra como **3.1** (menor dentro de la fase 3.x): el contrato del handshake cambia (lee dos archivos en vez de uno), pero el conjunto de skills no cambia y ninguna skill nueva aparece. La regla del Maestro reserva `4.0` para otro cambio estructural del conjunto de skills.

---

## [3.0] — 2026-04-23 · Integración de `wd-auditoria` (absorción curada de `impeccable`)

### Agregado
- Skill `wd-auditoria` v1.0 en `./.claude/skills/wd-auditoria/` — gate obligatorio de pre-entrega.
  - `AUDITORIA.md` con 5 fases: A Preparación, B Detección automatizada (`npx impeccable detect`), C Revisión heurística LLM (10 heurísticas de Nielsen puntuadas 0-4 + carga cognitiva 0-8 + 2 personas del set Alex/Jordan/Sam/Morgan), D Reporte combinado con bandas P0-P3, E Cierre con re-auditoría obligatoria.
  - Invoca `impeccable` vía `npx` — sin vendoring, sin lock de versión, aprovecha que todo proyecto Hubble ya corre Node ≥18.
- `data/reflex-fonts.csv` en `wd-biblioteca` — 26 fuentes con sesgo de training data (Inter, Space Grotesk, Fraunces, Playfair Display, DM Sans, Plus Jakarta Sans, Instrument, IBM Plex, Cormorant, Crimson, Newsreader, Lora, Syne, Outfit, Roboto, Arial, Open Sans, Space Mono, DM Serif, etc.). Fuente: `impeccable` v2.1.7 + Anthropic frontend-design.

### Cambiado
- `wd-biblioteca` — degradada la sección "Pre-Delivery Checklist (Web)" a puntero hacia `wd-auditoria`. La biblioteca propone, la auditoría verifica. Evidencia > catálogo cuando entran en conflicto.
- `wd-biblioteca` — agregada sección "Fuentes prohibidas (reflex list)" que referencia `data/reflex-fonts.csv` y establece la regla dura: ninguna de esas fuentes se usa como heading/body principal salvo exigencia de marca.
- `wd-construccion` — Paso 6 (pre-entrega) reemplazó el call a checklist de biblioteca por invocación obligatoria de `wd-auditoria`. Todo P0 se resuelve antes de declarar página lista; P1 se negocia; P2/P3 van a backlog.
- `wd-refinamiento` — Paso 5 reemplazó checklist por `wd-auditoria`, condicional a cambio global (token de color, fuente, spacing base, o más de una sección afectada).
- `wd-diseño` — Fase D reemplazó checklist por `wd-auditoria` como gate obligatorio antes de declarar página lista.
- `CLAUDE.md` — lista de skills incluye `wd-auditoria`; handshake Paso 4 agrega el trigger; sección "Obligatoriedad contextual" expandida a tabla unificada con `wd-biblioteca` + `wd-auditoria` y sus modos de invocación.

### Razón
- Institucionalizar el gate de calidad: un detector ejecutable (25+ anti-patrones) + revisión heurística humana es estrictamente más potente que un checklist markdown estático.
- Unificar en **una sola skill** las capacidades que `impeccable` expone como `/audit`, `/critique` y `/polish`. El usuario explicitó que prefiere menos skills con triggers claros sobre varias skills granulares que no recordaría usar.
- Cerrar el loop biblioteca ↔ auditoría: la biblioteca puede recomendar una fuente que esté en reflex list, y el detector lo marcará en pre-entrega. Evidencia le gana al catálogo.

### Propagación
Cápsula canónica: `./proyectos/vivero_las_rosas/hubble-web-designer/`. Única instancia activa. Se clona íntegra en próximos onboardings vía `ops-onboarding-cliente`.

### Salto mayor
Se registra como **3.0** porque:
- Cambia el set de skills (se agrega `wd-auditoria`).
- Cambia el contrato de 3 skills existentes (`wd-construccion`, `wd-refinamiento`, `wd-diseño` ahora invocan `wd-auditoria` en pre-entrega).
- Cambia el `CLAUDE.md` (nuevo trigger + tabla de obligatoriedad expandida).

### Dependencia externa nueva
- `impeccable` v2.1.7 (Apache 2.0, autor Paul Bakaus) se invoca vía `npx impeccable detect`. Sin lock, sin fork. Si Bakaus rompe la API en una major, se pinea con `npx impeccable@2 detect` y se documenta aquí.

---

## [2.0] — 2026-04-23 · Integración de `wd-biblioteca` y renombre de `wd-estetica`

### Agregado
- Skill `wd-biblioteca` v1.0 en `./.claude/skills/wd-biblioteca/` — toolkit curado basado en `ui-ux-pro-max-skill` (nextlevelbuilder).
  - Motor BM25 en `scripts/search.py` + `scripts/core.py` + `scripts/design_system.py`.
  - 13 CSVs de dominio (`styles`, `colors`, `typography`, `google-fonts`, `icons`, `charts`, `landing`, `products`, `ux-guidelines`, `react-performance`, `app-interface`, `design`, `ui-reasoning`).
  - 4 CSVs de stack: `nextjs`, `react`, `shadcn`, `html-tailwind` (el resto fue dropeado — mobile y otros web frameworks fuera de alcance de Hubble).
  - `BIBLIOTECA.md` con filosofía, dos modos de uso (puntual + completo), comandos CLI y **Pre-Delivery Checklist (Web)** embebido.
  - Tamaño total: ~1.4MB (reducido desde ~12MB del repo origen).

### Cambiado
- `wd-estetica` → renombrado a `wd-diseño`. Folder movido, `ESTETICA.md` → `DISEÑO.md`, frontmatter reescrito con `name: wd-diseño` y descripción en español.
- `wd-diseño` v2.0 — reescrito completo. Antes era el skill `frontend-design` inglés del repo externo. Ahora es nativo Hubble: Fase A obligatoria con `wd-biblioteca --design-system --persist` para generar `MASTER.md`; Fase B arquitectura de secciones; Fase C construcción sección por sección; Fase D pre-entrega con checklist.
- `wd-construccion` v1.1 — agregado Paso 1.5 (consulta puntual a biblioteca cuando la imagen deja una subdecisión abierta) y Paso 6 (pre-entrega con checklist al cerrar la página completa).
- `wd-refinamiento` v1.1 — agregado Paso 1.5 (consulta puntual cuando el refinamiento implica decisión nueva) y Paso 5 (pre-entrega si el cambio fue global).
- `CLAUDE.md` — lista de skills actualizada, sección de obligatoriedad contextual de `wd-biblioteca` agregada al handshake.

### Eliminado
- 12 CSVs de stacks mobile y web no soportados: `swiftui`, `react-native`, `flutter`, `jetpack-compose`, `vue`, `svelte`, `astro`, `nuxtjs`, `nuxt-ui`, `angular`, `laravel`, `threejs`. Curaduría documentada en `scripts/core.py` (comentario al inicio de `STACK_CONFIG`).

### Razón
- Institucionalizar inteligencia de diseño: que ninguna decisión de estilo/paleta/fuente/chart se tome por intuición cuando hay un catálogo consultable.
- Eliminar el skill `frontend-design` genérico y reemplazarlo por una skill nativa alineada al stack de Hubble.
- Normalizar convenciones de naming en español.

### Propagación
Cápsula canónica: `./proyectos/vivero_las_rosas/hubble-web-designer/`. No hay otras instancias activas todavía. Cuando se onboardee el próximo cliente, esta versión se clona entera vía `ops-onboarding-cliente`.

### Salto mayor
Se registra como **2.0** porque:
- Cambia el set de skills (se agrega una, se renombra otra con reescritura completa).
- Cambia el contrato de las skills existentes (`wd-construccion` y `wd-refinamiento` ahora contemplan consulta a biblioteca).
- Cambia el `CLAUDE.md` (handshake).

---

## [1.0] — 2026-04-23 · Baseline observado

### Estado al momento de registrar el baseline

- `CLAUDE.md`: identidad, stack (Next.js 14 + TS + Tailwind v4 + Shadcn + Framer), rutas, handshake, reglas core.
- Skills activos:
  - `wd-arranque` v1.0 — análisis visual + scaffolding.
  - `wd-construccion` v1.0 — construcción de sección específica.
  - `wd-refinamiento` v1.0 — iteración sobre algo ya construido.
  - `wd-estetica` v1.0 — página o sección sin referencia visual.
- Material complementario en `skills/web-designer/references/` pendiente de decisión (ver backlog BL-002 en MEMORY del Maestro).

### Razón
Registro inicial del agente como versión canónica, al activarse el Maestro y establecerse la convención de CHANGELOG por cápsula.

### Propagación
Cápsula canónica: `./proyectos/vivero_las_rosas/hubble-web-designer/`. No hay otras instancias activas todavía.

---
