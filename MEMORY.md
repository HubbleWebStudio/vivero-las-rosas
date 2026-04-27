# Memory — Vivero Las Rosas

> **Cuaderno compartido del proyecto.** Todos los agentes leen este archivo al despertar. Escriben aquí solo decisiones cross-agent (marca, arquetipos, paleta, voz, fechas clave). La ejecución operativa de cada agente vive en `./STATE-[agente].md`.

---

## Ficha del cliente

- **Nombre comercial:** Vivero Las Rosas
- **Sector:** Viverismo + paisajismo residencial
- **Fundadora / contacto:** Beatriz
- **Ubicación:** Cerro del Tesoro, Guadalajara (Jalisco, México)
- **Canales digitales actuales:** Instagram, Facebook · TikTok en roadmap

---

## Posicionamiento

**Declaración de posicionamiento:**
> "Vivero Las Rosas es el vivero de Guadalajara donde cada cliente recibe asesoría personalizada — porque encontrar la planta correcta para tu espacio no debería ser un proceso de prueba y error."

- **Diferenciador principal:** Asesoría incluida en cada visita, sin costo adicional.
- **"Somos el único vivero que…":** te dice exactamente qué plantar, cómo cuidarlo y dónde conseguirlo — incluso si no lo tenemos en exhibición.
- **Para quién:** Decoradora de Departamento (volumen) + Vecino de la Zona (ticket alto — paisajismo).
- **En contra de:** Viveros sin asesoría, tiendas de caja grande, catálogos online sin orientación.

---

## Arquetipos de audiencia

### Arquetipo 1 — La Decoradora de Departamento
- **Quién es:** 25–35 años, vive en departamento o casa pequeña en Guadalajara. Activa en Instagram. Sigue cuentas de decoración, interiorismo y plantas. Le importa que su espacio "se vea bien".
- **Qué busca:** Una planta bonita que no muera, que quepa en su balcón o sala, y que alguien le diga exactamente qué hacer con ella.
- **Qué lo frena:** Miedo a no saber cuidarla. Precio. No saber si la especie que quiere está disponible.
- **Cómo hablarle:** Inspiración visual primero, asesoría después. Tono cálido, cercano, sin tecnicismos. Mostrarle el resultado (cómo se ve en un espacio), no el producto solo.

### Arquetipo 2 — El Vecino de la Zona
- **Quién es:** 35–55 años, vive en casa cerca del vivero (Cerro del Tesoro y colonias aledañas). Llega por recomendación o de paso. Puede ser dueño de casa con jardín o interesado en paisajismo.
- **Qué busca:** Alguien de confianza que le resuelva: una planta específica, asesoría para su jardín, o un proyecto de paisajismo completo.
- **Qué lo frena:** Precio de los proyectos grandes. No saber si "vale la pena" contratar paisajismo.
- **Cómo hablarle:** Autoridad amable. Mostrar proyectos reales, resultados concretos. Reforzar que la asesoría es sin costo y sin compromiso.

---

## Voz y tono

- **Personalidad:** Experta · Cálida · Confiable · Elegante sin ser fría.
- **Tono general:** Como una persona experta que habla con calidez — no técnica ni fría, no informal ni descuidada.
- **Emojis:** Moderados y elegantes — 🌿🌱✨🌸 · máximo 2 por caption o pieza. En la web: usar con criterio, nunca en headings.

**✅ Sí diríamos:**
- "¿No sabes qué planta va en tu espacio? Nosotros sí. Escríbenos 🌿"
- "Este Pothos lleva 3 semanas en ese rincón y ya transformó el ambiente."
- "Si no lo ves en el catálogo, lo conseguimos. Así de fácil."

**❌ No diríamos:**
- "¡OFERTA! 2x1 en plantas HOY SOLO" (tono de remate)
- "La Monstera deliciosa es una araceae de crecimiento indeterminado…" (tecnicismo frío)
- "Oye we, checa estas plantas tan chidas" (informalidad excesiva)

---

## Identidad visual (fuente única de verdad)

