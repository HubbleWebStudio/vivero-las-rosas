---
name: mk-arranque
description: Úsalo para el onboarding de un cliente nuevo o para resetear la estrategia de uno existente. Construye el brief estratégico profundo y analiza las referencias visuales. Output: `../MEMORY.md` (brand, arquetipos, voz, paleta — compartido cross-agent) + estado de arranque en `../STATE-marketing.md`. Los pilares de contenido y la estrategia por plataforma son responsabilidad de mk-estrategia. Actívalo cuando el usuario diga "arrancar", "nuevo cliente", o cuando `../STATE-marketing.md` muestre mk-arranque pendiente.
---

# Skill: mk-arranque
## Onboarding · Brief Estratégico + ADN Visual

Este skill construye la base de conocimiento del cliente. Sus outputs se dividen:

- **`../MEMORY.md` (cuaderno compartido, cross-agent):** arquetipos, posicionamiento, voz, paleta canónica, tipografías, ADN visual. Todo lo que define la marca y es consumido por el web-designer y el marketing.
- **`../STATE-marketing.md` (bitácora propia):** estado de `mk-arranque`, progreso del flujo de marketing, referencias operativas locales.

**No define pilares de contenido ni estrategia por plataforma — eso es mk-estrategia.**

---

## Filosofía de Ejecución

**Construir primero, preguntar después.** El agente lee `PROJECT.md`, extrae todo lo que ya sabe, construye borradores y solo pregunta lo que genuinamente falta. Nunca preguntar algo que ya está en el brief.

El arranque termina cuando `../MEMORY.md` tiene brief + ADN visual completos. Punto. No avanzar hacia pilares ni plataformas — eso lo lidera mk-estrategia con el usuario.

---

## Fase A — Lectura del Estado Actual

**1.** Leer `../marketing/PROJECT.md` completo (brief inmutable del cliente).

**2.** Leer `../MEMORY.md` (cuaderno compartido) — ¿ya existe identidad de marca definida por otro agente? Leer `../STATE-marketing.md` (bitácora propia) — verificar estado de `mk-arranque`.

**3.** Verificar referencias disponibles:
```
ls ../marketing/references/brand/
ls ../marketing/references/inspiracion/
ls ../marketing/references/fotos/
```

**4.** Presentar resumen al usuario:

```
## Estado detectado — [Nombre del cliente]

✅ Ya tengo del PROJECT.md:
- [lista de campos completados]

📋 Construiré con lo que hay (y validaré contigo):
- [campos con info parcial]

⏳ Solo preguntaré:
- [lo que genuinamente no está en el brief]

📁 Referencias:
- brand/: [N archivos — listar nombres]
- inspiracion/: [N archivos — listar nombres]

¿Empezamos?
```

---

## Fase B — Brief Estratégico Profundo

### Regla de oro: construir primero, preguntar después

Leer PROJECT.md completo → construir borrador de cada elemento → presentar al usuario → solo preguntar lo que falta.

### B1 — Arquetipos de Audiencia

Construir 2–3 arquetipos con los datos del brief y presentarlos:

```
Con el brief construí estos arquetipos. ¿Los ajustamos?

Arquetipo 1: [nombre descriptivo]
- Quién es: [construido del brief]
- Qué busca: [construido del brief]
- Qué lo frena: [construido del brief]
- Cómo hablarle: [inferido del tono]

Arquetipo 2: [ídem]
```

Preguntar solo si hay perfiles de cliente que el brief no mencione y que sean relevantes.

### B2 — Posicionamiento

Construir declaración de posicionamiento con diferenciador del brief y presentarla:

```
Propongo este posicionamiento:
"[declaración construida del brief]"

Diferenciador: [del brief]
¿Lo ajustamos?
```

### B3 — Voz y Tono

Construir guía de voz con el tono definido en el brief:

```
Guía de voz basada en "[tono del brief]":

Personalidad: [adjetivos]
✅ Sí diríamos: "[ejemplo]"
✅ Sí diríamos: "[ejemplo]"
❌ No diríamos: "[ejemplo]"
❌ No diríamos: "[ejemplo]"

¿Ajustamos algo?
```

### B4 — Objetivos

