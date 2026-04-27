---
name: wd-auditoria
description: Auditoría técnica + crítica de diseño UX sobre páginas o secciones ya construidas. Corre un detector real de anti-patrones (npx impeccable detect), una revisión heurística tipo Nielsen con personas, y produce un reporte con score P0-P3 y plan de acción. Úsalo como gate obligatorio de pre-entrega en wd-construccion, wd-refinamiento (cuando el cambio fue global) y wd-diseño, o bajo demanda cuando el usuario diga "audita esta página", "revisá cómo quedó", "dale una pasada de calidad", "mirá si se ve AI-generado", "chequeá accesibilidad", "qué tan bien está esto".
---

# Skill: Auditoría de calidad

Gate profesional para no entregar páginas con cara de AI-generated ni con fallos de accesibilidad/performance/tipografía. Combina un **detector ejecutable** (escanea el código real) con una **crítica LLM estructurada** (heurísticas, personas, carga cognitiva).

Basado en `impeccable` v2.1.7 (Paul Bakaus, Apache 2.0). Absorbe los skills originales `/audit`, `/critique` y parte de `/polish` en un solo flujo.

---

## Filosofía

- **No existe "entrega al ojo".** Toda página pasa por un auditor con reglas escritas antes de declararse lista.
- **Detector antes que opinión.** El CLI `impeccable detect` marca 25 anti-patrones específicos en el código — eso va primero, antes de que el agente opine. Las opiniones sin evidencia son ruido.
- **La crítica complementa, no sustituye.** Un linter no sabe si el tono del hero es correcto para la audiencia; una persona sí. Por eso la fase de revisión LLM existe.
- **Severidad ruthless.** No todo es P0. Si el reporte marca 20 P0, el agente falló priorizando.

---

## Requisitos previos

- Node.js ≥ 18 en el proyecto (Next.js 14 ya lo trae).
- Red disponible la primera vez que se corre `npx impeccable` (descarga ~500KB al cache de npm).
- La página a auditar debe estar corriendo localmente (`localhost:3000`) **o** sus archivos accesibles en `./web-app/src/`.

---

## Cuándo se activa

| Origen | Tipo de disparo |
|---|---|
| `wd-construccion` Paso 6 | Obligatorio — al cerrar la página completa antes de entregar |
| `wd-refinamiento` Paso 5 | Obligatorio — cuando el refinamiento tocó tokens globales o múltiples secciones |
| `wd-diseño` Fase D | Obligatorio — al cerrar la página generada sin referencia visual |
| Usuario directo | "audita", "revisa cómo quedó", "chequeá calidad", "se ve AI", "contraste", "accesibilidad" |

---

## Flujo (Fases A → E)

### Fase A — Preparación

1. Leer `./MEMORY.md` (compartido) — confirmar tokens canónicos, fuentes, paleta y decisiones cross-agent. Leer `./STATE-web.md` — entender qué secciones/páginas se van a auditar.
2. Identificar el target:
   - **Ruta de archivos** en `./web-app/src/` (preferido para el CLI).
   - **URL local** si el dev server está arriba (preferido para validación visual).
   - **Alcance**: página completa, sección específica, o flujo (ej. registro).
3. Confirmar al usuario qué se va a auditar antes de disparar el scan. No presumir alcance.

### Fase B — Detección automatizada (impeccable detect)

Correr el detector sobre el target:

```bash
# Desde la raíz del workspace del cliente
cd ./web-app
npx impeccable detect src/ --json > /tmp/impeccable-report.json
```

Opciones útiles:
- `--fast` — modo regex-only, para escaneos sobre 200+ archivos.
- Target puede ser archivo, carpeta o URL (URL requiere Puppeteer — opcional).
- Exit code: `0` = limpio, `2` = hay hallazgos.

El output JSON lista 25 posibles anti-patrones. Los más críticos para Hubble:

| Categoría | Qué detecta |
|---|---|
| **AI Slop visual** | Gradient text, side-tab borders, nested cards, AI color palette (cyan/purple), dark mode con glow |
| **Tipografía** | Fuentes de la lista `reflex_fonts_to_reject` (Inter, Space Grotesk, Fraunces, Playfair, DM Sans, Plus Jakarta…), una sola fuente para todo, flat hierarchy, body uppercase, letter-spacing ancho |
| **Color** | Contrast < 4.5:1, gray text sobre fondo coloreado, fondo `#000` puro |
| **Layout** | Monotonous spacing, everything centered, icon tile sobre heading |
| **Motion** | Bounce/elastic easing, animación de `width/height/top/left` |
| **Responsive** | Line length > 75ch, cramped padding, tiny body text (< 14px), tight line-height |
| **Accesibilidad** | Heading levels saltados, justified text, skipped landmarks |

