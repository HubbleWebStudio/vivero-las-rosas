---
name: wd-biblioteca
description: Biblioteca de inteligencia de diseño UI/UX. Úsalo para consultar patrones de estilo, paletas de color, tipografía, charts, patrones de landing, recomendaciones por tipo de producto y guías de UX/performance antes de escribir código. Se invoca en modo "puntual" (consulta dirigida) durante wd-construccion y wd-refinamiento, y en modo "completo" (generación de design system) durante wd-diseño. Activa también esta skill cuando aparezcan palabras como "estilo", "paleta", "tipografía", "inspiración", "referencia de diseño", "qué estilo uso", "qué fuente combina", "qué color", "qué chart", "qué patrón de landing".
---

# Skill: Biblioteca de diseño

Un toolkit curado de inteligencia de diseño UI/UX, con motor de búsqueda local (BM25). No es generador — es un **catálogo consultable** para tomar decisiones de diseño fundadas antes de codificar.

Basado en `ui-ux-pro-max-skill` (nextlevelbuilder), curado por Hubble para nuestro stack: **Next.js 14 + TypeScript + Tailwind v4 + Shadcn/ui + Framer Motion + Google Fonts**.

---

## Filosofía

- **Consulta antes de decidir.** No elijas un estilo, una paleta o una fuente por intuición cuando tienes un catálogo con curaduría. Consulta primero, decide después.
- **Pequeño y preciso.** Usa el modo `--domain` para preguntar lo mínimo necesario. No cargues el toolkit entero para una decisión puntual.
- **Cero externalización.** El toolkit vive dentro de la cápsula. No requiere red ni dependencias externas — solo Python 3.
- **No es el diseñador, es la referencia.** La skill propone opciones con justificación; el agente y el usuario deciden.

---

## Dos modos de uso

### Modo puntual — `--domain`

Consulta dirigida para resolver una duda concreta durante `wd-construccion` o `wd-refinamiento`.

**Cuándo:** "qué chart conviene para esta data", "qué fuente combina con una serif editorial", "qué íconos hay para e-commerce", "cómo se soluciona [issue de UX]", "qué paleta rinde para un SaaS fintech".

**Formato:** una sola pregunta, un solo dominio, top 3 resultados. Se transcribe lo útil a `./MEMORY.md` y se sigue construyendo.

### Modo completo — `--design-system`

Generación de un design system coherente (estilo + paleta + tipografía + stack + checklist) a partir de una descripción libre del proyecto.

**Cuándo:** durante `wd-diseño` cuando se arranca una página o sección sin referencia visual. La biblioteca produce una propuesta que luego se adapta al contexto del cliente.

**Formato:** se persiste el resultado en `./web-app/design-system/` como `MASTER.md` (y opcionalmente `pages/[pagina].md` para overrides locales).

---

## Activación obligatoria desde otras skills

| Skill que invoca | Modo | Trigger |
|---|---|---|
| `wd-construccion` | puntual | Paso 1 (análisis de imagen) si hay duda de estilo/color/fuente/chart/íconos que no se resuelva en la imagen. Paso 5 (pre-entrega) para correr el checklist. |
| `wd-refinamiento` | puntual | Cuando el refinamiento implique decidir algo nuevo (paleta alternativa, fuente, chart). Paso 3 (verificación) para correr el checklist si el cambio afectó múltiples secciones. |
| `wd-diseño` | completo | Fase inicial: generar `MASTER.md` del design system antes de empezar a codificar. |
| `wd-arranque` | — | No se usa. Arranque ya tiene imagen de referencia global; el design system se extrae de ahí. |

---

## Comandos CLI

Todos los comandos se ejecutan **desde la raíz del skill** (`wd-biblioteca/scripts/`), con Python 3.

### Búsqueda por dominio (modo puntual)

```bash
python3 scripts/search.py "<query>" --domain <dominio> [-n <n>]
```

Ejemplos:
```bash
python3 scripts/search.py "editorial serif display" --domain typography
python3 scripts/search.py "dark saas fintech" --domain color
python3 scripts/search.py "scroll trigger keyboard focus" --domain ux
python3 scripts/search.py "comparison over time" --domain chart
```

### Búsqueda por stack

```bash
python3 scripts/search.py "<query>" --stack <stack>
```

Solo 4 stacks disponibles (Hubble usa únicamente estos):
`nextjs`, `react`, `shadcn`, `html-tailwind`.

Ejemplo:
```bash
python3 scripts/search.py "suspense server component barrel import" --stack nextjs
```

### Generación de design system (modo completo)

```bash
python3 scripts/search.py "<descripción del proyecto>" --design-system -p "<Nombre>"
python3 scripts/search.py "<descripción>" --design-system --persist -p "<Nombre>" --output-dir ../../web-app
```

Con `--persist` el skill escribe `MASTER.md` en `<output-dir>/design-system/<slug>/`. Con `--page "<nombre>"` crea además un archivo de overrides para esa página.

### Auto-detección de dominio

Si se omite `--domain`, el motor detecta el dominio más probable por keywords. Úsalo cuando no estés seguro de qué dominio atacar:

```bash
python3 scripts/search.py "gradient hero with asymmetric layout"
```

---

## Dominios disponibles

