---
name: mk-estrategia
description: Úsalo para definir los pilares de contenido, la estrategia por plataforma y planificar el calendario editorial de un período. Requiere mk-arranque completado (estado confirmado en `../STATE-marketing.md`). Es el skill de conversación estratégica — aquí el usuario aprueba, ajusta y dirige. Output: pilares aprobados y calendario (en `../STATE-marketing.md` + Notion + archivo local). Actívalo cuando el usuario diga "definir pilares", "planificar contenido", "hacer el calendario", o cuando `../STATE-marketing.md` muestre mk-estrategia pendiente.
---

# Skill: mk-estrategia
## Estrategia de Contenido · Pilares + Plataformas + Calendario Editorial

Este skill toma el brief de `../MEMORY.md` (cuaderno compartido), construye propuestas de pilares y estrategia por plataforma, las trabaja con el usuario hasta aprobarlas, y luego genera el calendario editorial completo. Es el skill de conversación estratégica — aquí el usuario dirige, no solo aprueba.

---

## Filosofía de Ejecución

Los pilares no se imponen — se proponen y se refinan. El agente presenta su lectura estratégica, el usuario la ajusta, y solo cuando hay aprobación explícita se avanza al siguiente paso. El calendario es el resultado de esa conversación, no un output automático.

**Output de calidad:** cada post del calendario debe poder ejecutarse sin hacer más preguntas. mk-banner y mk-copy tomarán de aquí todo lo que necesitan.

---

## Requisitos de Entrada

Verificar antes de ejecutar:
- `../STATE-marketing.md` muestra `mk-arranque: ✅`
- `../MEMORY.md` (compartido) tiene brief estratégico completo (arquetipos, posicionamiento, voz, objetivos) y ADN visual.

Si alguno falta → detener y ejecutar `mk-arranque` primero.

---

## Fase A — Sincronización

Leer `../MEMORY.md` (compartido) y `../STATE-marketing.md` (bitácora). Cargar en contexto:

Desde `../MEMORY.md`:
- Arquetipos de audiencia
- Posicionamiento y diferenciador
- Guía de voz
- ADN visual
- Paleta y tipografías canónicas
- Objetivos de marketing y fechas clave

Desde `../STATE-marketing.md`:
- Pilares ya definidos (si los hay)
- Estrategia por plataforma previa
- IDs de Notion operativos (base de datos del calendario, página del cliente)
- Historial de calendarios producidos

Presentar al usuario el estado actual y preguntar:

```
Contexto cargado de Vivero Las Rosas.

Para arrancar necesito saber:
1. ¿Ya tienes pilares definidos o los construimos ahora?
2. ¿Hay algún enfoque especial para este período? (temporada, lanzamiento, evento)
3. ¿Qué período vamos a planificar? (semana / quincena / mes)
```

---

## Fase B — Definición de Pilares de Contenido

### B1 — Propuesta inicial

Si no hay pilares en MEMORY.md, construir propuesta basada en brief + ADN visual + objetivos:

```
## Pilares de Contenido Propuestos — [cliente]

Con base en el posicionamiento ("[declaración]"), el diferenciador (asesoría)
y la audiencia, propongo estos pilares:

### Pilar 1: "[nombre]"
- Propósito: [qué logra para el negocio]
- A quién habla: [arquetipo principal]
- Qué emoción activa: [trigger]
- % del mix: [%]
- Subtemas: [lista]
- Ejemplo de post: "[descripción concreta]"
- Formato preferido: [cuadrado / vertical / carrusel / reel]

[repetir para cada pilar]
```

Si ya hay pilares en `../STATE-marketing.md` (de una sesión anterior), presentarlos y preguntar si se mantienen o ajustan.

### B2 — Iteración con el usuario

Presentar todos los pilares y abrir conversación:
```
¿Qué ajustamos? Podemos:
- Cambiar el nombre o enfoque de un pilar
- Ajustar el porcentaje del mix
- Agregar o eliminar un pilar
- Cambiar los subtemas
```

Iterar hasta aprobación explícita. No avanzar sin "aprobado" o equivalente.

### B3 — Guardar pilares aprobados

Los pilares son **ejecución del marketing**, no identidad de marca. Van a `../STATE-marketing.md` bajo la sección "Pilares de contenido". No escribir pilares en `../MEMORY.md` compartido.

---

## Fase C — Estrategia por Plataforma

Con pilares aprobados, definir o revisar la estrategia por plataforma:

```
## Estrategia por Plataforma

### Instagram (prioridad principal)
- Frecuencia: [X posts/semana feed + Y stories/semana]
- Formatos por pilar: [qué formato para cada pilar]
- Lógica del feed: [alternancia, respiración visual]
- Stories: [rol — espontáneas / producidas / encuestas]
- Tono: [específico para IG]

### Facebook
- Frecuencia: [X posts/semana]
- Diferencia vs. IG: [qué se adapta, qué es exclusivo]
- Audiencia: [perfil en FB vs. IG]

### TikTok
- Estado: [activo / próxima fase / en pausa]
- Si activo: tipo de contenido, frecuencia
```

