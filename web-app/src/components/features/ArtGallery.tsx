'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { IMG } from '@/lib/images'

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
    <section ref={ref} id="galeria" className="bg-bg section-padding">
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
            href="/paisajismo"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto px-5 py-2.5 bg-brand-primary text-text-on-dark text-small font-medium rounded-badge hover:bg-brand-primary-light transition-colors shrink-0"
          >
            Servicio de paisajismo
            <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>

        {/* ── Grid móvil — máx 2 columnas, art gallery abstracto ── */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {[
            { aspect: '3/4',  colSpan: 1, pos: '50% 25%',  scale: 'scale-110', delay: 0    },
            { aspect: '3/4',  colSpan: 1, pos: '20% 40%',  scale: 'scale-105', delay: 0.08 },
            { aspect: '3/4',  colSpan: 1, pos: '80% 15%',  scale: 'scale-115', delay: 0.16 },
            { aspect: '3/4',  colSpan: 1, pos: '55% 88%',  scale: 'scale-110', delay: 0.24 },
            { aspect: '16/7', colSpan: 2, pos: '60% 65%',  scale: 'scale-105', delay: 0.32 },
          ].map((cell, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: 'easeOut', delay: cell.delay }}
              className="group overflow-hidden rounded-card"
              style={{
                aspectRatio: cell.aspect,
                gridColumn: cell.colSpan === 2 ? 'span 2' : 'span 1',
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={IMG.home.gallery}
                  alt={`Proyecto de paisajismo Vivero Las Rosas — vista ${i + 1}`}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${cell.scale}`}
                  style={{ objectPosition: cell.pos }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Grid desktop — 3 columnas editorial (sin cambios) ── */}
        <div
          className="hidden md:grid"
          style={{
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
                  src={IMG.home.gallery}
                  alt={`Proyecto de paisajismo Vivero Las Rosas — vista ${i + 1}`}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 ${cell.scale}`}
                  style={{ objectPosition: cell.pos }}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