Extraer y estructurar objetivos del brief. Solo preguntar:
- "¿Hay fechas clave del año que deba considerar?" (si no están en el brief)

### B5 — Competencia

Estructurar competidores del brief en tabla. Preguntar solo si falta contexto competitivo real.

### Cierre de Fase B

Presentar resumen completo para aprobación antes de pasar al análisis visual:

```
## Resumen del Brief — [cliente]

Arquetipos: [nombres]
Posicionamiento: "[declaración]"
Voz: [adjetivos]
Objetivo: [en una línea]
Competencia: [lista]

¿Aprobamos y pasamos al análisis visual?
```

---

## Fase C — Análisis Visual de Referencias

> **One-Time Read.** Leer cada imagen una sola vez, extraer todo, transcribir. No releer.

### C1 — Assets de Marca (`../marketing/references/brand/`)

Para cada archivo:
```
Archivo: [nombre]
Tipo: [logo / design system / screenshot web / etc.]
Colores detectados: [hex o descripción]
Tipografías visibles: [nombre o descripción]
Elementos gráficos propios: [formas, íconos, patterns]
Observación clave: [qué dice sobre la identidad visual]
```

Confirmar o corregir colores en PROJECT.md si hay discrepancia.

### C2 — Referencias de Inspiración (`../marketing/references/inspiracion/`)

Para cada imagen:
```
Imagen: [nombre]
Composición: [layout — foto full / texto overlay / mitad-mitad / etc.]
Paleta visual: [colores dominantes]
Tipografía en pieza: [serif/sans/script — peso y tamaño relativo]
Elementos gráficos: [marcos, overlays, texturas, formas]
Proporción texto/imagen: [%]
Mood: [3 adjetivos]
Por qué funciona: [qué la hace efectiva]
Aplicable a este cliente: [sí / parcialmente / no — por qué]
```

### C3 — Síntesis ADN Visual

```
## ADN Visual — [cliente]

Estilo dominante: [descripción de 2-3 líneas]
Composición típica: [jerarquía, espacio, foco]
Paleta de imagen: [tonos, saturación, contraste]
Tipografía en piezas: [tipo, peso, cuándo usar]
Elementos gráficos de marca: [los que se repiten]

✅ Debe aparecer: [3-5 elementos]
❌ No debe aparecer: [3-5 elementos]
```

Si no hay referencias en `inspiracion/`: pedir al usuario 3–5 cuentas de Instagram que admire como referencia alternativa.

---

## Fase D — Escritura y Cierre

Con brief y ADN visual aprobados, escribir en los dos cuadernos según jurisdicción:

**→ `../MEMORY.md` (compartido, cross-agent):**
- Ficha del cliente (nombre, rubro, ubicación).
- Posicionamiento y diferenciador.
- Arquetipos de audiencia.
- Voz y tono.
- Paleta canónica con tokens hex.
- Tipografías canónicas.
- ADN visual (estilo, composición típica, elementos gráficos de marca, ✅/❌).
- Fechas clave del año.
- Competencia.

Si `../MEMORY.md` ya existe porque otro agente lo creó antes, **no sobreescribir** — complementar con la información que falte y respetar tokens que ya estén en código desplegado.

**→ `../STATE-marketing.md` (bitácora propia):**
- `mk-arranque`: ✅ Completado [fecha]
- `mk-estrategia`: ⏳ Pendiente (desbloqueado)
- Referencias operativas locales consultadas (qué archivos de `references/` fueron leídos).

Actualizar también `../marketing/PROJECT.md` con los campos que estaban pendientes (PROJECT es inmutable salvo cuando el cliente cambia datos del brief).

**Mensaje de cierre:**

```
✅ mk-arranque completado.

Base estratégica construida para [cliente]:
— [N] arquetipos definidos
— Posicionamiento: "[frase]"
— Voz: [adjetivos]
— Objetivo: [en una línea]
— ADN visual extraído de [N] referencias

Identidad de marca guardada en ../MEMORY.md (compartido).
Estado del flujo en ../STATE-marketing.md.

Siguiente paso → mk-estrategia para definir los pilares
de contenido y planificar el calendario. ¿Arrancamos?
```
