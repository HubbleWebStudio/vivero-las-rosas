'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

const categorias = [
  {
    id: '01',
    slug: 'EXTERIOR',
    titulo: 'Exterior',
    descripcion:
      'Variedades resistentes para jardines y zonas exteriores. Tolerantes al clima y de fácil mantenimiento.',
    imagen: '/imagenes/home/categorias.png',
    href: '#exterior',
  },
  {
    id: '02',
    slug: 'INTERIOR',
    titulo: 'Interior',
    descripcion:
      'Plantas ornamentales para espacios interiores. Purifican el aire y aportan vida a cualquier ambiente.',
    imagen: '/imagenes/home/categorias.png',
    href: '#interior',
  },
  {
    id: '03',
    slug: 'SOL',
    titulo: 'Sol',
    descripcion:
      'Especies que prosperan con exposición solar directa. Perfectas para jardines, terrazas y exteriores abiertos.',
    imagen: '/imagenes/home/categorias.png',
    href: '#sol',
  },
  {
    id: '04',
    slug: 'SOMBRA',
    titulo: 'Sombra',
    descripcion:
      'Plantas adaptadas a espacios con poca luz directa. Ideales para interiores oscuros y jardines bajo árboles.',
    imagen: '/imagenes/home/categorias.png',
    href: '#sombra',
  },
  {
    id: '05',
    slug: 'SEMISOMBRA',
    titulo: 'Semisombra',
    descripcion:
      'Especies que se adaptan a luz indirecta o filtrada. Perfectas para espacios con sol parcial durante el día.',
    imagen: '/imagenes/home/categorias.png',
    href: '#semisombra',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

/* ── Card reutilizable ── */
function Card({ cat, sizes, className = '', aspectRatio = '3 / 4' }: {
  cat: typeof categorias[0]
  sizes: string
  className?: string
  aspectRatio?: string
}) {
  return (
    <motion.a
      href={cat.href}
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className={`group relative overflow-hidden rounded-card block ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={cat.imagen}
        alt={cat.titulo}
        fill
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        sizes={sizes}
      />
      <div
        className="absolute top-3 left-3 z-10 flex items-center px-2.5 py-1 rounded-badge text-label font-medium text-white"
        style={{ background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(6px)' }}
      >
        {cat.id} / {cat.slug}
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0) 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 flex flex-col gap-2">
        <h3 className="font-body font-bold text-white text-h3">{cat.titulo}</h3>
        <p className="text-small text-white/75 leading-snug line-clamp-3">{cat.descripcion}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-badge text-label font-medium text-white bg-brand-primary hover:bg-brand-primary-light transition-colors">
          Explorar
          <ArrowRight size={12} />
        </span>
      </div>
    </motion.a>
  )
}

export default function CategoriasBotanicas() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="categorias" className="bg-bg section-padding">
      <div className="container-hubble">

        {/* Header — 2 columnas */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          {/* Izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-label text-text-secondary tracking-widest uppercase mb-3">
              — Categorías botánicas
            </p>
            <h2
              className="font-body font-bold text-text-primary"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', lineHeight: 1.1 }}
            >
              Categorias botanicas.
            </h2>
          </motion.div>

          {/* Derecha — descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
            className="text-body text-text-secondary max-w-sm md:text-right"
          >
            {/* TODO: Reemplazar con contenido real */}
            Seleccione la categoría de plantas según las necesidades exactas de
            tu hogar y jardín.
          </motion.p>
        </div>

        {/* Grid de 5 cards — Mobile: 2 cols / Desktop: 5 cols iguales */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {/* Móvil: las primeras 4 en 2 cols, Semisombra ocupa ancho completo */}
          {categorias.slice(0, 4).map((cat) => (
            <Card
              key={cat.id}
              cat={cat}
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          ))}
          {/* Semisombra — landscape en móvil, portrait en desktop como las demás */}
          <div className="col-span-2 md:col-span-1 md:aspect-auto">
            <Card
              cat={categorias[4]}
              className="md:hidden"
              aspectRatio="2 / 1"
              sizes="100vw"
            />
            <Card
              cat={categorias[4]}
              className="hidden md:block"
              sizes="20vw"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
