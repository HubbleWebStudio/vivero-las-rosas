# Guía: Scaffolding de Proyecto Next.js (Hubble Stack)

> Todos los comandos se ejecutan desde `./web-app/` dentro del workspace del cliente.

## Paso 1: Inicializar el proyecto

```bash
# Desde la raíz del workspace del cliente
mkdir -p ./web-app
cd ./web-app
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

## Paso 2: Instalar dependencias

```bash
# Dentro de ./web-app/
npx shadcn@latest init

npm install framer-motion lucide-react clsx tailwind-merge
```

Para Shadcn, cuando pregunte:
- Style: Default
- Base color: el que más se acerque al primario del diseño
- CSS variables: Yes

## Paso 3: globals.css — Tailwind v4 con @theme {}

**Este es el archivo central del design system. TODOS los tokens viven aquí.**

Reemplaza el contenido de `./web-app/src/app/globals.css` con los tokens extraídos del diseño:

```css
@import "tailwindcss";

@theme {
  /* ── Colores ─────────────────────────────────────────── */
  --color-brand-primary:       #XXXX;   /* Color de marca: botones CTA, íconos activos */
  --color-brand-primary-light: #XXXX;   /* Versión clara del primario */
  --color-brand-secondary:     #XXXX;   /* Color secundario / acento */

  --color-bg:      #XXXX;   /* Fondo base de la página */
  --color-bg-card: #XXXX;   /* Fondo de cards / elementos elevados */
  --color-bg-dark: #XXXX;   /* Fondo oscuro para secciones CTA / footer */

  --color-text-primary:   #XXXX;   /* Texto principal */
  --color-text-secondary: #XXXX;   /* Subtítulos / texto secundario */
  --color-text-on-dark:   #XXXX;   /* Texto sobre fondos oscuros */

  --color-border: #XXXX;   /* Bordes sutiles */

  /* ── Tipografía ──────────────────────────────────────── */
  --font-heading: var(--font-heading-var), serif;   /* Fuente de headings */
  --font-body:    var(--font-body-var), sans-serif; /* Fuente de cuerpo */

  /* ── Escala tipográfica ──────────────────────────────── */
  --text-display:    3.5rem;   --text-display--line-height:    1.1;
  --text-h1:         2.5rem;   --text-h1--line-height:         1.2;
  --text-h2:         1.75rem;  --text-h2--line-height:         1.3;
  --text-h3:         1.25rem;  --text-h3--line-height:         1.4;
  --text-body-lg:    1.125rem; --text-body-lg--line-height:    1.6;
  --text-body:       1rem;     --text-body--line-height:       1.6;
  --text-small:      0.875rem; --text-small--line-height:      1.5;
  --text-label:      0.75rem;  --text-label--line-height:      1.4;

  /* ── Border radius ───────────────────────────────────── */
  --radius-card:  1rem;
  --radius-btn:   0.5rem;
  --radius-badge: 9999px;

  /* ── Espaciado ───────────────────────────────────────── */
  --spacing-section:      6rem;   /* Padding vertical estándar entre secciones */
  --spacing-section-sm:   4rem;   /* Secciones más compactas */
  --spacing-container-px: 1.5rem; /* Padding lateral del container */

  /* ── Ancho máximo ────────────────────────────────────── */
  --width-container: 80rem; /* 1280px — ajustar según diseño */
}

@layer base {
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
  }
}

@layer components {
  /* Container estándar Hubble */
  .container-hubble {
    max-width: var(--width-container);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--spacing-container-px);
    padding-right: var(--spacing-container-px);
  }

  /* Padding de sección estándar */
  .section-padding {
    padding-top: var(--spacing-section);
    padding-bottom: var(--spacing-section);
  }
}
```

> **Zero-Hardcode:** Si durante la construcción necesitas un valor que no está en `@theme {}`, agrégalo aquí primero. Nunca valores hardcodeados en los componentes (excepto `rgba()` para overlays con opacidad variable).

## Paso 4: Template de src/app/layout.tsx

```tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
// ↑ Reemplaza con las fuentes del diseño extraídas en el análisis

import './globals.css'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

// Fuente de cuerpo
const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body-var',
  display: 'swap',
})

// Fuente de headings
const fontHeading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nombre del Cliente',       // TODO: Reemplazar
  description: 'Descripción del negocio', // TODO: Reemplazar
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${fontBody.variable} ${fontHeading.variable}`}>
      <body className="font-body bg-bg text-text-primary antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

## Paso 5: Template de src/app/page.tsx

```tsx
// Importa aquí cada sección al crearla (en orden visual de arriba a abajo)
export default function Home() {
  return (
    <main>
      {/* Las secciones se agregan aquí en el orden del diseño */}
    </main>
  )
}
```

## Paso 6: next.config.ts con soporte para Unsplash

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
```

## Paso 7: src/lib/utils.ts

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Paso 8: Estructura de carpetas inicial

```bash
# Dentro de ./web-app/src/
mkdir -p components/features
mkdir -p components/shared
mkdir -p lib
```

Crea los archivos vacíos de Navbar y Footer para que el layout compile:

`components/shared/Navbar.tsx` y `components/shared/Footer.tsx` — stubs mínimos hasta que se construyan con referencia.

## Verificación final del scaffold

```bash
# Dentro de ./web-app/
npm run dev    # debe correr en localhost:3000 sin errores
npm run build  # debe compilar sin errores de TypeScript
```

Si hay errores de TypeScript en el scaffold, resuélvelos antes de construir componentes.
