'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

const categorias = [
  {
    id: '01',
    slug: 'SOMBRA',
    titulo: 'Sombra',
    descripcion:
      'Plantas adaptadas a espacios con poca luz directa. Ideales para interiores oscuros y jardines bajo árboles.', // TODO: Reemplazar
    imagen: '/imagenes/home/categorias.png',
    href: '#sombra',
  },
  {
    id: '02',
    slug: 'SOL',
    titulo: 'Sol',
    descripcion:
      'Especies que prosperan con exposición solar directa. Perfectas para jardines, terrazas y exteriores abiertos.', // TODO: Reemplazar
    imagen: '/imagenes/home/categorias.png',
    href: '#sol',
  },
  {
    id: '03',
    slug: 'INTERIOR',
    titulo: 'Interior',
    descripcion:
      'Plantas ornamentales para espacios interiores. Purifican el aire y aportan vida a cualquier ambiente.', // TODO: Reemplazar
    imagen: '/imagenes/home/categorias.png',
    href: '#interior',
  },
  {
    id: '04',
    slug: 'EXTERIOR',
    titulo: 'Exterior',
    descripcion:
      'Variedades resistentes para jardines y zonas exteriores. Tolerantes al clima y de fácil mantenimiento.', // TODO: Reemplazar
    imagen: '/imagenes/home/categorias.png',
    href: '#exterior',
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
            su terreno o propiedad.
          </motion.p>
        </div>

        {/* Grid de 4 cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categorias.map((cat) => (
            <motion.a
              key={cat.id}
              href={cat.href}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.22 } }}
              className="group relative overflow-hidden rounded-card block"
              style={{ aspectRatio: '3 / 4' }}
            >
              {/* Imagen full-cover */}
              <Image
                src={cat.imagen}
                alt={cat.titulo}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Badge top-left */}
              <div
                className="absolute top-3 left-3 z-10 flex items-center px-2.5 py-1 rounded-badge text-label font-medium text-white"
                style={{ background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(6px)' }}
              >
                {cat.id} / {cat.slug}
              </div>

              {/* Overlay gradiente inferior */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0) 100%)',
                }}
              />

              {/* Contenido sobre overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 flex flex-col gap-2">
                <h3 className="font-body font-bold text-white text-h3">
                  {cat.titulo}
                </h3>
                <p className="text-small text-white/75 leading-snug line-clamp-3">
                  {cat.descripcion}
                </p>
                <span
                  className="mt-2 inline-flex items-center gap-1.5 self-start px-3.5 py-1.5 rounded-badge text-label font-medium text-white bg-brand-primary hover:bg-brand-primary-light transition-colors"
                >
                  Explorar
                  <ArrowRight size={12} />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
