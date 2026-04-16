'use client'

import { motion } from 'framer-motion'
import { Pencil, Shovel, CalendarCheck } from 'lucide-react'

const servicios = [
  {
    numero: '01',
    icono: Pencil,
    titulo: 'Diseño de jardín',
    descripcion:
      'Visitamos tu espacio, escuchamos tus necesidades y proponemos un diseño personalizado. Seleccionamos las especies correctas según luz, clima y estilo de vida.',
    acento: 'Visita + plano + propuesta de especies',
  },
  {
    numero: '02',
    icono: Shovel,
    titulo: 'Instalación y plantación',
    descripcion:
      'Preparamos el terreno, instalamos sistemas de riego si se requieren y plantamos con técnica correcta para garantizar arraigo. Cuidamos cada detalle desde la raíz.',
    acento: 'Tierra, macetas, riego y plantación',
  },
  {
    numero: '03',
    icono: CalendarCheck,
    titulo: 'Mantenimiento mensual',
    descripcion:
      'Programa visitas periódicas para poda, fertilización y revisión de salud vegetal. Tus plantas siempre en su mejor estado, sin que tengas que preocuparte.',
    acento: 'Poda · Fertilización · Revisión fitosanitaria',
  },
]

export default function ServiciosPaisajismo() {
  return (
    <section className="bg-bg py-section border-b border-border">
      <div className="container-hubble">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-label text-text-secondary tracking-widest uppercase mb-3">— Qué incluye el servicio</p>
          <h2
            className="font-body font-bold text-text-primary"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.1, maxWidth: '22ch' }}
          >
            Un jardín que funciona empieza con un buen proceso.
          </h2>
        </motion.div>

        {/* Grid servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {servicios.map((s, i) => {
            const Icon = s.icono
            return (
              <motion.div
                key={s.numero}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
                className="bg-bg p-8 md:p-10 flex flex-col gap-6"
              >
                {/* Número + icono */}
                <div className="flex items-start justify-between">
                  <span
                    className="font-body font-bold leading-none select-none"
                    style={{ color: '#6A7C62', fontSize: 'clamp(3.5rem, 5vw, 5rem)' }}
                  >
                    {s.numero}
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-primary/10">
                    <Icon size={18} className="text-brand-primary" />
                  </div>
                </div>

                {/* Texto */}
                <div className="flex flex-col gap-4 flex-1">
                  <h3
                    className="font-body font-bold text-text-primary"
                    style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)', lineHeight: 1.1 }}
                  >
                    {s.titulo}
                  </h3>
                  <p className="text-text-secondary leading-relaxed flex-1" style={{ fontSize: '0.95rem' }}>
                    {s.descripcion}
                  </p>
                </div>

                {/* Acento */}
                <p className="text-label text-brand-primary tracking-wide pt-4 border-t border-border">
                  {s.acento}
                </p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
