'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const links = [
  { label: 'Productos',   href: '/productos'  },
  { label: 'Paisajismo',  href: '/paisajismo'  },
  { label: 'Nosotros',    href: '/nosotros'   },
]

const WA_HREF = 'https://wa.me/523316038900'

/* ── SVG Icons inline ── */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  )
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.932-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

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
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
        <nav className="flex justify-between md:grid md:grid-cols-3 items-center bg-white/90 backdrop-blur-md rounded-badge px-5 py-2 shadow-md">

          {/* Col 1 — Links desktop / invisible en mobile (mantiene grid desktop intacto) */}
          <div className="hidden md:flex items-center gap-7 text-small text-text-secondary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-brand-primary transition-colors duration-200 whitespace-nowrap"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Col 2 — Logo: centrado en desktop, izquierda en mobile (flex) */}
          <Link href="/" className="flex items-center md:justify-center">
            <Image
              src="/imagenes/home/logo.png"
              alt="Las Rosas Vivero & Paisajismo"
              width={160}
              height={70}
              className="object-contain"
              style={{ height: '68px', width: 'auto' }}
              priority
            />
          </Link>

          {/* Col 3 — Derecha: iconos + botón (desktop) / iconos sociales + hamburger (mobile) */}
          <div className="flex items-center justify-end gap-2">
            {/* Iconos + botón — solo desktop */}
            <div className="hidden md:flex items-center gap-2">
              {/* WhatsApp */}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-primary text-text-on-dark hover:bg-brand-primary-light transition-colors duration-200"
              >
                <WhatsAppIcon size={15} />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/viveroypaisajismolasrosas/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:opacity-90 transition-opacity duration-200"
                style={{
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                }}
              >
                <InstagramIcon size={14} />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100063724833472&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:opacity-90 transition-opacity duration-200"
                style={{ background: '#1877F2' }}
              >
                <FacebookIcon size={15} />
              </a>

              {/* Botón Visítanos */}
              <a
                href="#ubicacion"
                className="inline-flex items-center px-4 py-1.5 bg-brand-primary text-text-on-dark text-small font-medium rounded-badge hover:bg-brand-primary-light transition-colors duration-200"
              >
                Visítanos
              </a>
            </div>

            {/* Iconos sociales — solo mobile, a la izquierda del hamburger */}
            <div className="flex md:hidden items-center gap-2">
              {/* WhatsApp */}
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-primary text-text-on-dark"
              >
                <WhatsAppIcon size={16} />
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/viveroypaisajismolasrosas/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full text-white"
                style={{
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                }}
              >
                <InstagramIcon size={15} />
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100063724833472&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full text-white"
                style={{ background: '#1877F2' }}
              >
                <FacebookIcon size={16} />
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
          </div>
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
                href="#ubicacion"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center px-4 py-2 bg-brand-primary text-text-on-dark text-small font-medium rounded-badge"
              >
                Visítanos
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
