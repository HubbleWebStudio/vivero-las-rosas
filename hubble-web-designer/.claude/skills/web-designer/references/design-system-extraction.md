# Guía: Extracción de Design System desde Imágenes

Cuando tienes una imagen de referencia y necesitas extraer los tokens del design system, sigue este proceso sistemático. Todos los tokens se definen en `./web-app/src/app/globals.css` dentro del bloque `@theme {}` (Tailwind v4).

---

## Colores

### Método de extracción

Observa la imagen con atención y clasifica los colores por frecuencia y rol:

**Pregunta 1: ¿Cuál es el color de fondo dominante?**
- ¿Blanco puro (#FFFFFF)?
- ¿Crema/Warm white (ej: #FAFAF7, #F5F0EB)?
- ¿Gris claro (#F8F8F8)?
- ¿Color sólido (raro pero posible)?

**Pregunta 2: ¿Cuál es el color "hero" del diseño?**
Este es el color que aparece en el logo, los botones CTA, los íconos activos, y los acentos. Suele ser el color más saturado y específico del diseño.

**Pregunta 3: ¿Hay un color oscuro secundario?**
Muchos diseños tienen una sección CTA oscura al final o un footer dark. Ese color oscuro también es un token.

**Pregunta 4: ¿Qué tono tienen los textos?**
- Negro puro (#000000) — muy raro en diseños modernos
- Negro suavizado (#1A1A1A, #111827) — el más común
- Gris oscuro para subtítulos (#6B7280, #9CA3AF)

### Tokens de color — formato @theme {}

```css
@theme {
  /* Marca */
  --color-brand-primary:       [color primario];
  --color-brand-primary-light: [versión más clara del primario];
  --color-brand-secondary:     [color secundario si existe];

  /* Fondos */
  --color-bg:      [fondo principal de la página];
  --color-bg-card: [fondo de cards / elementos elevados];
  --color-bg-dark: [fondo oscuro para secciones CTA / footer];

  /* Textos */
  --color-text-primary:   [color de texto principal];
  --color-text-secondary: [color de texto secundario / subtítulos];
  --color-text-on-dark:   [color de texto sobre fondos oscuros];

  /* Bordes */
  --color-border: [color de bordes sutiles];
}
```

**Uso en componentes:** `bg-brand-primary`, `text-text-secondary`, `border-border`, `bg-bg-card`, etc.

---

## Tipografía

### Identificación de fuentes desde imagen

**Características a observar:**
- **Serif vs Sans-serif**: ¿Los caracteres tienen "patas" (serif) o son líneas limpias (sans-serif)?
- **Geometric vs Humanist**: Las sans-serif geométricas (Futura, Circular) tienen letras casi perfectamente circulares. Las humanistas (Gill Sans, Calibri) tienen más variación.
- **Display fonts**: Para headings grandes, busca si tiene características únicas (pesos extra heavy, rasgos decorativos)

**Google Fonts equivalentes comunes:**

| Estilo visual      | Opción Google Fonts          |
|--------------------|------------------------------|
| Clean, moderno     | Inter, Plus Jakarta Sans     |
| Geométrico         | DM Sans, Outfit              |
| Elegante serif     | Playfair Display, Cormorant  |
| Serif moderno      | Lora, Merriweather           |
| Display bold       | Syne, Space Grotesk          |
| Orgánico, warm     | Nunito, Poppins              |

### Tokens de fuente — formato @theme {}

```css
@theme {
  /* Variables de familia tipográfica */
  /* (--font-heading-var y --font-body-var son inyectadas por next/font en layout.tsx) */
  --font-heading: var(--font-heading-var), serif;
  --font-body:    var(--font-body-var), sans-serif;
}
```

**Uso en componentes:** `font-heading`, `font-body`

### Escala tipográfica — formato @theme {}

Identifica los tamaños recurrentes observando las proporciones relativas:

```css
@theme {
  /* Mínimo 5 tamaños — ajusta los rem según la referencia */
  --text-display:    3.5rem;   --text-display--line-height:    1.1;
  --text-h1:         2.5rem;   --text-h1--line-height:         1.2;
  --text-h2:         1.75rem;  --text-h2--line-height:         1.3;
  --text-h3:         1.25rem;  --text-h3--line-height:         1.4;
  --text-body-lg:    1.125rem; --text-body-lg--line-height:    1.6;
  --text-body:       1rem;     --text-body--line-height:       1.6;
  --text-small:      0.875rem; --text-small--line-height:      1.5;
  --text-label:      0.75rem;  --text-label--line-height:      1.4;
}
```

**Uso en componentes:** `text-display`, `text-h1`, `text-body`, `text-label`, etc.

---

## Espaciado

### Container y max-width

Observa qué tan ancho es el contenido versus el viewport:
- **Full width**: El contenido llega al borde. Raro en diseños limpios.
- **Max-width 1280px** (`80rem`): El más común. Contenido centrado con padding lateral.
- **Max-width 1024px** (`64rem`): Para diseños más intimistas.

### Padding de secciones

El ritmo vertical del espaciado entre secciones define la "respiración" del diseño:
- **Compacto**: ~`4rem` (64px)
- **Estándar**: ~`6rem` (96px)
- **Espacioso**: ~`8rem` (128px)

### Tokens de espaciado — formato @theme {}

```css
@theme {
  --spacing-section:      6rem;   /* Padding vertical estándar entre secciones */
  --spacing-section-sm:   4rem;   /* Secciones más compactas */
  --spacing-container-px: 1.5rem; /* Padding lateral del container */
  --width-container:      80rem;  /* Ancho máximo del contenido */
}
```

**Uso:** Las clases `.container-hubble` y `.section-padding` definidas en `@layer components` de `globals.css` consumen estos tokens automáticamente.

---

## Bordes y efectos

### Border radius

Observa las esquinas de las cards y botones:
- **Nada o minimal**: `4px` o `6px` — diseños corporativos
- **Moderado**: `8px` o `12px` — el más versátil
- **Muy redondeado**: `16px` o `24px` — diseños warm/playful
- **Pill**: `9999px` — para badges, chips, algunos botones

### Tokens de radio — formato @theme {}

```css
@theme {
  --radius-card:  1rem;    /* Cards, imágenes, contenedores */
  --radius-btn:   0.5rem;  /* Botones */
  --radius-badge: 9999px;  /* Badges, chips, pills */
}
```

**Uso en componentes:** `rounded-card`, `rounded-btn`, `rounded-badge`

### Sombras
- **Sin sombra**: Diseños flat, muy minimalistas
- **Sombra sutil**: `shadow-sm` — la más común
- **Sombra pronunciada**: Para cards flotantes, modales, dropdowns

---

## Checklist final del design system

Antes de empezar a codificar, confirma que tienes todos estos tokens definidos en `globals.css @theme {}`:

- [ ] Al menos 5 colores (`--color-brand-primary`, `--color-bg`, `--color-text-primary`, `--color-bg-dark`, `--color-border`)
- [ ] 2 fuentes identificadas (`--font-heading`, `--font-body`)
- [ ] Escala tipográfica de 5-7 tamaños (`--text-display` → `--text-label`)
- [ ] Padding de sección definido (`--spacing-section`)
- [ ] Border radius dominante (`--radius-card`, `--radius-btn`)
- [ ] Max-width del container (`--width-container`)