Si ya existe estrategia en `../STATE-marketing.md`, mostrarla y preguntar si se mantiene o ajusta para este período.

Validar con usuario antes de continuar.

---

## Fase D — Generación del Calendario Editorial

### D1 — Definir narrativa del período

```
## Narrativa del período [fechas]

Foco: [tema central si hay alguno especial]
Arco: [cómo fluyen los pilares — ej: "abrimos con inspiración, construimos
       confianza con educación, cerramos con CTA de paisajismo"]
Mix: [N posts de cada pilar]
```

### D2 — Generar todos los posts del período

Generar el calendario completo antes de presentar. Cada post completamente especificado:

```markdown
---
### Post [N] — [Fecha] · [Plataforma]

**Pilar:** [nombre]
**Arquetipo al que habla:** [arquetipo 1 / 2 / ambos]
**Formato:** [cuadrado 1:1 / vertical 4:5 / story 9:16 / carrusel / reel]

**Concepto:**
[2-3 líneas de qué trata y por qué en esta fecha]

**Hook:**
> "[primera línea que detiene el scroll]"

**Dirección visual:**
[Descripción exacta: composición, sujeto, ambiente, paleta, texto en imagen si lo hay.
Lo suficientemente detallado para que mk-banner lo ejecute sin preguntar.]

**Ángulo del caption:**
[Qué argumento o historia desarrolla — no el caption completo, sino la dirección]

**CTA:**
[Acción buscada: "escríbenos", "visítanos", "guarda este post", etc.]

**Hashtags:**
[8-12 hashtags — mix de alto volumen / nicho / marca]

**Estado:** 📋 Pendiente
---
```

### D3 — Volumen recomendado

Generar todos los posts del período completo en una sola sesión. No entregar de a poco.

---

## Fase E — Escritura en Notion y Archivo Local

### E1 — Notion (si MCP conectado)

**Buscar la página del cliente:**
```
Buscar en Notion: [nombre del cliente]
Ruta esperada: HUBBLE WEB STUDIO / PROYECTOS / [cliente]
```

**Crear o actualizar página "Estrategia de Contenido"** dentro de la página del cliente con:
- Resumen ejecutivo (3-4 líneas presentables al cliente)
- Arquetipos (formato legible)
- Posicionamiento
- Guía de voz (tabla sí/no)
- Pilares (sección por pilar)
- Estrategia por plataforma

**Crear base de datos "Calendario Editorial — [cliente]"** con propiedades:
- Fecha (Date)
- Plataforma (Select)
- Pilar (Select — nombres de los pilares aprobados)
- Formato (Select)
- Concepto (Text)
- Hook (Text)
- Dirección Visual (Text)
- Estado (Select: Pendiente / En producción / Listo / Publicado)
- Archivo de imagen (URL — se llena en mk-banner)

Crear una entrada por cada post del calendario.

Guardar los IDs según jurisdicción:
- **Página principal del cliente en Notion** (cross-agent, el web también la puede citar) → `../MEMORY.md` bajo "Referencias compartidas".
- **Base de datos del calendario + IDs operativos del marketing** (solo marketing los usa) → `../STATE-marketing.md` bajo "Referencias operativas".

### E2 — Archivo local (siempre, con o sin Notion)

Guardar calendario en:
`../marketing/output/calendarios/calendario-[periodo].md`

---

## Fase F — Presentación y Aprobación

```
## Calendario [período] listo ✅

[N] posts planificados:
- Instagram feed: [N]  
- Instagram stories: [N]
- Facebook: [N]

Distribución:
- [Pilar 1]: [N] posts
- [Pilar 2]: [N] posts
...

[Enlace Notion si fue creado]
[Ruta del archivo local]

¿Revisamos algún post antes de pasar a producción?
¿O arrancamos con mk-banner para el primer post?
```

---

## Fase G — Actualización de Bitácoras

Al cerrar, escribir según jurisdicción:

**→ `../STATE-marketing.md` (bitácora del marketing):**
1. Cambiar `mk-estrategia` de ⏳ a ✅
2. Cambiar `mk-banner` y `mk-copy` de 🔒 a ⏳
3. Guardar pilares aprobados + estrategia por plataforma del período
4. Guardar IDs operativos de Notion (base de datos del calendario)
5. Registrar en "Aprendizajes" el foco del período y decisiones operativas

**→ `../MEMORY.md` (compartido), solo si aplica:**
- Si se definió una nueva fecha clave del año que el web también debería saber → agregarla a "Fechas clave".
- Si surgió un ajuste de voz o arquetipo durante la conversación estratégica → actualizar la sección correspondiente.
- Si se creó la página principal del cliente en Notion y no estaba registrada → agregar su ID a "Referencias compartidas".

**Regla:** los pilares de contenido y el calendario nunca se duplican en `../MEMORY.md`. Si el web-designer los necesita, consulta el STATE del marketing.
