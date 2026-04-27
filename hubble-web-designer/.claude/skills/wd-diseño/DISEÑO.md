---
name: wd-diseño
description: Úsalo para crear una página o sección desde cero cuando NO hay imagen de referencia visual. Actívalo cuando el usuario diga "diséñame una landing para X", "propón un hero", "crea una sección About sin referencia", "necesito una página nueva pero no tengo mock", o cuando el proyecto requiera dirección de arte antes de codificar. Arranca consultando wd-biblioteca en modo completo para generar un design system (estilo + paleta + tipografía) y luego construye con decisiones justificadas.
---

# Skill: Diseño sin referencia visual

Para crear páginas o secciones cuando no existe un mock. El agente asume dirección de arte: decide estilo, paleta y tipografía con fundamento, no por intuición.

> **Regla central:** No existe "diseño ad-hoc". Todo proyecto sin referencia empieza con una consulta a `wd-biblioteca` en modo completo. De ahí sale el `MASTER.md` del design system, y solo después se codifica.

---

## Antes de empezar

1. Leer `./MEMORY.md` (compartido) — confirmar si ya existe design system aprobado o es arranque desde cero. Leer `./STATE-web.md` si hay páginas previas construidas.
2. Entender el brief del usuario:
   - ¿Qué tipo de producto / sector? (SaaS, e-commerce, portfolio, fintech, etc.)
   - ¿Qué audiencia? (B2B técnico, consumidor final, nicho creativo, etc.)
   - ¿Qué tono? (corporativo, editorial, lúdico, brutalista, minimalista, etc.)
   - ¿Qué diferencia quiere el usuario? ¿Una referencia de admiración, un competidor, un mood board textual?
3. Si el brief es ambiguo en alguno de los 4 puntos → **preguntar antes de consultar la biblioteca.** Un brief vago produce un design system genérico.

---

## Fase A — Design System (wd-biblioteca en modo completo)

**Obligatorio.** Sin `MASTER.md` no hay código.

### A1 — Formular la query

Con el brief en mano, escribir una query corta y rica en keywords:

```
"[producto/sector] [tono] [elemento diferenciador]"
```

Ejemplos:
- `"fintech dashboard dark refined accent violet"`
- `"editorial portfolio serif display asymmetric layout"`
- `"ecommerce bakery warm earthy handwritten"`

### A2 — Invocar la biblioteca

```bash
cd ./hubble-web-designer/.claude/skills/wd-biblioteca
python3 scripts/search.py "[query]" --design-system --persist -p "[Nombre del cliente]" --output-dir ../../../../web-app
```

Esto crea `./web-app/design-system/[slug]/MASTER.md` con:
- Estilo recomendado (+ alternativas).
- Paleta con tokens semánticos.
- Pareo tipográfico (heading + body) con Google Fonts URL e import.
- Stack de implementación (Next.js + Tailwind v4 + Shadcn).
- Checklist de implementación específica del estilo.

### A3 — Justificar al usuario

Antes de codificar, mostrar al usuario las 3 decisiones centrales:

```
🎨 Propuesta de design system
Estilo: [nombre] — [1 línea: por qué aplica al brief]
Paleta: [nombre de paleta] — [1 línea: qué emoción transmite]
Tipografía: [heading] / [body] — [1 línea: por qué combina con el estilo]
```

Si el usuario pide alternativas, reformular la query y volver a A2. **No negociar paleta/fuente sin una nueva consulta** — la biblioteca existe para no improvisar.

### A4 — Confirmar y transcribir

Cuando el usuario aprueba:
1. Transcribir los tokens del `MASTER.md` a `./web-app/src/app/globals.css` bajo `@theme {}` — variables de color, fuentes, radios, spacing.
2. Cargar las fuentes con `next/font` en `./web-app/src/app/layout.tsx`.
3. Actualizar `./MEMORY.md` (compartido) con la decisión de marca (estilo, paleta, fuentes) — es cross-agent, afecta también al marketing. Dejar el link al `MASTER.md` en `./STATE-web.md` para las futuras iteraciones del web.

---

## Fase B — Arquitectura de secciones

Antes de construir nada, decidir qué secciones lleva la página.

### B1 — Consulta puntual a biblioteca (patrón de landing)

Si es una landing:

