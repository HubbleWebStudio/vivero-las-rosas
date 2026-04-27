import Image from 'next/image'
import { IMG } from '@/lib/images'

const pages = [
  { label: 'Inicio',     href: '/' },
  { label: 'Productos',  href: '/productos' },
  { label: 'Paisajismo', href: '/paisajismo' },
  { label: 'Nosotros',   href: '/nosotros' },
]

function IconWhatsApp() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border">
      <div className="container-hubble py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

          {/* Izquierda — Logo + descripción */}
          <div className="flex flex-col gap-4">
            <div className="relative h-9 w-32">
              <Image
                src={IMG.home.logo}
                alt="Vivero Las Rosas"
                fill
                className="object-contain object-left"
                sizes="128px"
              />
            </div>
            <p className="text-small text-text-secondary leading-relaxed max-w-[200px]">
              Vivero familiar con plantas de interior, exterior y servicio de paisajismo.
            </p>
            {/* Redes sociales */}
            <div className="flex items-center gap-2.5">
              <a href="https://wa.me/523310000000" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                 className="w-9 h-9 flex items-center justify-center rounded-btn border border-border text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors">
                <IconWhatsApp />
              </a>
              <a href="https://instagram.com/viverolasrosas" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 className="w-9 h-9 flex items-center justify-center rounded-btn border border-border text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors">
                <IconInstagram />
              </a>
              <a href="https://facebook.com/viverolasrosas" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="w-9 h-9 flex items-center justify-center rounded-btn border border-border text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors">
                <IconFacebook />
              </a>
            </div>
          </div>

          {/* Derecha — Páginas */}
          <div className="flex flex-col gap-4">
            <span className="text-label font-semibold text-text-primary tracking-widest uppercase">
              Páginas
            </span>
            <ul className="flex flex-col gap-3">
              {pages.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="text-small text-text-secondary hover:text-brand-primary transition-colors">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-hubble py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-label text-text-secondary">
            © {new Date().getFullYear()} Vivero Las Rosas. Todos los derechos reservados.
          </span>
          <span className="text-label text-text-secondary">
            San Pedro Tlaquepaque, Jalisco
          </span>
        </div>
      </div>
    </footer>
  )
}
