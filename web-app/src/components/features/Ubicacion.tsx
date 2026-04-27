'use client'

import { motion, useInView } from 'framer-motion'
import { Clock, Mail, MapPin, ExternalLink } from 'lucide-react'
import { useRef } from 'react'

export default function Ubicacion() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="ubicacion" className="bg-bg-rest section-padding">
      <div ref={ref} className="container-hubble">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10"
        >
          <p className="text-label text-text-secondary tracking-widest uppercase mb-3">
            — Visítanos
          </p>
          <h2
            className="font-body font-bold text-text-primary"
            style={{ fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', lineHeight: 1.1 }}
          >
            Ubicación y horarios.
          </h2>
        </motion.div>

        {/* Contenido: mapa + card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-stretch">

          {/* Mapa Google Maps embed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
            className="w-full overflow-hidden rounded-card"
            style={{ height: '420px' }}
          >
            <iframe
              src="https://maps.google.com/maps?q=VIVERO+LAS+ROSAS,+C.+Vista+a+la+Catedral+1763,+Cerro+del+Tesoro,+San+Pedro+Tlaquepaque,+Jalisco,+Mexico&output=embed&z=17&hl=es"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Vivero Las Rosas"
            />
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.18 }}
            className="bg-bg-card rounded-card shadow-sm p-7 flex flex-col gap-6"
          >
            {/* Bloque 1 — Ubicación */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-brand-primary" />
                <span className="text-label font-semibold text-text-secondary tracking-widest uppercase">
                  Ubicación
                </span>
              </div>
              <p className="text-small text-text-primary leading-relaxed">
                  C. Vista a la Catedral 1763, Cerro del Tesoro,
                <br />45608 San Pedro Tlaquepaque, Jal.
              </p>
              <a
                href="https://maps.google.com/?q=20.6174147,-103.4016421"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-label text-brand-primary hover:text-brand-primary-light transition-colors"
              >
                Abrir en Google Maps
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="h-px bg-border" />

            {/* Bloque 2 — Horarios */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-brand-primary" />
                <span className="text-label font-semibold text-text-secondary tracking-widest uppercase">
                  Horarios
                </span>
              </div>
              <div className="text-small text-text-primary leading-relaxed flex flex-col gap-0.5">
                <span>Lunes a Viernes: 8:00 am — 7:00 pm</span>
                <span>Sábado: 8:00 am — 5:00 pm</span>
                <span>Domingo: 9:00 am — 4:00 pm</span>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Bloque 3 — Contacto */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-brand-primary" />
                <span className="text-label font-semibold text-text-secondary tracking-widest uppercase">
                  Contacto
                </span>
              </div>
              <div className="text-small text-text-primary flex flex-col gap-0.5">
                <span>33 1591 7870</span>
              </div>
            </div>

            {/* Botón WhatsApp */}
            <motion.a
              href="https://wa.me/523316038900"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary text-text-on-dark text-small font-medium rounded-btn hover:bg-brand-primary-light transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.533a.75.75 0 0 0 .92.92l5.671-1.475A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.183-1.432l-.371-.22-3.367.875.893-3.26-.242-.385A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Contáctanos por WhatsApp
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
