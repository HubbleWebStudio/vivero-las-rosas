'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { IMG } from '@/lib/images'

const items = [
  {
    titulo: 'Diseño de Paisaje',
    descripcion:
      'Planos instalados basados en la iluminación y espacio disponible.', // TODO: Reemplazar
  },
  {
    titulo: 'Ejecución y Obra',
    descripcion:
      'Desde el movimiento de tierras y sustratos hasta la plantación de especímenes maduros.', // TODO: Reemplazar
  },
  {
    titulo: 'Sistemas Automatizados',
    descripcion:
      'Integración de redes de riego inteligente monitado para garantizar la supervivencia del ecosistema.', // TODO: Reemplazar
  },
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Servicio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="servicios" className="bg-bg-rest section-padding">
      <div ref={ref} className="container-hubble">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Columna izquierda — imagen + badge ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            {/* Imagen principal */}
            <div className="relative w-full overflow-hidden rounded-card" style={{ aspectRatio: '4 / 5' }}>
              <Image
                src={IMG.home.paisajismo}
                alt="Servicio profesional de paisajismo — Vivero Las Rosas"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Badge flotante — bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
              className="absolute bottom-6 left-6 bg-bg-card rounded-card shadow-md px-5 py-4 max-w-[200px]"
            >
              <p
                className="font-body font-bold text-brand-primary"
                style={{ fontSize: '1.75rem', lineHeight: 1 }}
              >
                400.
              </p>
              <p className="mt-1.5 text-label text-text-secondary leading-snug">
                {/* TODO: Reemplazar con contenido real */}
                Proyectos de paisajismo ejecutados a nivel nacional.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Columna derecha — contenido ── */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-label text-text-secondary tracking-widest uppercase"
            >
              — Paisajismo
            </motion.p>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
              className="font-body font-bold text-text-primary"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', lineHeight: 1.1 }}
            >
              Servicio profesional{' '}
              <br />
              de paisajismo.
            </motion.h2>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
              className="text-body text-text-secondary leading-relaxed max-w-sm"
            >
              {/* TODO: Reemplazar con contenido real */}
              Diseño e instalación de paisajismo desde la planeación hasta la
              entrega final. Resolvemos la estética y la funcionalidad técnica
              de sus áreas verdes.
            </motion.p>

            {/* Lista de características */}
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-col gap-5 mt-2"
            >
              {items.map((item) => (
                <motion.li key={item.titulo} variants={itemVariants}>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-text-secondary text-small">—</span>
                      <span className="text-small font-semibold text-text-primary">
                        {item.titulo}
                      </span>
                    </div>
                    <p className="pl-4 text-small text-text-secondary leading-snug">
                      {item.descripcion}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Botón CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
              className="mt-2"
            >
              <motion.a
                href="#contacto"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-text-on-dark text-small font-medium rounded-badge hover:bg-brand-primary-light transition-colors"
              >
                Cotizar el proyecto
                <ArrowRight size={14} />
              </motion.a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
