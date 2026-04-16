'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const valores = [
  {
    numero: '01',
    titulo: 'Calidad Viva',
    descripcion:
      'Cada planta que sale de nuestro vivero pasa por un proceso de selección riguroso. Si no cumple nuestro estándar, no llega a tus manos. Así de simple.',
    acento: 'Cero intermediarios, cero compromisos.',
  },
  {
    numero: '02',
    titulo: 'Raíces Locales',
    descripcion:
      'Somos parte de la comunidad de Tlaquepaque. Trabajamos con proveedores de Jalisco, apoyamos a pequeños productores locales y reinvertimos en el ecosistema que nos rodea.',
    acento: 'Jalisco primero, siempre.',
  },
  {
    numero: '03',
    titulo: 'Asesoría Honesta',
    descripcion:
      'No te vendemos lo que no necesitas. Nuestro equipo te orienta con base en tu espacio, tu clima y tu estilo de vida — sin presión y sin tecnicismos innecesarios.',
    acento: 'La planta correcta, en el lugar correcto.',
  },
]

export default function ValoresVivero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-bg-rest py-section" ref={ref}>
      <div className="container-hubble">

        {/* Encabezado — alineado izquierda, ocupa la mitad */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-label text-text-secondary tracking-widest uppercase mb-3">
              — Lo que nos define
            </p>
            <h2
              className="font-body font-bold text-text-primary"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
              }}
            >
              Tres principios que guían cada planta que cultivamos.
            </h2>
          </motion.div>
        </div>

        {/* Lista editorial numerada — separada por líneas */}
        <div className="flex flex-col">
          {valores.map((v, i) => (
            <motion.div
              key={v.numero}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.12 }}
            >
              {/* Línea separadora */}
              <div className="border-t border-brand-primary/30" />

              {/* Fila del valor */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10">

                {/* Número — 1 columna */}
                <div className="md:col-span-1 flex items-start">
                  <span
                    className="font-heading font-bold text-brand-primary/60"
                    style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', lineHeight: 1.2 }}
                  >
                    {v.numero}
                  </span>
                </div>

                {/* Título — 3 columnas */}
                <div className="md:col-span-3 flex items-start">
                  <h3
                    className="font-body font-semibold text-text-primary"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.3 }}
                  >
                    {v.titulo}
                  </h3>
                </div>

                {/* Descripción — 5 columnas */}
                <div className="md:col-span-5 flex flex-col gap-3">
                  <p className="text-body text-text-secondary leading-relaxed">
                    {v.descripcion}
                  </p>
                </div>

                {/* Acento — 3 columnas */}
                <div className="md:col-span-3 flex items-start justify-start md:justify-end">
                  <span
                    className="text-small font-semibold text-brand-primary text-left md:text-right"
                    style={{ lineHeight: 1.4 }}
                  >
                    {v.acento}
                  </span>
                </div>

              </div>
            </motion.div>
          ))}
          {/* Línea final */}
          <div className="border-t border-border/60" />
        </div>

      </div>
    </section>
  )
}
