'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    /*
      La sección adopta el tamaño natural de la imagen (2880×1440).
      No se fuerza h-screen — el alto lo determina el aspecto 2:1 de la foto.
    */
    <section className="relative w-full overflow-hidden">
      {/* Imagen a tamaño natural — width/height definen el ratio, CSS escala al 100% */}
      <Image
        src="/imagenes/home/portada_desk.png"
        alt="Vivero Las Rosas — portada"
        width={2880}
        height={1440}
        priority
        className="w-full h-auto block"
        sizes="100vw"
      />

      {/* Gradiente izquierda sutil — legibilidad sin perder la imagen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(10,25,10,0.62) 0%, rgba(10,25,10,0.32) 45%, rgba(10,25,10,0.0) 75%)',
        }}
      />

      {/* Contenido superpuesto — centrado verticalmente, alineado a la izquierda */}
      <div
        ref={ref}
        className="absolute inset-0 flex flex-col justify-center container-hubble"
        style={{ paddingTop: '5rem' }}
      >
        <div className="max-w-lg">
          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-body font-bold text-white"
            style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)', lineHeight: 1.12 }}
          >
            Vivero Las Rosas.
            <br />
            Venta de plantas y
            <br />
            Servicio de paisajismo.
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="mt-5 text-small text-white/80 leading-relaxed max-w-xs"
          >
            {/* TODO: Reemplazar con contenido real */}
            Venta de plantas de interior y exterior. Servicio integral de diseño,
            instalación y mantenimiento de paisajismo para espacios corporativos
            y residenciales.
          </motion.p>

          {/* Botones CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {/* Botón 1 — fondo oscuro semitransparente + blur */}
            <motion.a
              href="#categorias"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-badge text-small font-medium text-white transition-all"
              style={{
                background: 'rgba(0,0,0,0.38)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              Ver catálogo
              <ArrowRight size={14} />
            </motion.a>

            {/* Botón 2 — outlined blanco */}
            <motion.a
              href="#servicios"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-badge border border-white/60 text-small font-medium text-white hover:bg-white/10 transition-all"
            >
              Nuestros servicios
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