**Transcribir al reporte solo los findings reales.** El CLI puede tener falsos positivos; el agente los marca como tal y los explica.

### Fase C — Revisión LLM estructurada

Tras el detector, el agente hace una pasada manual evaluando 3 ejes:

#### C1 — Heurísticas de Nielsen (score 0-4 en cada una, total 0-40)

| # | Heurística | Pregunta guía |
|---|---|---|
| 1 | Visibility of System Status | ¿El usuario sabe siempre qué está pasando? (loading states, feedback) |
| 2 | Match System / Real World | ¿El lenguaje y los íconos matchean el mundo del usuario? |
| 3 | User Control and Freedom | ¿Hay undo, cancel, back? ¿No hay trampas modales? |
| 4 | Consistency and Standards | ¿Misma acción = mismo lugar, mismo ícono, mismo label? |
| 5 | Error Prevention | ¿Se previenen errores antes de que pasen? |
| 6 | Recognition Rather Than Recall | ¿El usuario reconoce opciones o tiene que recordarlas? |
| 7 | Flexibility and Efficiency | ¿Hay shortcuts para power users? |
| 8 | Aesthetic and Minimalist Design | ¿Hay información irrelevante o decoración ruidosa? |
| 9 | Error Recovery | ¿Los mensajes de error ayudan a resolverlo? |
| 10 | Help and Documentation | ¿Hay ayuda contextual donde hace falta? |

**Rating bands** (sobre 40): `36-40` Excelente · `28-35` Sólido · `20-27` Aceptable · `12-19` Pobre · `0-11` Crítico.

Ser honesto: la mayoría de interfaces reales están en 20-32. Un 4 implica "genuinamente excelente", no "cumple".

#### C2 — Carga cognitiva (checklist de 8 ítems, contar fallos)

- [ ] ¿Más de 4 opciones visibles en un punto de decisión? (flag si sí)
- [ ] ¿Información densa sin agrupación visual?
- [ ] ¿Jerarquía tipográfica plana?
- [ ] ¿Colores compitiendo entre sí?
- [ ] ¿Animaciones distrayendo del contenido principal?
- [ ] ¿Copy redundante (heading + subheading diciendo lo mismo)?
- [ ] ¿Sin progressive disclosure en features avanzadas?
- [ ] ¿CTAs múltiples compitiendo por atención en la misma sección?

Rangos: `0-1` baja · `2-3` moderada · `4+` crítica.

#### C3 — Personas relevantes (2 máximo)

Elegir 2 personas según el tipo de producto y caminar su acción primaria:

- **Alex (Power User):** valora velocidad, shortcuts, densidad, control. Red flags: falta de keyboard nav, exceso de modales, onboarding forzado.
- **Jordan (First-Timer):** necesita claridad, labels, onboarding suave. Red flags: jerga técnica, íconos sin label, errores crípticos.
- **Sam (Mobile-first):** toque, scroll, conexión variable. Red flags: touch targets < 44px, layout que rompe en viewport estrecho, assets pesados.
- **Morgan (A11y-first):** lector de pantalla, navegación por teclado, contraste. Red flags: aria faltante, focus invisible, contraste < 4.5:1.

Para cada persona, listar 1-3 red flags **específicos de esta página**, con ubicación exacta (componente, archivo). Cero generalidades tipo "podría mejorar la accesibilidad".

### Fase D — Reporte Combinado

Presentar al usuario un documento con esta estructura:

