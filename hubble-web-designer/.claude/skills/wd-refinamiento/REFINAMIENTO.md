---
name: wd-refinamiento
description: Úsalo para iterar sobre secciones ya construidas en un proyecto existente. Actívalo cuando el usuario diga "ajusta esto", "no se parece a la referencia", "cambia el color de X", "rediseña la sección Y", "el hero no está bien", o cualquier corrección sobre algo que ya existe.
---

# Skill: Refinamiento de proyecto existente

Para modificar algo que ya está construido. Enfocado, quirúrgico — sin tocar lo que ya está aprobado.

---

## Antes de cualquier cambio

1. Leer `./MEMORY.md` (compartido) — design system canónico y decisiones cross-agent. Leer `./STATE-web.md` (bitácora propia) — qué está construido y aprobado.
2. Identificar exactamente qué sección(es) hay que cambiar.
3. Verificar si hay imagen de referencia disponible para esa sección:
   - `./references/sections/0X.png` → usar como guía visual obligatoria.
   - Si no hay imagen → preguntar al usuario qué resultado espera antes de codificar.

---

## Ciclo de refinamiento

### Paso 1 — Diagnóstico

Antes de tocar código, describe el problema con precisión:
```
Sección: [nombre]
Problema detectado: [descripción exacta]
Causa probable: [token incorrecto / estructura de layout / tamaño de fuente / etc.]
Solución propuesta: [qué archivo y qué línea cambiar]
```

Si el usuario solo dijo "no se ve bien" sin especificar → mostrar el diagnóstico y preguntar cuál es la discrepancia principal.

### Paso 1.5 — Consulta puntual a `wd-biblioteca` (solo si aplica)

Si el refinamiento implica **decidir algo nuevo** (no solo ajustar lo existente) — por ejemplo: cambiar a una paleta alternativa, elegir una fuente distinta, reemplazar un chart, adoptar un nuevo set de íconos — invocar la biblioteca en modo puntual antes de codificar:

```bash
cd ./hubble-web-designer/.claude/skills/wd-biblioteca
python3 scripts/search.py "[query]" --domain <dominio>
```

Transcribir la decisión al diagnóstico del Paso 1 con 1 línea de justificación. **No volcar resultado crudo al chat.**

Si el refinamiento es un ajuste puro (mover un padding, corregir un tamaño de texto, reparar un hover), **saltar este paso.**

### Paso 2 — Cambio mínimo

Hacer el cambio más pequeño posible que resuelva el problema:
- Si es un color → solo cambiar el token en `globals.css` (afecta todo el proyecto consistentemente).
- Si es un layout → solo cambiar el componente específico.
- **No refactorizar código que no está roto.**
- **No cambiar secciones que ya fueron aprobadas a menos que el usuario lo pida explícitamente.**

### Paso 3 — Verificación

Pedir screenshot del resultado y comparar contra referencia. Confirmar que el cambio no rompió nada adyacente (especialmente si fue un cambio de token global).

### Paso 4 — Registrar

Si el cambio fue significativo registrar según tipo: decisiones de paleta/fuente/tokens canónicos → `./MEMORY.md` (compartido); nuevas secciones construidas o componentes específicos del web → `./STATE-web.md` (bitácora).

### Paso 5 — Pre-Entrega (solo si el refinamiento tocó múltiples secciones o tokens globales)

Si el refinamiento fue un token global (ej. paleta, fuente, spacing base) o afectó más de una sección, invocar el skill **`wd-auditoria`** sobre la página completa para detectar regresiones que el cambio pudo introducir.

Para refinamientos quirúrgicos de una sola sección, **saltar este paso.**

---

## Tipos de refinamiento frecuentes

**Corrección de color** → modificar `./web-app/src/app/globals.css` en el bloque `@theme {}`, verificar que el cambio se vea correcto en toda la página.

**Corrección tipográfica** → revisar `./web-app/src/app/layout.tsx` (fuente cargada con `next/font`), `./web-app/src/app/globals.css` (tokens `--font-heading` / `--font-body`), y el componente específico en `./web-app/src/components/`.

**Ajuste de spacing** → cambiar el token `--spacing-section` en `globals.css @theme {}` si afecta toda la página; cambiar el componente en `./web-app/src/components/features/` si es específico de una sección.

**Cambio de imagen** → las imágenes del cliente viven en **Vercel Blob, no en `public/`**. Flujo:
1. Subir la imagen nueva desde `./web-app/`: `node scripts/upload-images.mjs ./ruta/imagen.ext imagenes/seccion`
2. Leer `./web-app/blob-manifest.json` — copiar la URL generada
3. Actualizar `./web-app/src/lib/images.ts` con la nueva URL bajo la clave correcta
4. En el componente, referenciar con `IMG.seccion.nombre` (ya importado de `@/lib/images`)

Siempre usar `next/image` con `fill` + `object-cover` para imágenes de fondo, o `width`/`height` reales para imágenes con dimensiones definidas.

**Rediseño completo de una sección** → tratar como una sección nueva: volver al ciclo de `wd-construccion` solo para esa sección.
