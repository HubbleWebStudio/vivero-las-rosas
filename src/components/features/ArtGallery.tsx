'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

/*
  Layout editorial 3 cols × 5 row-units (160px/u) — posición y zoom explícitos
  ┌──────────┬──────────┬──────────┐
  │  [0]     │  [1]     │  [2]     │  rows 1–3 | 1–2 | 1–2
  │  tall    │  medium  │  medium  │
  ├──────────┼──────────┼──────────┤
  │  [3]     │  [4]     │  [5]     │  rows 4–5 | 3–5 | 3–5
  │  short   │  tall    │  tall    │
  └──────────┴──────────┴──────────┘
*/
const cells = [
  { col: '1', rowStart: 1, rowSpan: 3, pos: '50% 25%',  scale: 'scale-110' },  // arriba izq — flores
  { col: '2', rowStart: 1, rowSpan: 2, pos: '20% 40%',  scale: 'scale-105' },  // arriba centro — lateral izq
  { col: '3', rowStart: 1, rowSpan: 2, pos: '80% 15%',  scale: 'scale-115' },  // arriba der — esquina flores
  { col: '1', rowStart: 4, rowSpan: 2, pos: '55% 88%',  scale: 'scale-110' },  // abajo izq — macetas suelo
  { col: '2', rowStart: 3, rowSpan: 3, pos: '60% 65%',  scale: 'scale-105' },  // abajo centro — carreta abajo
  { col: '3', rowStart: 3, rowSpan: 3, pos: '35% 72%',  scale: 'scale-110' },  // abajo der — planta base
]

export default function ArtGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="galeria" className="bg-bg section-padding">
      <div className="container-hubble">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-label text-text-secondary tracking-widest uppercase mb-3">
              — Proyectos
            </p>
            <h2
              className="font-body font-bold text-text-primary"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', lineHeight: 1.1 }}
            >
              Resultados de paisajismo.
            </h2>
          </div>

          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto px-5 py-2.5 border border-brand-primary text-brand-primary text-small font-medium rounded-badge hover:bg-brand-primary hover:text-text-on-dark transition-colors shrink-0"
          >
            Ver Instagram
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

        {/* Grid editorial — filas y columnas 100% explícitas */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(5, 160px)',
            gap: '12px',
          }}
        >
          {cells.map((cell, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.09 }}
              className="group overflow-hidden rounded-card"
              style={{
                gridColumn: cell.col,
                gridRow: `${cell.rowStart} / span ${cell.rowSpan}`,
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/imagenes/home/gallery.jpg"
                  alt={`Proyecto de paisajismo Vivero Las Rosas — vista ${i + 1}`}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${cell.scale}`}
                  style={{ objectPosition: cell.pos }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
