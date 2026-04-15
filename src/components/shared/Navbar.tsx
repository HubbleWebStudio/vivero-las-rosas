'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { label: 'Productos',   href: '#productos'  },
  { label: 'Paisajismo',  href: '#servicios'  },
  { label: 'Nosotros',    href: '#galeria'    },
]

const WA_HREF = 'https://wa.me/5213315917870'

/* ── SVG WhatsApp inline ── */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.533a.75.75 0 0 0 .92.92l5.671-1.475A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.183-1.432l-.371-.22-3.367.875.893-3.26-.242-.385A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── Navbar flotante — píldora ── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <nav className="flex items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-badge px-5 py-2.5 shadow-md">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <span className="font-heading font-bold text-brand-primary text-h3 leading-none">
              Las Rosas
            </span>
          </a>

          {/* Links — desktop */}
          <div className="hidden md:flex items-center gap-6 text-small text-text-secondary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-brand-primary transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTAs — desktop */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Ícono WhatsApp — estilo Hubble */}
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contáctanos por WhatsApp"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-primary text-text-on-dark hover:bg-brand-primary-light transition-colors duration-200"
            >
              <WhatsAppIcon size={15} />
            </a>

            {/* Botón Contacto */}
            <a
              href="#contacto"
              className="inline-flex items-center px-4 py-1.5 bg-brand-primary text-text-on-dark text-small font-medium rounded-badge hover:bg-brand-primary-light transition-colors duration-200"
            >
              Contacto
            </a>
          </div>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1 text-text-primary"
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 bg-white/95 backdrop-blur-md rounded-card shadow-md px-5 py-4 flex flex-col gap-3 text-small text-text-secondary md:hidden"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-brand-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-text-on-dark text-small font-medium rounded-badge mt-1"
              >
                <WhatsAppIcon size={15} />
                WhatsApp
              </a>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center px-4 py-2 bg-brand-primary text-text-on-dark text-small font-medium rounded-badge"
              >
                Contacto
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Botón flotante sticky WhatsApp — estilo GALOPE ── */}
      <motion.a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contáctanos por WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 flex items-center justify-center rounded-full text-white"
        style={{
          background: 'var(--color-brand-primary)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.12)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4, type: 'spring', stiffness: 200 }}
        whileHover={{
          scale: 1.08,
          boxShadow: '0 10px 32px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.14)',
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.94 }}
      >
        <WhatsAppIcon size={28} />
      </motion.a>
    </>
  )
}
