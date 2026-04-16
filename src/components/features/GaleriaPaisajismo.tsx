'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Maximize2, X } from 'lucide-react'
import { useState } from 'react'

/* ── Proyectos — agregar más fotos aquí cuando el cliente las entregue ── */
const proyectos = [
  { id: 1, src: '/imagenes/home/gallery.jpg',     alt: 'Jardín residencial con flores de temporada',  categoria: 'Residencial',  span: 'lg:col-span-2 lg:row-span-2' },
  { id: 2, src: '/imagenes/home/paisajismo.jpg',  alt: 'Diseño de jardín en terraza',                 categoria: 'Terraza',      span: 'lg:col-span-1 lg:row-span-1' },
  { id: 3, src: '/imagenes/home/gallery.jpg',     alt: 'Instalación de plantas de interior',          categoria: 'Interior',     span: 'lg:col-span-1 lg:row-span-1' },
  { id: 4, src: '/imagenes/home/paisajismo.jpg',  alt: 'Espacio verde corporativo',                   categoria: 'Corporativo',  span: 'lg:col-span-1 lg:row-span-1' },
  { id: 5, src: '/imagenes/home/gallery.jpg',     alt: 'Jardín zen minimalista',                      categoria: 'Minimalista',  span: 'lg:col-span-1 lg:row-span-1' },
  { id: 6, src: '/imagenes/home/paisajismo.jpg',  alt: 'Jardín vertical con helechos',                categoria: 'Vertical',     span: 'lg:col-span-1 lg:row-span-1' },
]

type Proyecto = typeof proyectos[0]

/* ── Lightbox — una imagen a pantalla completa ── */
function Lightbox({ proyecto, onClose }: { proyecto: Proyecto; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
      style={{ background: 'rgba(8,16,8,0.88)', backdropFilter: 'blur(16px)' }}
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
        aria-label="Cerrar"
      >
        <X size={16} />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="relative overflow-hidden rounded-card"
        style={{ maxWidth: '90vw', maxHeight: '85vh', aspectRatio: '4/3', width: '1000px' }}
      >
        <Image
          src={proyecto.src}
          alt={proyecto.alt}
          fill
          className="object-cover"
          sizes="90vw"
          priority
        />
        {/* Badge categoría */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-badge bg-black/40 backdrop-blur-sm">
          <span className="text-label text-white/90 tracking-widest uppercase">{proyecto.categoria}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Card individual ── */
function GaleriaCard({ proyecto, onExpand }: { proyecto: Proyecto; onExpand: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-card cursor-pointer ${proyecto.span}`}
      style={{ minHeight: '220px' }}
      onClick={onExpand}
    >
      <Image
        src={proyecto.src}
        alt={proyecto.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* Overlay al hover */}
      <div className="absolute inset-0 bg-bg-dark/0 group-hover:bg-bg-dark/30 transition-colors duration-400" />

      {/* Badge categoría — siempre visible */}
      <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-badge bg-black/35 backdrop-blur-sm">
        <span className="text-label text-white/85 tracking-widest uppercase">{proyecto.categoria}</span>
      </div>

      {/* Ícono expand — top-right, siempre visible */}
      <div className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm group-hover:bg-white transition-colors duration-200">
        <Maximize2 size={13} className="text-text-primary" />
      </div>
    </motion.div>
  )
}

/* ── Componente principal ── */
export default function GaleriaPaisajismo() {
  const [selected, setSelected] = useState<Proyecto | null>(null)

  return (
    <>
      <section id="galeria" className="bg-bg-rest py-section">
        <div className="container-hubble">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <p className="text-label text-text-secondary tracking-widest uppercase mb-3">— Proyectos realizados</p>
              <h2
                className="font-body font-bold text-text-primary"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.1 }}
              >
                Cada jardín cuenta<br />una historia distinta.
              </h2>
            </div>
            <p className="text-small text-text-secondary max-w-xs leading-relaxed">
              Haz clic en cualquier imagen para verla en detalle.
            </p>
          </motion.div>

          {/* Grid asimétrico — 3 columnas, 3 filas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[280px]">
            {proyectos.map((p) => (
              <GaleriaCard key={p.id} proyecto={p} onExpand={() => setSelected(p)} />
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox proyecto={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
