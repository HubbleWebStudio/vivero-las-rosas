# Patrones de Componentes — Hubble Web Studio

Plantillas de los patrones más comunes. Adapta los tokens y contenido al proyecto, pero mantén la estructura.

> **Tailwind v4:** Los nombres de clase (`bg-brand-primary`, `text-text-secondary`, `rounded-card`, `font-heading`, etc.) se resuelven automáticamente desde los tokens `--color-*`, `--radius-*`, `--font-*` definidos en `globals.css @theme {}`. No requieren `tailwind.config.ts`.
>
> **Rutas de archivos:** Los componentes van en `./web-app/src/components/features/[NombreSeccion].tsx`. Los componentes compartidos (Navbar, Footer) van en `./web-app/src/components/shared/`.

---

## Patrón: Hero Section

### Hero con imagen de fondo + overlay

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="https://images.unsplash.com/photo-XXXX?w=1920&h=1080&fit=crop"
        alt="Hero background"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-bg-dark/40" />

      {/* Contenido */}
      <div className="container-hubble relative z-10 flex h-full flex-col justify-end pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="text-label font-body text-text-on-dark/70 uppercase tracking-widest mb-4">
            {/* TODO: Tagline del cliente */}
            Tagline del negocio
          </p>
          <h1 className="font-heading text-display text-text-on-dark mb-6 leading-tight">
            {/* TODO: Título principal */}
            Título Principal del Negocio
          </h1>
          <p className="text-body-lg text-text-on-dark/80 mb-8 max-w-lg">
            {/* TODO: Descripción breve */}
            Descripción del servicio o propuesta de valor del negocio cliente.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-primary text-text-on-dark px-8 py-3 rounded-btn font-body font-medium"
            >
              {/* TODO: CTA principal */}
              Llamada a la acción
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border border-text-on-dark/40 text-text-on-dark px-8 py-3 rounded-btn font-body"
            >
              Saber más
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Patrón: Grid de Cards (Categorías / Servicios)

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const ITEMS = [
  { id: 1, title: 'Categoría 1', subtitle: 'Descripción breve', img: 'https://images.unsplash.com/photo-XXXX?w=400&h=300&fit=crop' },
  { id: 2, title: 'Categoría 2', subtitle: 'Descripción breve', img: 'https://images.unsplash.com/photo-XXXX?w=400&h=300&fit=crop' },
  { id: 3, title: 'Categoría 3', subtitle: 'Descripción breve', img: 'https://images.unsplash.com/photo-XXXX?w=400&h=300&fit=crop' },
  { id: 4, title: 'Categoría 4', subtitle: 'Descripción breve', img: 'https://images.unsplash.com/photo-XXXX?w=400&h=300&fit=crop' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function CategoriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-bg">
      <div className="container-hubble">
        <div className="mb-12">
          <h2 className="font-heading text-h1 text-text-primary mb-3">
            {/* TODO: Título de sección */}
            Título de la sección
          </h2>
          <p className="text-body text-text-secondary max-w-xl">
            {/* TODO: Descripción */}
            Texto descriptivo de la sección.
          </p>
        </div>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {ITEMS.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group cursor-pointer rounded-card overflow-hidden bg-bg-card border border-border"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-heading text-h3 text-text-primary mb-1">{item.title}</h3>
                <p className="text-small text-text-secondary">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Patrón: Split Section (imagen + texto, 2 columnas)

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ServiceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-bg">
      <div className="container-hubble">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center" ref={ref}>
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] rounded-card overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-XXXX?w=800&h=600&fit=crop"
              alt="Servicio"
              fill
              className="object-cover"
            />
            {/* Badge flotante — opcional */}
            <div className="absolute bottom-4 left-4 bg-bg-card rounded-card p-3 shadow-md">
              <p className="text-h3 font-heading text-brand-primary font-bold">400+</p>
              <p className="text-small text-text-secondary">Proyectos completados</p>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-label uppercase tracking-widest text-brand-primary mb-3">
              {/* TODO: Label/etiqueta */}
              PARA NUESTROS CLIENTES
            </p>
            <h2 className="font-heading text-h1 text-text-primary mb-4">
              {/* TODO: Título */}
              Servicio profesional de alta calidad
            </h2>
            <p className="text-body text-text-secondary mb-6">
              {/* TODO: Descripción del servicio */}
              Descripción detallada del servicio o propuesta de valor. Explica qué hace el negocio y por qué el cliente debería confiar en ellos.
            </p>
            <ul className="space-y-3 mb-8">
              {['Característica del servicio uno', 'Característica dos', 'Característica tres'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-body text-text-primary">
                  <span className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-small">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-brand-primary text-text-on-dark px-8 py-3 rounded-btn font-medium"
            >
              Saber más
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

## Patrón: Stats Bar

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const STATS = [
  { value: '+250', label: 'Clientes satisfechos' },
  { value: '10km', label: 'Cobertura de servicio' },
  { value: 'Gratis', label: 'Primera consulta' },
  { value: '15 años', label: 'De experiencia' },
]

export default function StatsBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section className="bg-brand-primary py-12">
      <div className="container-hubble">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <p className="font-heading text-h1 text-text-on-dark font-bold">{stat.value}</p>
              <p className="text-small text-text-on-dark/70 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Patrón: Portfolio Masonry / Grid

```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Para masonry real, usa CSS columns
export default function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const images = [
    { src: 'https://images.unsplash.com/photo-XXXX?w=600&h=800&fit=crop', alt: 'Proyecto 1', tall: true },
    { src: 'https://images.unsplash.com/photo-XXXX?w=600&h=400&fit=crop', alt: 'Proyecto 2', tall: false },
    { src: 'https://images.unsplash.com/photo-XXXX?w=600&h=400&fit=crop', alt: 'Proyecto 3', tall: false },
    { src: 'https://images.unsplash.com/photo-XXXX?w=600&h=800&fit=crop', alt: 'Proyecto 4', tall: true },
    { src: 'https://images.unsplash.com/photo-XXXX?w=600&h=400&fit=crop', alt: 'Proyecto 5', tall: false },
  ]

  return (
    <section className="section-padding bg-bg">
      <div className="container-hubble">
        <div className="flex justify-between items-end mb-10">
          <h2 className="font-heading text-h1 text-text-primary">Resultados del trabajo</h2>
          <button className="text-small text-brand-primary border border-brand-primary px-4 py-2 rounded-btn hover:bg-brand-primary hover:text-text-on-dark transition-colors">
            Ver todo
          </button>
        </div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="columns-2 md:columns-3 gap-4 space-y-4"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="break-inside-avoid rounded-card overflow-hidden cursor-pointer"
            >
              <div className={`relative w-full ${img.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Patrón: CTA Section (fondo oscuro)

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-bg-dark py-section">
      <div className="container-hubble">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <h2 className="font-heading text-h1 text-text-on-dark mb-3">
              {/* TODO: Título del CTA */}
              Da vida a tu proyecto con nosotros
            </h2>
            <p className="text-body text-text-on-dark/70">
              {/* TODO: Descripción */}
              Cuéntanos sobre tu proyecto y te ayudamos a hacerlo realidad.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-text-on-dark text-text-primary px-8 py-3 rounded-btn font-medium"
            >
              Contáctanos
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="border border-text-on-dark/40 text-text-on-dark px-8 py-3 rounded-btn"
            >
              Ver portafolio
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Patrón: Navbar

```tsx
'use client'

import { motion, useScroll, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bg/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container-hubble flex items-center justify-between h-16">
        {/* Logo */}
        {/* TODO: Reemplazar con logo real */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-primary" />
          <span className={`font-heading font-bold text-h3 ${scrolled ? 'text-text-primary' : 'text-text-on-dark'}`}>
            NombreCliente
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-small font-medium transition-colors hover:text-brand-primary ${
                scrolled ? 'text-text-secondary' : 'text-text-on-dark/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-brand-primary text-text-on-dark text-small px-5 py-2 rounded-btn font-medium"
          >
            Cotizar
          </motion.button>
        </div>
      </div>
    </nav>
  )
}
```
