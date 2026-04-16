'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CategoriasBotanicas from '@/components/features/CategoriasBotanicas'
import Productos from '@/components/features/Productos'

export default function ProductosPage() {
  return (
    <>
      {/* ── Hero — ancho completo, sin botón ── */}
      <section className="relative w-full overflow-hidden" style={{ height: 'clamp(340px, 52vh, 600px)' }}>
        {/* Imagen de fondo */}
        <Image
          src="/imagenes/home/banner_productos_desk.png"
          alt="Catálogo general de plantas y árboles — Vivero Las Rosas"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />

        {/* Overlay gradiente — igual que home */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(10,25,10,0.72) 0%, rgba(10,25,10,0.38) 50%, rgba(10,25,10,0.05) 80%)',
          }}
        />

        {/* Contenido superpuesto */}
        <div className="absolute inset-0 flex flex-col justify-center container-hubble" style={{ paddingTop: '5rem' }}>
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
              className="text-label text-white/75 tracking-widest uppercase mb-4"
            >
              — Inventario completo
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
              className="font-body font-bold text-white"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
            >
              Catálogo general de
              <br />
              plantas y árboles.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.32 }}
              className="mt-4 text-white/75 leading-relaxed"
              style={{ fontSize: '1.05rem', maxWidth: '36ch' }}
            >
              Más de 100 especies disponibles. Follaje decorativo, arbustos,
              árboles de gran tamaño y plantas de temporada.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Sección categorías ── */}
      <CategoriasBotanicas />

      {/* ── Sección productos ── */}
      <Productos />
    </>
  )
}
