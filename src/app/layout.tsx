import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'

import './globals.css'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

// Fuente de cuerpo
const fontBody = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body-var',
  display: 'swap',
})

// Fuente de headings
const fontHeading = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading-var',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vivero Las Rosas — Plantas y Paisajismo',
  description: 'Venta de plantas y servicio profesional de paisajismo. Tu vivero de confianza.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${fontBody.variable} ${fontHeading.variable}`}>
      <body className="font-body bg-bg text-text-primary antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
