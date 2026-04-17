'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Maximize2, X } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'

const productos = [
  {
    id: 1,
    nombre: 'Monstera Deliciosa',
    tags: 'Interior · Tropical',
    descripcion: 'Planta perenne clímax. Ideal para salas y espacios de luz indirecta.',
    imagen: '/imagenes/home/planta_01.png',
    imagen2: '/imagenes/home/planta_01_2.png',
  },
  {
    id: 2,
    nombre: 'Monstera Deliciosa',
    tags: 'Interior · Tropical',
    descripcion: 'Planta perenne clímax. Ideal para salas y espacios de luz indirecta.',
    imagen: '/imagenes/home/planta_02.png',
    imagen2: '/imagenes/home/planta_02_2.png',
  },
  {
    id: 3,
    nombre: 'Monstera Deliciosa',
    tags: 'Interior · Tropical',
    descripcion: 'Planta perenne clímax. Ideal para salas y espacios de luz indirecta.',
    imagen: '/imagenes/home/planta_03.png',
    imagen2: '/imagenes/home/planta_03_2.png',
  },
  {
    id: 4,
    nombre: 'Monstera Deliciosa',
    tags: 'Interior · Tropical',
    descripcion: 'Planta perenne clímax. Ideal para salas y espacios de luz indirecta.',
    imagen: '/imagenes/home/planta_04.png',
    imagen2: '/imagenes/home/planta_04_2.png',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

type Producto = typeof productos[0]

/* ── Lightbox — dos paneles, solo imágenes ── */
function Lightbox({ producto, onClose }: { producto: Producto; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(12,18,12,0.78)', backdropFilter: 'blur(14px)' }}
    >
      {/* Botón cerrar flotante */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors"
        aria-label="Cerrar"
      >
        <X size={16} />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-row gap-3"
        style={{ height: '80vh' }}
      >
        {/* Panel izquierda */}
        <div
          className="relative overflow-hidden rounded-card"
          style={{ height: '100%', aspectRatio: '4 / 5' }}
        >
          <Image src={producto.imagen} alt={`${producto.nombre} — vista general`} fill className="object-cover object-center" sizes="(max-width: 1024px) 45vw, 40vw" priority />
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-badge bg-black/30 backdrop-blur-sm">
            <span className="text-label text-white/80">Vista general</span>
          </div>
        </div>

        {/* Panel derecha */}
        <div
          className="relative overflow-hidden rounded-card"
          style={{ height: '100%', aspectRatio: '4 / 5' }}
        >
          <Image src={producto.imagen2} alt={`${producto.nombre} — detalle`} fill className="object-cover object-center" sizes="(max-width: 1024px) 45vw, 40vw" priority />
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-badge bg-black/30 backdrop-blur-sm">
            <span className="text-label text-white/80">Detalle</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Card individual con carrusel propio ── */
function ProductCard({
  producto,
  onExpand,
}: {
  producto: Producto
  onExpand: () => void
}) {
  const [slide, setSlide] = useState(0) // 0 = imagen principal, 1 = close-up
  const imagenes = [producto.imagen, producto.imagen2]
  const isLast = slide === imagenes.length - 1

  function toggleSlide(e: React.MouseEvent) {
    e.stopPropagation()
    setSlide((prev) => (prev + 1) % imagenes.length)
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-bg-card rounded-card shadow-sm overflow-hidden flex flex-col"
    >
      {/* Imagen — click abre lightbox */}
      <div
        className="relative w-full cursor-pointer overflow-hidden"
        style={{ aspectRatio: '4 / 5' }}
        onClick={onExpand}
      >
        {/* Transición entre imágenes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={imagenes[slide]}
              alt={producto.nombre}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Badge tag — bottom-left */}
        <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-badge bg-white/90 backdrop-blur-sm">
          <span className="text-label font-medium text-brand-primary tracking-wide">
            {producto.tags}
          </span>
        </div>

        {/* Ícono expand — top-right, siempre visible */}
        <div className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
          <Maximize2 size={12} className="text-text-primary" />
        </div>

        {/* Flecha carrusel — center-right, siempre visible, mismo estilo que expand */}
        <button
          onClick={toggleSlide}
          aria-label={isLast ? 'Ver imagen anterior' : 'Ver siguiente imagen'}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
        >
          {isLast
            ? <ChevronLeft size={13} className="text-text-primary" />
            : <ChevronRight size={13} className="text-text-primary" />
          }
        </button>

        {/* Dots indicadores — bottom-right */}
        <div className="absolute bottom-3 right-3 z-10 flex gap-1">
          {imagenes.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
              style={{ background: i === slide ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.45)' }}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3 md:p-4 gap-1.5 md:gap-2">
        <h3 className="font-body font-bold text-text-primary text-h3">{producto.nombre}</h3>
        <p className="text-small text-text-secondary leading-snug flex-1">{producto.descripcion}</p>

        <motion.button
          whileTap={{ scale: 0.97 }}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-primary text-text-on-dark text-small font-medium rounded-btn hover:bg-brand-primary-light transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.533a.75.75 0 0 0 .92.92l5.671-1.475A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.183-1.432l-.371-.22-3.367.875.893-3.26-.242-.385A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Consultar existencia
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ── Componente principal ── */
export default function Productos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<Producto | null>(null)

  return (
    <>
      <section id="productos" className="bg-bg section-padding">
        <div className="container-hubble">

          {/* Título — visible solo en mobile (desktop lo lleva el BannerProductos) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-6 md:hidden"
          >
            <p className="text-label text-text-secondary tracking-widest uppercase mb-2">
              — Productos de jardinería
            </p>
            <h2
              className="font-body font-bold text-text-primary"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', lineHeight: 1.1 }}
            >
              Nuestras plantas.
            </h2>
          </motion.div>

          {/* Barra superior */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div className="flex items-start gap-2 text-small text-text-primary max-w-sm leading-relaxed">
              <MapPin size={13} className="mt-0.5 shrink-0 text-brand-primary" />
              <span>
                Envío gratis hasta 2 km. Mayor distancia a cotización según la cantidad de plantas.{' '}
                <a href="https://wa.me/523316038900" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-primary transition-colors">Contáctanos por WhatsApp</a>
              </span>
            </div>
            <motion.a
              href="#categorias"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 bg-brand-primary text-text-on-dark text-small font-medium rounded-badge hover:bg-brand-primary-light transition-colors shrink-0"
            >
              Ver catálogo completo
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>

          {/* Grid 4 cards */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {productos.map((p) => (
              <ProductCard
                key={p.id}
                producto={p}
                onExpand={() => setSelected(p)}
              />
            ))}
          </motion.div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox producto={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
