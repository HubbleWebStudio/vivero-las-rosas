'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const avatares = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80',
]

export default function Contacto() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contacto" className="bg-bg-dark section-padding">
      <div ref={ref} className="container-hubble">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* ── Columna izquierda — texto ── */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-label tracking-widest uppercase"
              style={{ color: 'rgba(245,245,240,0.65)' }}
            >
              — Agenda una asesoría
            </motion.p>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
              className="font-body font-bold text-text-on-dark"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.1 }}
            >
              Da vida a tu
              <br />
              espacio
              <br />
              arquitectónico.
            </motion.h2>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.16 }}
              className="text-small leading-relaxed max-w-xs"
              style={{ color: 'rgba(245,245,240,0.75)' }}
            >
              {/* TODO: Reemplazar con contenido real */}
              Agenda una consultoría botánica gratuita. Hablamos de iluminación,
              riego y la selección perfecta para tu proyecto.
            </motion.p>

            {/* Avatares + social proof */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.24 }}
              className="flex items-center gap-3"
            >
              {/* Avatares superpuestos */}
              <div className="flex">
                {avatares.map((src, i) => (
                  <div
                    key={src}
                    className="relative w-8 h-8 rounded-full overflow-hidden border-2"
                    style={{
                      borderColor: '#3A4635',
                      marginLeft: i === 0 ? 0 : '-10px',
                      zIndex: avatares.length - i,
                    }}
                  >
                    <Image src={src} alt="Cliente" fill className="object-cover" sizes="32px" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-small font-semibold text-text-on-dark">
                  +800 clientes
                </span>
                <span className="text-label" style={{ color: 'rgba(245,245,240,0.60)' }}>
                  Confían en nuestras ideas
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Columna derecha — formulario ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* Input 1 — con botón inline */}
            <div
              className="flex items-center gap-2 rounded-btn px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <input
                type="text"
                placeholder="Especialización"
                className="flex-1 bg-transparent text-small outline-none placeholder:text-white/50 text-text-on-dark"
              />
              <button className="shrink-0 px-4 py-1.5 bg-white text-brand-primary text-label font-semibold rounded-badge hover:bg-white/90 transition-colors">
                Solicitar catálogo
              </button>
            </div>

            {/* Input 2 */}
            <div
              className="rounded-btn px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full bg-transparent text-small outline-none placeholder:text-white/50 text-text-on-dark"
              />
            </div>

            {/* Texto legal */}
            <p
              className="text-label leading-relaxed"
              style={{ color: 'rgba(245,245,240,0.45)' }}
            >
              Al enviar aceptas los términos de nuestra política de privacidad
              de acuerdo con la ley. {/* TODO: Enlazar política real */}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