```bash
python3 scripts/search.py "[tipo de producto] landing conversion" --domain landing
```

De ahí sale el orden de secciones y la estrategia de CTA.

### B2 — Plan escrito

Lista explícita antes de codificar:

```
Página: [nombre]
Secciones (en orden):
1. [Navbar]     — [variante: transparente sobre hero / sticky con blur / etc.]
2. [Hero]       — [layout: centrado / split 60-40 / full-bleed / etc.]
3. [Sección X]  — [propósito + layout]
4. …
N. [Footer]    — [variante]
CTA principal: [texto] — posición [arriba / medio / repetido]
```

Mostrar el plan al usuario y pedir aprobación antes de empezar a codificar.

---

## Fase C — Construcción

### C1 — Una sección a la vez

El ciclo de construcción es el mismo que `wd-construccion`, con estas diferencias:

- **No hay imagen de referencia.** La decisión de layout, colores y tipografía sale del `MASTER.md` y del plan de B2.
- **Consulta puntual a biblioteca cuando aparezca una subdecisión.** Ejemplos:
  - "¿Qué chart uso aquí?" → `--domain chart`
  - "¿Qué íconos uso?" → `--domain icons`
  - "¿Este hero rinde con animación o con composición?" → `--domain style`

### C2 — Archivo y reglas

Archivo: `./web-app/src/components/features/[NombreSeccion].tsx`

Reglas idénticas a `wd-construccion`:
- Cero hardcode — todo vía tokens de `@theme {}`.
- Framer Motion para entradas y hover.
- `next/image` con dimensiones correctas.
- Texto placeholder marcado con `{/* TODO: Reemplazar con contenido real */}`.

### C3 — Verificación

Pedir al usuario screenshot de `localhost:3000`. Comparar contra:
- El `MASTER.md` (tokens aplicados, tipografía, paleta).
- El plan de B2 (orden, layouts, CTAs).
- El estilo elegido (si es minimalism, que no haya clutter; si es brutalism, que no se vea suave; etc.).

Si hay discrepancia entre lo que se ve y el `MASTER.md`, corregir el código — **no el `MASTER.md`.**

### C4 — Aprobar y registrar

Actualizar `./STATE-web.md` al aprobar cada sección (progreso de construcción). Mismo patrón que `wd-construccion` — solo tokens canónicos nuevos bajan al `./MEMORY.md` compartido.

---

## Fase D — Pre-Entrega

Obligatorio antes de declarar la página lista.

Invocar el skill **`wd-auditoria`** sobre la página completa. El skill corre `npx impeccable detect` sobre el código + revisión heurística LLM con Nielsen + 2 personas relevantes al producto. Produce score técnico /20, score UX /40 y plan P0-P3.

Todo P0 se resuelve. Los P1 se negocian con el usuario. Al cerrar:

1. Actualizar `./STATE-web.md` con la entrega: score final, issues aceptados conscientemente, timestamp. Si algún issue requirió mover un token de marca (color, fuente), reflejarlo también en `./MEMORY.md`.
2. Dejar el link al `MASTER.md` vivo en `./STATE-web.md` para que futuras iteraciones (`wd-refinamiento`) lo usen como referencia.

---

## Cuándo NO usar esta skill

- Si el usuario sube una imagen de referencia visual (mock, screenshot, inspiración completa) → usar `wd-arranque` o `wd-construccion` según corresponda.
- Si hay que iterar sobre una página existente → usar `wd-refinamiento`.
- Si solo hace falta construir una sección más sobre un proyecto con design system ya definido → usar `wd-construccion` puntual.

---

## Reglas Core

- **Nunca improvisar dirección de arte.** Consulta `wd-biblioteca` en modo completo; no inventes paletas de cabeza.
- **El `MASTER.md` es ley.** Una vez aprobado, cualquier desviación en código es un bug, no una decisión creativa.
- **Una fuente de verdad por proyecto.** El `MASTER.md` vive en `./web-app/design-system/[slug]/` y es el único referente del design system completo. `./MEMORY.md` cita los tokens canónicos (paleta, fuentes) para que todos los agentes los vean, y `./STATE-web.md` linkea al `MASTER.md` para las iteraciones futuras del web.
- **Justificación obligatoria al usuario.** Cada decisión de estilo/paleta/fuente se comunica con una línea de por qué. Cero "porque me gustó".
