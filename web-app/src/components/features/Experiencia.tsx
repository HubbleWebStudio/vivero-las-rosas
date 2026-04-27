'use client'

import { motion, useInView } from 'framer-motion'
import { Leaf, MapPin, Star, Clock } from 'lucide-react'
import { useRef } from 'react'

const stats = [
  {
    icono: MapPin,
    valor: '+250',
    label: 'Especies disponibles', // TODO: Reemplazar
  },
  {
    icono: Clock,
    valor: '10 km',
    label: 'Radio de envío a domicilio', // TODO: Reemplazar
  },
  {
    icono: Leaf,
    valor: 'Gratis',
    label: 'Asesoría botánica en visita', // TODO: Reemplazar
  },
  {
    icono: Star,
    valor: '15 años',
    label: 'Cultivando calidad en Guadalajara', // TODO: Reemplazar
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

export default function Experiencia() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-bg-rest pt-8 pb-24 md:pt-24">
      <div className="container-hubble">
        {/* Card contenedor — verde olivo brand */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="rounded-card bg-bg-olive px-8 py-10"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icono
              return (
                <motion.div
                  key={stat.valor}
                  variants={cardVariants}
                  className="flex flex-col gap-3 rounded-card p-6"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  {/* Ícono */}
                  <Icon
                    size={22}
                    className="text-text-on-dark"
                    style={{ opacity: 0.7 }}
                  />

                  {/* Valor */}
                  <p
                    className="font-body font-bold text-text-on-dark"
                    style={{ fontSize: '2.25rem', lineHeight: 1.05 }}
                  >
                    {stat.valor}
                  </p>

                  {/* Label */}
                  <p
                    className="text-small text-text-on-dark leading-snug"
                    style={{ opacity: 0.8 }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
