'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { IMG } from '@/lib/images'

export default function TeEsperamos() {
  return (
    <section className="bg-bg py-section border-t border-border">
      <div className="container-hubble">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Imagen */}
          <div
            className="relative rounded-card overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <Image
              src={IMG.home.gallery}
              alt="Proyecto de jardín realizado por Vivero Las Rosas"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 rounded-card"
              style={{ background: 'rgba(12,26,12,0.08)' }}
            />
          </div>

          {/* Texto + botones */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-label text-text-secondary tracking-widest uppercase mb-3">
                — Te esperamos
              </p>
              <h2
                className="font-body font-bold text-text-primary"
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', lineHeight: 1.15 }}
              >
                La mejor planta siempre se elige en persona.
              </h2>
              <p className="mt-4 text-small text-text-secondary leading-relaxed">
                C. Vista a la Catedral 1763, San Pedro Tlaquepaque, JAL
                <br />
                Lun–Vie 8:00–19:00 &nbsp;·&nbsp; Sáb 8:00–17:00 &nbsp;·&nbsp; Dom 9:00–16:00
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.a
                href="https://wa.me/523316038900"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-text-on-dark text-small font-semibold rounded-badge hover:bg-brand-primary-light transition-colors"
              >
                Escribir por WhatsApp
                <ArrowRight size={15} />
              </motion.a>
              <motion.a
                href="https://maps.google.com/?q=20.6174147,-103.4016421"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-text-primary text-small font-semibold rounded-badge hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                Cómo llegar
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