### Paleta de marca

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#6A7C62` | Verde olivo principal — CTA, acentos, texto sobre fondos claros |
| `primary-light` | `#7D9175` | Variante clara del primary |
| `secondary` | `#9AAF92` | Acentos secundarios |
| `accent-cereza` | `#941A28` | Rojo cereza de marca — detalles de identidad, no dominante |
| `bg` | `#FAFAF8` | Fondo general claro |
| `bg-card` | `#FFFFFF` | Fondo de cards |
| `bg-dark` | `#3A4635` | Fondo oscuro (secciones de énfasis, footer) |
| `texto` | `#1A1A1A` | Texto principal |
| `texto-sec` | `#6B6B6B` | Texto secundario |
| `texto-on-dark` | `#F5F5F0` | Texto sobre fondos oscuros |
| `border` | `#E5E5E0` | Bordes sutiles |

> **Fuente:** `./web-app/src/app/globals.css @theme {}` — cualquier cambio se origina ahí y se refleja aquí. El `accent-cereza` vive en marketing (imágenes, banners); el web todavía no lo tiene como token CSS — agregar si aparece en diseño web.

> **Nota de validación pendiente:** Marketing registró un posible drift histórico del cereza (`#C0392B` vs `#941A28`). Se tomó `#941A28` como canónico (mk-arranque 2026-04-20). Confirmar con Beatriz cuando llegue el logo en vectorial.

### Tipografías

- **Heading:** Playfair Display (serif elegante) — Google Fonts.
- **Body:** DM Sans (sans-serif limpio) — Google Fonts.

> Ambas usadas tanto en la web (cargadas con `next/font` en `layout.tsx`) como en las piezas de marketing (overlays en banners). Consistencia total entre canales.

### Elementos visuales de marca

- Logo en esquina inferior (pequeño, no invasivo) en piezas de marketing.
- Badge circular como elemento decorativo ocasional.
- Sin marcos recargados ni overlays de color sólido.
- Fondos neutros o de naturaleza (madera, piedra, tierra).
- Fotografía real: luz natural, clean, sin filtros agresivos.

**❌ Jamás:**
- Filtros Instagram "vintage" o de alto contraste.
- Emojis dentro de las imágenes.
- Texto encimado excesivo sobre la foto.
- Fondos digitales o ilustraciones planas.
- Colores neón o fuera de la paleta.

---

## Objetivos de negocio

- **Objetivo principal:** Generar mensajes directos a WhatsApp desde redes (asesoría + compra + cotización de paisajismo).
- **KPI prioritario:** Número de mensajes recibidos vía WhatsApp desde IG/FB.
- **Servicios a impulsar ahora:** Paisajismo (prioridad alta, ticket alto) · Plantas de interior (volumen).
- **Horizonte táctico:** Ciclos mensuales de contenido; web como vitrina permanente.

---

## Fechas clave del año

| Fecha | Evento | Relevancia |
|---|---|---|
| 10 mayo | Día de las Madres | 3 posts dedicados en calendario mayo · pico de intención de regalo |
| (por definir) | Calendario anual completo | Pendiente con cliente — cubrir en próxima sesión con Beatriz |

---

## Competencia y mercado

| Competidor | Qué hace bien | Oportunidad para Las Rosas |
|---|---|---|
| Vivo Interior | Estética muy cuidada en IG, contenido aspiracional | Igualar visualmente + añadir la capa de asesoría que ellos no comunican |
| Casa Florestta | Presencia fuerte, catálogo amplio | Diferenciarse con la cercanía y el trato personalizado |
| Vivero El Aguacate | Mismo giro, posiblemente más conocido en zona | Superar en calidad visual de redes y servicio de paisajismo |

**Tendencias:** Plantas de interior en auge en millennials con espacios pequeños urbanos · Paisajismo tropical como tendencia estética · Contenido educativo ("cómo cuidar") genera los mejores saves en IG.

---

## Decisiones cross-agent

