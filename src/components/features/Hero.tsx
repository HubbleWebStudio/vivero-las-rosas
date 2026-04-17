'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <>
      {/* ── MÓVIL: hero full-screen ── */}
      <section
        className="relative w-full overflow-hidden md:hidden"
        style={{ height: '100svh', minHeight: '600px' }}
      >
        <Image
          src="/imagenes/home/portada_desk.png"
          alt="Vivero Las Rosas — portada"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,25,10,0.88) 0%, rgba(10,25,10,0.45) 50%, rgba(10,25,10,0.08) 100%)',
          }}
        />
        <div
          ref={ref}
          className="absolute inset-0 flex flex-col justify-end container-hubble pb-14 pt-24"
        >
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-body font-bold text-white"
            style={{ fontSize: 'clamp(2.2rem, 8vw, 3rem)', lineHeight: 1.1 }}
          >
            Vivero Las Rosas.
            <br />
            Plantas y paisajismo.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="mt-4 text-white/80 leading-relaxed"
            style={{ fontSize: '0.95rem', maxWidth: '34ch' }}
          >
            Venta de plantas y servicio integral de paisajismo en
            San Pedro Tlaquepaque, Jalisco.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#categorias"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-badge text-small font-semibold bg-white text-brand-primary hover:bg-white/90 transition-all shadow-sm"
            >
              Ver catálogo
              <ArrowRight size={13} />
            </motion.a>
            <motion.a
              href="#servicios"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-badge text-small font-semibold bg-brand-primary text-text-on-dark hover:bg-brand-primary-light transition-all"
            >
              Paisajismo
              <ArrowRight size={13} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── DESKTOP: sección original, sin ningún cambio ── */}
      <section className="relative w-full overflow-hidden hidden md:block">
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
        <div className="max-w-4xl">
          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-body font-bold text-white"
            style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', lineHeight: 1.1 }}
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
            className="mt-5 text-white/85 leading-relaxed max-w-md"
            style={{ fontSize: '1.05rem' }}
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
            {/* Botón 1 — blanco con texto oliva */}
            <motion.a
              href="#categorias"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-badge text-small font-semibold bg-white text-brand-primary hover:bg-white/90 transition-all shadow-sm"
            >
              Ver catálogo
              <ArrowRight size={14} />
            </motion.a>

            {/* Botón 2 — verde oliva sólido con texto blanco */}
            <motion.a
              href="#servicios"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-badge text-small font-semibold bg-brand-primary text-text-on-dark hover:bg-brand-primary-light transition-all"
            >
              Nuestros servicios
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  )
}
