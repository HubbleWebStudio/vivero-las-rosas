'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { IMG } from '@/lib/images'

export default function HistoriaVivero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-bg py-section overflow-hidden">
      <div className="container-hubble" ref={ref}>

        {/* Grid asimétrico 5/7 — texto izquierda, imagen derecha */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start"
        >

          {/* ── Columna texto — 5 columnas ── */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:pt-10">

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="text-label text-text-secondary tracking-widest uppercase"
            >
              — Nuestra historia
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.18 }}
              className="font-body font-bold text-text-primary"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
              }}
            >
              Nacimos del amor
              <br />
              <span className="text-brand-primary">por las plantas</span>
              <br />
              y por Jalisco.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.28 }}
              className="flex flex-col gap-4 text-body text-text-secondary leading-relaxed"
            >
              <p>
                {/* TODO: Reemplazar con historia real */}
                Vivero Las Rosas nació en 2008 en el corazón de San Pedro
                Tlaquepaque, impulsado por una familia con décadas de
                experiencia en horticultura y un compromiso genuino con la
                calidad botánica.
              </p>
              <p>
                Lo que comenzó como un pequeño espacio de cultivo se
                transformó, con los años, en uno de los viveros de referencia
                del Área Metropolitana de Guadalajara: más de 400 especies
                disponibles y asesoría profesional sin costo.
              </p>
              <p>
                Hoy seguimos siendo la misma familia, con la misma pasión
                — pero con la experiencia acumulada de más de 15 años
                cultivando jardines que perduran.
              </p>
            </motion.div>

            {/* Firma / autor */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
              className="flex items-center gap-4 pt-4 border-t border-border"
            >
              <div className="w-10 h-10 rounded-full bg-bg-feature flex items-center justify-center shrink-0 border border-border">
                <span className="font-heading font-bold text-brand-primary" style={{ fontSize: '1rem' }}>F</span>
              </div>
              <div>
                <p className="text-small font-semibold text-text-primary">
                  {/* TODO: Reemplazar con nombre real */}
                  Familia Fundadora
                </p>
                <p className="text-label text-text-secondary">
                  Vivero Las Rosas · Tlaquepaque, JAL
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Columna imagen — 7 columnas, sube sobre el texto ── */}
          <div className="lg:col-span-7 relative">

            {/* Año decorativo detrás de la imagen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="absolute -top-8 -left-4 font-heading font-bold text-bg-rest pointer-events-none select-none hidden lg:block"
              style={{
                fontSize: 'clamp(6rem, 10vw, 10rem)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                zIndex: 0,
                color: '#D8DDD5',
              }}
            >
              2008
            </motion.div>

            {/* Imagen principal */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="relative rounded-card overflow-hidden"
              style={{ aspectRatio: '4/5', zIndex: 1 }}
            >
              <Image
                src={IMG.home.paisajismo}
                alt="Equipo Vivero Las Rosas trabajando en Tlaquepaque"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              {/* Sutil viñeta para integrar con el fondo */}
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(12,26,12,0.06)' }}
              />
            </motion.div>

            {/* Badge flotante — esquina inferior izquierda */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.5 }}
              className="absolute bottom-6 -left-4 lg:-left-8 bg-bg-dark rounded-card px-5 py-4 shadow-lg"
              style={{ zIndex: 2 }}
            >
              <p className="text-label text-text-on-dark/55 uppercase tracking-widest mb-1">
                Fundado
              </p>
              <p
                className="font-body font-bold text-text-on-dark"
                style={{ fontSize: '1.75rem', lineHeight: 1 }}
              >
                2008
              </p>
              <p className="text-small text-text-on-dark/65 mt-0.5">
                Tlaquepaque, Jalisco
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}