| Fecha | Decisión | Agentes afectados | Razón |
|---|---|---|---|
| 2026-04-20 | Asesoría personalizada es el core narrativo. Debe aparecer en ≥1 de cada 3 piezas de marketing y tener lugar visible en la web | marketing, web-designer | Es el diferenciador; si no se comunica en todos los canales, se pierde |
| 2026-04-20 | Paisajismo = prioridad alta (ticket alto, Arquetipo 2) | marketing, web-designer | Define jerarquía: página `/paisajismo` dedicada, pilar "Jardines que transforman" en marketing |
| 2026-04-20 | TikTok en pausa hasta que IG/FB estén estables | marketing | Evitar dispersión antes de consolidar el canal principal |
| 2026-04-20 | Paleta verde-olivo + cereza + blanco hueso — no filtros vintage, no colores neón | marketing, web-designer | Consistencia visual entre web y redes — la misma foto debería poder ir a ambos canales sin conflicto estético |
| 2026-04-23 | Validar con Beatriz el hex exacto del cereza al recibir el logo en vectorial | marketing, web-designer | Drift histórico `#C0392B` (brief) vs `#941A28` (confirmado por ojo). Evita inconsistencia entre web y piezas |
| 2026-04-23 | Todas las imágenes del cliente se almacenan en **Vercel Blob** (store `vivero-las-rosas`). Nunca en `public/`. El registro de URLs vive en `./web-app/src/lib/images.ts`. La subida de nuevos lotes se hace con `node scripts/upload-images.mjs`. | web-designer | 200+ imágenes de productos en camino — almacenamiento local no escala. Git queda limpio de binarios. |

---

## Infraestructura técnica

| Servicio | Propósito | Acceso |
|---|---|---|
| **Vercel Blob** (store: `vivero-las-rosas`) | Almacenamiento de imágenes del cliente | `BLOB_READ_WRITE_TOKEN` en `./web-app/.env.local` · Dashboard: vercel.com → Storage |
| **GitHub** | Control de versiones del código (sin imágenes) | Repo bajo cuenta de Hubble Web Studio |
| **Vercel** | Deploy automático en cada `git push` | Conectado al repo de GitHub |

**Convención de imágenes:**
- Subida: `node scripts/upload-images.mjs ./carpeta imagenes/seccion` (desde `./web-app/`)
- Registro: `./web-app/src/lib/images.ts` — fuente única de URLs por sección
- Referencia en código: `import { IMG } from '@/lib/images'`
- `public/imagenes/` está en `.gitignore` — nunca se sube al repo

---

## Referencias compartidas

### Notion — workspace del cliente

- **Página Vivero Las Rosas:** `326f2ddc-b3db-80f4-b312-c9f6a97798a1` · [link](https://www.notion.so/326f2ddcb3db80f4b312c9f6a97798a1) · ruta: HUBBLE WEB STUDIO → PROYECTOS → VIVERO LAS ROSAS.

### Google Drive — recursos del cliente

- **Cuenta:** `santiagobarp10@gmail.com`
- **Carpeta VIVERO LAS ROSAS:** `12zg6dw4Oud4kCjNgHPOCSL1Ig5TBG8FC`
- **Carpeta FOTOS (raíz):** `1PRicFGiYvWhjIXGi_1i4qaREgBb6dXZh`

| Subcarpeta | ID Drive | Uso |
|---|---|---|
| `productos_crudo` | `1gLJh_DJPpLdsrGEdEx_WEDqAmOkR3lyH` | Fotos sin editar del celular |
| `productos_editadas` | `1fAwvWfEWIPtotC3KOipWQarq_jOhuOVW` | Fotos procesadas (listas para banner o para imagen hero de web) |
| `vivero` | `1Xh3FzhlyOjohY8aa4vhN6yg4qEFnuuz_` | Interiores, invernadero, espacio |
| `paisajismo` | `1TFZAN6Ou_Ylk_rEISpisTz-diaygi8Tr` | Proyectos terminados, antes/después |
| `equipo` | `1DdZ38311tvxwrx163Ax3kthFOBdikI5a` | Fotos de Beatriz |

> Las fotos son un insumo compartido: marketing las usa para banners, web-designer las usa para imagen de hero y galerías. Al usar una foto, anotar su ID en el `STATE-[agente].md` correspondiente.

---

## Notas directas del cliente

_(vacío por ahora — anotar aquí frases textuales que Beatriz diga y marquen rumbo de marca)_