```markdown
# Auditoría: [Página/Sección] — [fecha]

## Veredicto AI Slop
[Pasa / No Pasa]
- Tells detectados por CLI: [lista con ubicación]
- Impresión LLM: [1 párrafo sobre si se siente genérico o distintivo]

## Score Técnico (CLI impeccable)
| Dimensión | Score 0-4 | Hallazgo clave |
|---|---|---|
| Accesibilidad | ? | ... |
| Performance | ? | ... |
| Responsive | ? | ... |
| Theming | ? | ... |
| Anti-patrones | ? | ... |
| **Total** | **?/20** | [rating band] |

## Score UX (Nielsen 10)
[tabla con las 10 heurísticas y score]
Total: ?/40 — [rating band]

## Carga Cognitiva
Fallos del checklist: ?/8 — [baja / moderada / crítica]

## Personas — Red Flags
### Alex (Power User)
- [red flag específico con ubicación]

### Jordan (First-Timer)
- [red flag específico con ubicación]

## Issues Priorizados

### P0 Bloqueante
- **[Issue name]** — `archivo:línea` — [impacto en usuario] — Fix: [acción concreta]

### P1 Mayor
- ...

### P2 Menor
- ...

### P3 Polish
- ...

## Lo que funciona
- [2-3 cosas que están bien hechas, con justificación]

## Plan de acción
1. [P?] → invocar `wd-refinamiento` sobre [sección] para [fix]
2. [P?] → actualizar token en `globals.css` — [token específico]
3. [P?] → …
```

**Severidades P0-P3:**
- **P0 Bloqueante** — fallo WCAG AA, componente roto, AI slop obvio. No se entrega así.
- **P1 Mayor** — dificultad real del usuario, visible pero recuperable.
- **P2 Menor** — inconsistencia molesta, workaround existe.
- **P3 Polish** — pulido, sin impacto funcional.

### Fase E — Cierre

1. Mostrar el reporte completo al usuario.
2. Preguntarle qué scope quiere corregir (todo / solo P0 / solo P0+P1 / nada, entrego así bajo mi propio riesgo).
3. Para cada fix acordado, invocar la skill correspondiente:
   - Correcciones de layout/color/tipografía/spacing → `wd-refinamiento`.
   - Cambios estructurales o de arquitectura de sección → `wd-construccion` (rehacer la sección).
4. Al terminar los fixes, **re-correr `wd-auditoria`** sobre el target para verificar el score mejoró. Sin re-auditoría no hay entrega.
5. Actualizar `./STATE-web.md` con:
   - Score final.
   - Issues resueltos vs issues aceptados conscientemente por el usuario.
   - Timestamp de la auditoría aprobada.
   - Si algún issue cambió un token de marca (paleta por contraste, fuente por reflex list), reflejarlo también en `./MEMORY.md`.

---

## Reglas Core

- **El CLI corre primero, siempre.** Opinar sin detector es adivinar. Si el detector falla por algo técnico (sin red, versión de Node), reportar al usuario y proceder solo con Fase C marcando el reporte como "parcial — sin detector".
- **Severidades duras.** P0 significa "no entrego esto". Si todo es P0, el agente está usando severidades como adorno.
- **Ubicación exacta en cada issue.** `archivo:línea:columna` o `componente:prop`. Sin ubicación no hay fix.
- **Una sola auditoría completa por página.** No 10 auditorías parciales. Si la página está incompleta, no se audita — se construye primero.
- **Re-auditoría obligatoria tras fixes.** Sin eso no hay forma de saber si el score mejoró.
- **Falsos positivos del CLI se marcan como tal.** No se transcriben al plan de acción; se anotan aparte con justificación.

---

## Salida mínima al usuario

Al arrancar: un mensaje que deje claro el alcance y el plan.

```
🔍 Auditoría en curso
Target: [ruta / URL]
Fase B: npx impeccable detect src/
Fase C: revisión heurística + 2 personas
Reporte en: [30-60s]
```

Al terminar: el reporte completo + una recomendación clara de próximo paso (cuánto corregir, en qué orden, con qué skill).

---

## Integración con `wd-biblioteca`

- Los anti-patrones detectados (fuentes reflex, AI palette, gradient text, bounce easing) están alineados con las reglas que vienen dentro de `wd-biblioteca/BIBLIOTECA.md` y `wd-biblioteca/data/reflex-fonts.csv`. Si hay un finding que la biblioteca recomienda al contrario, **gana el detector** (evidencia sobre catálogo) y se escala el conflicto a Santiago vía `ops-mejorar-skill`.
- El Pre-Delivery Checklist (Web) que antes vivía en `wd-biblioteca/BIBLIOTECA.md` fue degradado a "ejecutá `wd-auditoria`". El detector real es más estricto que el checklist markdown, y además produce un score.
