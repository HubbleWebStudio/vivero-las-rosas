'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

export default function BannerProductos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-bg-rest pb-0 pt-0">
      <div className="container-hubble py-6">
        {/* Banner card — imagen a tamaño natural (2880×960, ratio 3:1) */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-card"
        >
          {/* Imagen local con ratio natural */}
          <Image
            src="/imagenes/home/banner_productos_desk.png"
            alt="Catálogo general de plantas y árboles — Vivero Las Rosas"
            width={2880}
            height={960}
            className="w-full h-auto block"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          {/* Overlay gradiente izquierda → derecha */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(10,25,10,0.82) 0%, rgba(10,25,10,0.55) 45%, rgba(10,25,10,0.08) 80%, rgba(10,25,10,0) 100%)',
            }}
          />

          {/* Contenido superpuesto */}
          <div className="absolute inset-0 flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 md:p-14">

            {/* Izquierda — texto */}
            <div className="max-w-md">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
                className="text-label text-white/70 tracking-widest uppercase mb-4"
              >
                — Inventario completo
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.18 }}
                className="font-body font-bold text-white"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.1 }}
              >
                Catálogo general de{' '}
                <br className="hidden sm:block" />
                plantas y árboles.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.28 }}
                className="mt-4 text-small text-white/75 leading-relaxed max-w-xs"
              >
                {/* TODO: Reemplazar con contenido real */}
                Acceso total a nuestro inventario de más de 400 especies. Desde
                follaje decorativo hasta ejemplares de gran tamaño, listos para
                entrega inmediata.
              </motion.p>
            </div>

            {/* Derecha — CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
              className="shrink-0"
            >
              <motion.a
                href="#categorias"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-primary text-small font-semibold rounded-badge hover:bg-white/90 transition-colors shadow-sm"
              >
                Ver catálogo completo
                <ArrowRight size={15} />
              </motion.a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
