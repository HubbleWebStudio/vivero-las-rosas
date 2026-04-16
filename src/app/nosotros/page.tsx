'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import HistoriaVivero from '@/components/features/HistoriaVivero'
import ValoresVivero from '@/components/features/ValoresVivero'
import Experiencia from '@/components/features/Experiencia'
import ArtGallery from '@/components/features/ArtGallery'
import TeEsperamos from '@/components/features/TeEsperamos'

export default function NosotrosPage() {
  return (
    <>

      {/* ── Hero — full screen, editorial ── */}
      <section
        className="relative overflow-hidden bg-bg-dark"
        style={{ height: '100vh', minHeight: '640px' }}
      >
        {/* Imagen — sin parallax, igual al home */}
        <Image
          src="/imagenes/home/portada_desk.png"
          alt="Interior del Vivero Las Rosas, Tlaquepaque"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />

        {/* Overlay — mismo estilo del home: gradiente izquierda-derecha + base oscura */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,20,10,0.80) 0%, rgba(10,20,10,0.40) 55%, rgba(10,20,10,0.15) 100%)',
          }}
        />

        {/* Número decorativo "15" — fondo tipográfico */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-heading font-bold text-text-on-dark pointer-events-none select-none hidden lg:block"
          style={{
            fontSize: 'clamp(16rem, 24vw, 26rem)',
            lineHeight: 1,
            opacity: 0.04,
            letterSpacing: '-0.04em',
            paddingRight: '2rem',
          }}
        >
          15
        </div>

        {/* Contenido — anclado al fondo izquierdo */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-hubble pb-16 md:pb-24">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 }}
              className="text-small text-white/80 tracking-widest uppercase mb-5"
            >
              Vivero Las Rosas &nbsp;·&nbsp; Desde 2008 &nbsp;·&nbsp; San Pedro Tlaquepaque, JAL
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut', delay: 0.3 }}
              className="font-body font-bold text-text-on-dark"
              style={{
                fontSize: 'clamp(2.9rem, 6.5vw, 6rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                maxWidth: '14ch',
              }}
            >
              Plantas vivas para<br />
              espacios que inspiran.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.48 }}
              className="mt-5 text-text-on-dark/75 leading-relaxed"
              style={{ fontSize: '1.15rem', maxWidth: '38ch' }}
            >
              Vivero familiar con 15 años criando plantas que respiran bien,
              en el corazón de Jalisco.
            </motion.p>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-10 flex items-center gap-2.5 text-white/35"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              >
                <ArrowDown size={13} />
              </motion.div>
              <span className="text-label tracking-widest uppercase">Conocer nuestra historia</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Manifesto strip ── */}
      <section className="bg-bg-dark border-t border-white/8 py-16 md:py-24">
        <div className="container-hubble">
          <motion.blockquote
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="font-heading italic text-text-on-dark text-center mx-auto"
            style={{
              fontSize: 'clamp(1.2rem, 2.4vw, 1.875rem)',
              lineHeight: 1.5,
              maxWidth: '54rem',
              opacity: 0.85,
            }}
          >
            &ldquo;Una buena planta no se compra — se elige. Por eso en Las Rosas nos tomamos
            el tiempo de conocerte antes de recomendarte.&rdquo;
          </motion.blockquote>
        </div>
      </section>

      {/* ── Historia ── */}
      <HistoriaVivero />

      {/* ── Valores ── */}
      <ValoresVivero />

      {/* ── Cifras ── */}
      <Experiencia />

      {/* ── Art Gallery — Resultados de paisajismo ── */}
      <ArtGallery />

      {/* ── Te Esperamos ── */}
      <TeEsperamos />

    </>
  )
}
