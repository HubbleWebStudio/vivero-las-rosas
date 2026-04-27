# Changelog — Hubble Marketing

Historial de cambios de la cápsula `hubble-marketing`. Prefijo de skills: `mk-`.

Formato: `mayor.menor`. Mayor = contrato (CLAUDE.md o set de skills). Menor = mejora dentro de una fase.

Cada entrada: **fecha · versión · agregado / cambiado / corregido / eliminado · razón · propagación**.

---

## [1.1] — 2026-04-23 · Contrato de memoria compartida

### Cambiado
- `CLAUDE.md` de la cápsula — nuevo handshake: se leen en orden `../MEMORY.md` (compartido cross-agent), `../STATE-marketing.md` (bitácora propia) y `../marketing/PROJECT.md` (brief inmutable). Antes se leía un único `../marketing/MEMORY.md` local que mezclaba marca y ejecución.
- `CLAUDE.md` — tabla "Rutas de Referencia" reescrita para separar cuaderno compartido, bitácora operativa y brief del cliente. Diagrama de estructura actualizado: los `STATE-*.md` viven en la raíz del workspace, no dentro de cápsulas.
- `mk-arranque` v1.1 — output dividido: identidad de marca (arquetipos, posicionamiento, voz, paleta canónica, tipografías, ADN visual, fechas clave, competencia) → `../MEMORY.md`; estado del skill y referencias operativas locales → `../STATE-marketing.md`. Si el `MEMORY.md` ya existe porque otro agente lo creó, se complementa sin sobreescribir.
- `mk-estrategia` v1.1 — precondición lee `../STATE-marketing.md` para confirmar que `mk-arranque` está ✅. Carga brief desde `../MEMORY.md` y pilares/calendario previos (si existen) desde el STATE. Pilares aprobados, estrategia por plataforma, historial de calendarios y IDs operativos de Notion se escriben en STATE. Solo fechas clave nuevas o ajustes de voz/arquetipo bajan a `../MEMORY.md`.
- `mk-banner` v1.0 (sin bump interno) — handshake y Fase A actualizadas: paleta y ADN visual se leen de `../MEMORY.md`; IDs operativos de Drive, mapping pilar→carpeta y calendario se leen de `../STATE-marketing.md`. Historial de banners y aprendizajes de Gemini se escriben en STATE. Solo cambios validados de paleta (p. ej. color cereza real del logo vectorial) bajan a MEMORY.

### Razón
- Aplicar el patrón de memoria compartida institucionalizado por el Maestro en el skill `ops-consolidar-memoria`. Lo que varios agentes necesitan ver (marca, arquetipos, paleta, tipografías, fechas clave) vive en un único cuaderno compartido `../MEMORY.md`; lo operativo de cada agente en su STATE propio.
- En Vivero Las Rosas se detectaron duplicados entre `./marketing/MEMORY.md` y los datos que el web-designer mantenía aparte (drift de color: `#6A7B62` vs `#6A7C62`). La consolidación resuelve el drift con una sola fuente de verdad.

### Propagación
Cápsula canónica: `./proyectos/vivero_las_rosas/hubble-marketing/`. Migración de memoria ejecutada el 2026-04-23: `./marketing/MEMORY.md` archivado como `MEMORY.legacy.md`; contenido migrado a `../MEMORY.md` + `../STATE-marketing.md`. Próximos onboardings clonan esta versión.

### Salto
Se registra como **1.1** (menor dentro de la fase 1.x): el contrato del handshake cambia, pero el conjunto de skills no cambia y ninguna skill nueva aparece. La siguiente versión mayor (`2.0`) queda reservada para cuando `mk-copy` se materialice y altere el set de skills.

---

## [1.0] — 2026-04-23 · Baseline observado

### Estado al momento de registrar el baseline

- `CLAUDE.md`: identidad (estrategia de contenido + producción visual para IG / FB / TikTok), stack (Python + Pillow + Gemini), rutas relativas a `../marketing/`, handshake, flujo obligatorio `mk-arranque → mk-estrategia → mk-banner | mk-copy`.
- Skills activos:
  - `mk-arranque` v1.0 — onboarding + brief estratégico + ADN visual.
  - `mk-estrategia` v1.0 — pilares de contenido y calendario editorial.
  - `mk-banner` v1.0 — generación de imágenes con Gemini.
  - `mk-copy` — stub sin archivo `COPY.md`. Pendiente de desarrollo (ver BL-001 en MEMORY del Maestro).

### Razón
Registro inicial del agente como versión canónica, al activarse el Maestro y establecerse la convención de CHANGELOG por cápsula.

### Propagación
Cápsula canónica: `./proyectos/vivero_las_rosas/hubble-marketing/`. No hay otras instancias activas todavía.

---
