'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

export default function HeroPaisajismo() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '600px' }}>
      <Image
        src="/imagenes/home/gallery.jpg"
        alt="Servicio de paisajismo — Vivero Las Rosas"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />

      {/* Overlay doble: base oscura + gradiente izquierda */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(10,20,10,0.88) 0%, rgba(10,20,10,0.50) 50%, rgba(10,20,10,0.18) 100%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to right, rgba(10,20,10,0.55) 0%, rgba(10,20,10,0.0) 60%)',
      }} />

      {/* Número decorativo */}
      <div
        className="absolute right-0 bottom-0 font-heading font-bold text-white pointer-events-none select-none hidden lg:block"
        style={{ fontSize: 'clamp(18rem, 28vw, 32rem)', lineHeight: 0.85, opacity: 0.04, letterSpacing: '-0.05em', paddingRight: '1rem' }}
      >
        P
      </div>

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-center md:justify-end container-hubble pt-24 pb-10 md:pt-0 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
          className="text-label text-white/70 tracking-widest uppercase mb-5"
        >
          Vivero Las Rosas &nbsp;·&nbsp; Servicio Profesional &nbsp;·&nbsp; Jalisco
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.25 }}
          className="font-body font-bold text-white"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em', maxWidth: '16ch' }}
        >
          Espacios vivos,<br />
          diseñados para<br />
          durar.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.42 }}
          className="mt-5 text-white/70 leading-relaxed"
          style={{ fontSize: '1.1rem', maxWidth: '40ch' }}
        >
          Diseño, instalación y mantenimiento de jardines residenciales
          y corporativos. Desde una maceta hasta un jardín completo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 flex items-center gap-2.5 text-white/35"
        >
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
            <ArrowDown size={13} />
          </motion.div>
          <span className="text-label tracking-widest uppercase">Ver nuestros proyectos</span>
        </motion.div>
      </div>
    </section>
  )
}