| Dominio | Archivo CSV | Para qué |
|---|---|---|
| `style` | `styles.csv` | Estilos visuales (minimalism, glassmorphism, brutalism, aurora, etc.) + prompts AI + keywords CSS + checklist de implementación |
| `color` | `colors.csv` | Paletas por tipo de producto, con todos los tokens semánticos (primary, accent, destructive, foreground, etc.) |
| `typography` | `typography.csv` | Pareos de fuentes con Google Fonts URL, CSS import y Tailwind config |
| `google-fonts` | `google-fonts.csv` | Fuentes individuales: clasificaciones, ejes variables, subsets, ranking |
| `icons` | `icons.csv` | Sets de íconos (Lucide, Heroicons) por categoría y estilo |
| `chart` | `charts.csv` | Qué chart usar según tipo de dato + cuándo NO usarlo + alternativas + grado de accesibilidad |
| `landing` | `landing.csv` | Orden de secciones, posición de CTA, estrategia de color, patrones de conversión |
| `product` | `products.csv` | Recomendaciones por tipo de producto (SaaS, e-commerce, fintech, portfolio, etc.) |
| `ux` | `ux-guidelines.csv` | Anti-patrones y best practices con Do/Don't y ejemplos de código |
| `react` | `react-performance.csv` | Performance en React/Next (Suspense, memo, dynamic import, RSC, bundles) |
| `web` | `app-interface.csv` | Accesibilidad web, aria, focus, outline, semántica, inputs, autocomplete |

---

## Fuentes prohibidas (reflex list)

`data/reflex-fonts.csv` lista 26 fuentes que los modelos tienden a elegir por sesgo de training data y que producen monocultura en los outputs. Origen: `impeccable` v2.1.7 (nextlevelbuilder/Bakaus) + Anthropic frontend-design.

**Regla dura:** ningún proyecto de Hubble usa estas fuentes como heading o body principal, salvo que el brief del cliente lo exija explícitamente por razones de marca existente. El detector `wd-auditoria` las marca como P1 en cualquier auditoría.

Consulta rápida:

```bash
cat data/reflex-fonts.csv
```

La lista incluye: Inter, Space Grotesk, Fraunces, Playfair Display, DM Sans, Plus Jakarta Sans, Instrument Sans, Instrument Serif, IBM Plex (todos), Cormorant, Crimson (todos), Newsreader, Lora, Syne, Outfit, Roboto, Arial, Open Sans, Space Mono, DM Serif Display/Text, Cormorant Garamond.

Cuando consultes el dominio `typography` o `google-fonts`, **contrasta el resultado con `reflex-fonts.csv`**. Si la fuente recomendada aparece en la lista reflex, descártala y busca otra — esa es la regla de higiene que la biblioteca impone al agente.

---

## Stacks disponibles

Solo los 4 stacks que Hubble Web Studio usa:

- `nextjs` — Next.js 14+ App Router, RSC, streaming, parallel routes.
- `react` — React patterns genéricos (hooks, suspense, memoization).
- `shadcn` — Convenciones y patrones de Shadcn/ui.
- `html-tailwind` — Tailwind CSS v4 puro, `@theme {}`, sin framework.

> **Nota de curaduría (2026-04-23):** Los stacks de mobile (swiftui, react-native, flutter, jetpack-compose) y los de otros frameworks web (vue, svelte, astro, nuxtjs, angular, laravel, threejs) fueron descartados al importar el toolkit. Si en el futuro Hubble abre una línea de mobile o adopta otro framework, ver `CHANGELOG.md` de la cápsula y re-curar desde el repo original.

---

## Pre-Delivery → `wd-auditoria`

El gate real de pre-entrega vive en la skill **`wd-auditoria`**, que corre un detector ejecutable (`npx impeccable detect`) + una revisión heurística LLM + personas. Es estrictamente más potente que un checklist markdown.

La biblioteca **no** mantiene un checklist propio — delega en `wd-auditoria`. Cuando `wd-construccion` Paso 6, `wd-refinamiento` Paso 5 o `wd-diseño` Fase D requieren gate de pre-entrega, invocan `wd-auditoria`, no esta skill.

Si el detector marca findings relacionados con recursos que esta biblioteca recomienda (por ejemplo una fuente recomendada que está en la reflex list, o una paleta propuesta con contraste insuficiente), **gana el detector** — biblioteca propone, auditoría verifica, evidencia vence catálogo.

---

## Reglas Core

- **Cero modificación del toolkit en caliente.** Los CSVs y scripts vienen curados. Si se necesita agregar un stack o un patrón, se hace vía `ops-mejorar-skill` con entrada de CHANGELOG.
- **La biblioteca propone, el contexto decide.** El resultado de `search.py` es input, no output. Lo que se transcribe a `./MEMORY.md` debe ser lo adaptado al cliente, no el copy-paste crudo.
- **Persistir tokens, no procesos.** Cuando `--design-system --persist` escribe `MASTER.md`, ese archivo es la referencia viva del cliente. Los resultados de búsquedas puntuales se absorben en `MEMORY.md` o se descartan — no hay que archivar cada búsqueda.
- **Un solo call por duda.** Si una búsqueda con top 3 no resuelve la decisión, se ajusta la query; no se hacen 10 búsquedas en paralelo pidiendo variaciones.
- **Respeto al stack.** Si el agente ve resultados que apuntan fuera del stack curado (ej. un ejemplo con Vue o SwiftUI), se ignoran sin mencionarlos al usuario.

---

## Salida mínima al usuario

Cuando la biblioteca se consulta en modo puntual, el agente **no** vuelca el JSON crudo al chat. En su lugar:

```
📚 Consulta a biblioteca
Dominio: [dominio]
Query: "[query]"
Top hallazgos:
1. [nombre] — [una línea de qué es y por qué aplica]
2. [nombre] — [una línea]
3. [nombre] — [una línea]
Decisión propuesta: [qué se va a usar y por qué]
```

En modo completo, el agente entrega el `MASTER.md` y cita las tres decisiones clave (estilo elegido, paleta, tipografía) con una línea de justificación cada una.
