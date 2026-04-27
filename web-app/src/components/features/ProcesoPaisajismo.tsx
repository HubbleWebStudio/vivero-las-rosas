'use client'

import { motion } from 'framer-motion'

const pasos = [
  {
    numero: '01',
    titulo: 'Visita y diagnóstico',
    descripcion: 'Agendamos una visita gratuita a tu espacio. Evaluamos luz, suelo, dimensiones y tu visión para el proyecto.',
  },
  {
    numero: '02',
    titulo: 'Propuesta de diseño',
    descripcion: 'Te presentamos una selección de especies, distribución y presupuesto detallado. Sin compromisos hasta que estés convencido.',
  },
  {
    numero: '03',
    titulo: 'Instalación',
    descripcion: 'Nuestro equipo ejecuta el proyecto con técnica correcta: preparación de tierra, macetas, riego y plantación definitiva.',
  },
  {
    numero: '04',
    titulo: 'Seguimiento',
    descripcion: 'Nos quedamos contigo. Plan de riego, fertilización y visitas de mantenimiento para que el jardín crezca sano.',
  },
]

export default function ProcesoPaisajismo() {
  return (
    <section className="bg-bg-dark py-section overflow-hidden">
      <div className="container-hubble">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-label text-white/50 tracking-widest uppercase mb-3">— Cómo trabajamos</p>
          <h2
            className="font-body font-bold text-text-on-dark"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.1, maxWidth: '22ch' }}
          >
            Un proceso claro de principio a fin.
          </h2>
        </motion.div>

        {/* Pasos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {pasos.map((paso, i) => (
            <motion.div
              key={paso.numero}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
              className="relative flex flex-col gap-5 pt-8 pb-10 pr-8 border-t border-white/12"
            >
              {/* Número grande */}
              <span
                className="font-body font-bold text-white/8 leading-none select-none absolute top-0 right-4 pointer-events-none"
                style={{ fontSize: 'clamp(5rem, 8vw, 7.5rem)' }}
              >
                {paso.numero}
              </span>

              {/* Número pequeño visible */}
              <span className="text-label text-white/45 tracking-widest font-medium">
                {paso.numero}
              </span>

              <h3
                className="font-body font-bold text-text-on-dark"
                style={{ fontSize: 'clamp(1.35rem, 2vw, 1.65rem)', lineHeight: 1.2, maxWidth: '14ch' }}
              >
                {paso.titulo}
              </h3>

              <p className="leading-relaxed" style={{ fontSize: '0.95rem', color: 'rgba(245,245,240,0.65)' }}>
                {paso.descripcion}
              </p>

              {/* Línea conectora — solo desktop, no en el último */}
              {i < pasos.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 right-0 w-px bg-white/10"
                  style={{ height: 'calc(100% - 2rem)' }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA inline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.3 }}
          className="mt-16 pt-10 border-t border-white/12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <p className="text-text-on-dark/70 text-small leading-relaxed max-w-md">
            ¿Listo para transformar tu espacio? El primer paso es una visita sin costo.
          </p>
          <motion.a
            href="https://wa.me/523316038900?text=Hola,%20me%20interesa%20el%20servicio%20de%20paisajismo"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-text-on-dark text-small font-semibold rounded-badge hover:bg-brand-primary-light transition-colors shrink-0"
          >
            Agendar visita por WhatsApp
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
