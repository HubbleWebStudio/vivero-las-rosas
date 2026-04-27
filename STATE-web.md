# State — Hubble Web Designer · Vivero Las Rosas

> Bitácora de ejecución del web-designer. Progreso de construcción, decisiones locales al web, escalas y radios específicos del proyecto. Para marca, paleta, arquetipos y decisiones cross-agent usar `./MEMORY.md`.

---

## Fase actual

- **Skills ejecutados:** `wd-arranque` ✅ · `wd-construccion` ✅ (12 secciones) · `wd-refinamiento` (según iteración) · `wd-diseño` ✅ (páginas adicionales)
- **Skills disponibles tras v3.0:** `wd-auditoria` (gate obligatorio de pre-entrega), `wd-biblioteca` (toolkit consultable)
- **Pre-entrega (`wd-auditoria`):** pendiente — correr antes de declarar cada página lista

---

## Stack del proyecto

- Next.js 14 (App Router) · TypeScript · Tailwind v4 (`@theme {}`) · Shadcn/ui · Framer Motion
- Fuentes cargadas con `next/font` en `./web-app/src/app/layout.tsx`
- Tokens de diseño en `./web-app/src/app/globals.css` bajo `@theme {}`

## Escalas y radios específicos del web

- **Escala tipográfica:** display 3.5rem · h1 2.5rem · h2 1.75rem · h3 1.25rem · body 1rem · small 0.875rem · label 0.75rem
- **Radios:** cards 1rem · botones 0.5rem · badges 9999px
- **Container:** `max-w-80rem` (1280px)
- **Spacing de sección:** `py-6rem`
- **Sombras:** sutiles (`shadow-sm` en cards)

---

## Secciones detectadas en referencia global

| # | Sección | Descripción |
|---|---|---|
| 01 | Navbar | Sticky · logo izq · links centro · CTA derecha · fondo blanco/blur |
| 02 | Hero | Full-width · imagen invernadero · overlay oscuro · título 3 líneas · 2 botones CTA |
| 03 | Categorías botánicas | Título + subtítulo · grid 4 cards con plantas en maceta |
| 04 | Banner Servicios | 2 cols: texto+imagen izq · grid imágenes derecha · bloque verde oscuro |
| 05 | Servicio paisajismo | Texto izq + imagen grande derecha · fondo claro |
| 06 | Productos de jardinería | Fondo verde oscuro · grid cards/imágenes |
| 07 | Art Gallery | Galería de proyectos/jardines (variantes 07 y 07.2) |
| 08 | Ubicación y horarios | Sección clara · info ubicación · posible mapa |
| 09 | Contacto | "Escríbele a tu vivero de confianza" · formulario |
| 10 | Footer | Fondo oscuro · logo · links · info negocio |

## Progreso de construcción

| Sección / Página | Estado | Notas |
|---|---|---|
| Scaffolding Next.js | ✅ | Git root en `./web-app/` |
| Navbar | ✅ | |
| Hero | ✅ | |
| Categorías Botánicas | ✅ | |
| Banner Catálogo | ✅ | |
| Productos | ✅ | |
| Servicio Paisajismo | ✅ | |
| Experiencia Stats | ✅ | |
| Art Gallery | ✅ | |
| Ubicación y Horarios | ✅ | |
| Contacto | ✅ | |
| Footer | ✅ | |
| TeEsperamos | ✅ | |
| Home | ✅ | |
| `/productos` | ✅ | |
| `/nosotros` | ✅ | |
| `/paisajismo` | ✅ | Página clave — paisajismo es prioridad alta según `./MEMORY.md` |

---

## Decisiones locales del web-designer

| Fecha | Decisión | Razón |
|---|---|---|
| (previa a v3.0) | Escala tipográfica y radios como los de la tabla de arriba | Extraídos del análisis visual del mock global |
| 2026-04-23 | Con skill `wd-auditoria` disponible, correr `npx impeccable detect` + revisión heurística antes de declarar cualquier página lista | Gate de calidad obligatorio — resuelve P0 antes de entrega |

---

## Aprendizajes específicos del proyecto web

_(vacío por ahora — anotar hallazgos reutilizables en próximos proyectos, ej. patrones de layout que funcionaron, decisiones de shadcn, hacks de Tailwind v4)_

---

## Referencias operativas usadas

| Archivo / Asset | Origen | Dónde se usó |
|---|---|---|
| `./references/full/` | Mock global entregado por cliente | `wd-arranque` para extraer design system y secciones |
| `./references/sections/` | Recortes sección por sección | `wd-construccion` Paso 1 de cada sección |

---

## Pendientes y backlog local

- Correr `wd-auditoria` sobre cada página (Home, `/productos`, `/nosotros`, `/paisajismo`) antes de marcar la web como lista para entrega.
- Considerar si el token `accent-cereza` (`#941A28`) debe llegar a `globals.css` como variable semántica — actualmente solo vive en piezas de marketing.
