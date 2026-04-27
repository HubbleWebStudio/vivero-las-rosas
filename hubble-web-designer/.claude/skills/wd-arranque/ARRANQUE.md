---
name: wd-arranque
description: Úsalo cuando se inicia un proyecto de cliente nuevo. Cubre análisis visual de la referencia completa, extracción del design system y scaffolding del proyecto Next.js. Actívalo cuando el usuario diga "arrancar proyecto", "iniciar desde cero", o proporcione una imagen completa de referencia por primera vez.
---

## Filosofía de Ejecución HUBBLE

1. **Ingeniería, no Creatividad:** El agente es un ejecutor. Si existe una referencia, mantenga la misma maquetación, espaciado, tipografía y color. Reemplace el contenido con un marcador de posición (imágenes a través de `https://placehold.co/`, texto genérico). No modifique ni añada nada al diseño.
2. **Validación Visual Iterativa:** Tras cada bloque de código, el agente debe realizar un ciclo de comparación (Output vs. Referencia) Compárala con la referencia, corrige las discrepancias, alineación o color y vuelve a capturarla.

---

## Fase A — Análisis visual de la imagen completa

**Lectura única:** Leer `./references/full/[imagen].png` una sola vez. Extrae todo en un solo paso:

**1. Inventario de secciones** — Lista cada sección de arriba a abajo con su estructura exacta:

```
Hero → full-viewport, imagen de fondo, overlay oscuro, título 3 líneas, 2 botones
Categorías → header 2 cols + grid 4 cards full-image con overlay
...
```

**2. Colores** — Analiza por capas, sin asumir "blanco puro":

- Fondo base (¿crema cálida? ¿gris frío?)
- Color de marca (botones CTA, badges, acentos)
- Color oscuro (footer, secciones de contraste)
- Grises de texto (principal ≈ #1A1A1A, secundario ≈ #6B6B6B)
- Color de bordes (casi invisible, versión apagada del fondo)

**3. Tipografía** — Observa los headings grandes:

- ¿Serif o sans-serif? ¿Geométrica o humanista?
- ¿Mismo peso en headings y body, o hay contraste?
- Escala aproximada: display ≈ 3.5rem / h2 ≈ 1.75rem / body ≈ 1rem

**4. Layout** — Container width, padding de secciones, border-radius de cards y botones.

**5. Presenta el análisis al usuario y espera confirmación antes de continuar.**

```
Design System extraído:
- Secciones: [lista]
- Colores: bg #XXXX / primario #XXXX / oscuro #XXXX / texto #XXXX
- Fuentes: headings [Nombre] [peso] / body [Nombre]
- Radius: cards Xpx / botones Xpx / Container max-w-XXXX

¿Procedo con el scaffolding?
```

**Escritura técnica:** Antes de preguntar al usuario, el agente debe escribir los tokens de diseño canónicos en `./MEMORY.md` (cuaderno compartido — paleta, fuentes, radios de marca) y el inventario de secciones + estado del scaffolding en `./STATE-web.md` (bitácora operativa del web).

---

## Fase B — Scaffolding del proyecto

El proyecto se crea en `./web-app/` dentro del workspace del cliente. Las carpetas de referencias ya deben existir en `./references/`; créalas si no están:

```bash
# Desde la raíz del workspace del cliente
mkdir -p ./references/full ./references/sections
mkdir -p ./web-app
cd ./web-app
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
npx shadcn@latest init
npm install framer-motion lucide-react clsx tailwind-merge
```

Para Shadcn, cuando pregunte: Style → Default · Base color → el más cercano al primario del diseño · CSS variables → Yes.

**`./web-app/src/app/globals.css`** — Define TODOS los tokens del diseño en `@theme {}` (Tailwind v4). Consulta `next-scaffold.md` para el template completo.

```css
@import "tailwindcss";

@theme {
  --color-brand-primary: #XXXX;
  --color-bg: #XXXX;
  --color-bg-dark: #XXXX;
  --color-text-primary: #XXXX;
  --color-text-secondary: #XXXX;
  --color-text-on-dark: #XXXX;
  --color-border: #XXXX;
  --radius-card: Xrem;
  --radius-btn: Xrem;
  --font-heading: var(--font-XXX), serif;
  --font-body: var(--font-XXX), sans-serif;
}
```

Crea `./web-app/src/app/layout.tsx` con Google Fonts, Navbar y Footer.
Crea `./web-app/src/app/page.tsx` vacío importando solo los componentes que ya construyas.

---

## Fase C — Actualizar MEMORY.md y STATE-web.md

Al finalizar el scaffolding, separar la escritura en **dos archivos** según a quién le sirve:

### C1 — `./MEMORY.md` (compartido — lo lee todo el ecosistema)

Actualizar o crear las secciones de identidad visual. Aquí solo lo que es cross-agent:

```md
## Identidad visual (fuente única de verdad)

### Paleta
| Token | Hex | Uso |
|---|---|---|
| primary | #XXXX | ... |
| ... |

### Tipografías
- Heading: [familia] — Google Fonts: [url]
- Body: [familia] — Google Fonts: [url]
```

### C2 — `./STATE-web.md` (bitácora del web — solo ejecución)

Estado del scaffolding, inventario de secciones del mock, escalas tipográficas y radios específicos del web:

```md
# State — Hubble Web Designer · [Cliente]

## Fase actual
- Skills ejecutados: wd-arranque ✅
- Skills pendientes: wd-construccion (por sección)

## Escalas y radios específicos del web
- Escala tipográfica: display Xrem / h1 Xrem / ...
- Radios: cards Xrem / botones Xrem / ...
- Container: max-w-XXrem
- Spacing de sección: py-Xrem

## Secciones detectadas en referencia global
[lista del inventario de la Fase A]

## Progreso de construcción
| Sección | Estado |
|---|---|
| Scaffolding Next.js | ✅ |
| ... | ⏳ |
```

> No crear un nuevo `CLAUDE.md` — ya existe en la raíz del workspace y declara el contrato.

**Al terminar: indica al usuario que el proyecto está listo para construcción e invoca `wd-construccion` por la primera sección.**
