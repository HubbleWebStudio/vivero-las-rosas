import { Leaf } from 'lucide-react'

const servicios = [
  'Paisajismo Comercial',
  'Colección Privada',
  'Mantenimiento',
  'Macetería Premium',
  'Asesoría Inmobiliaria',
]

const nosotros = [
  'Nuestros Viveros',
  'Proyectos Vivos',
  'Certificaciones',
  'Manifiesto Verde',
]

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border">
      {/* Columnas principales */}
      <div className="container-hubble py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Logo + descripción */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-btn bg-brand-primary flex items-center justify-center shrink-0">
                <Leaf size={15} className="text-text-on-dark" />
              </div>
              <span className="font-heading font-bold text-text-primary">
                Vivero Las Rosas
              </span>
            </div>
            <p className="text-small text-text-secondary leading-relaxed max-w-[200px]">
              {/* TODO: Reemplazar con contenido real */}
              Inventario botánico de alto desempeño y paisajismo para marcas que
              no aceptan mediocridad.
            </p>
          </div>

          {/* Col 2 — Servicios */}
          <div className="flex flex-col gap-4">
            <span className="text-label font-semibold text-text-primary tracking-widest uppercase">
              Servicios
            </span>
            <ul className="flex flex-col gap-2.5">
              {servicios.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="text-small text-text-secondary hover:text-brand-primary transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Nosotros */}
          <div className="flex flex-col gap-4">
            <span className="text-label font-semibold text-text-primary tracking-widest uppercase">
              Nosotros
            </span>
            <ul className="flex flex-col gap-2.5">
              {nosotros.map((n) => (
                <li key={n}>
                  <a
                    href="#"
                    className="text-small text-text-secondary hover:text-brand-primary transition-colors"
                  >
                    {n}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacto + redes */}
          <div className="flex flex-col gap-4">
            <span className="text-label font-semibold text-text-primary tracking-widest uppercase">
              Contacto
            </span>
            <div className="flex flex-col gap-2 text-small text-text-secondary">
              {/* TODO: Reemplazar con datos reales */}
              <a
                href="mailto:hola@viverolasrosas.com"
                className="hover:text-brand-primary transition-colors"
              >
                hola@viverolasrosas.com
              </a>
              <span>Av. Botánica 111</span>
              <span>Guadalajara, JAL 45000</span>
            </div>
            {/* Redes sociales */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-btn border border-border text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors text-small font-bold"
                aria-label="X / Twitter"
              >
                𝕏
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-btn border border-border text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-hubble py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-label text-text-secondary">
            © {new Date().getFullYear()} Vivero Las Rosas. Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-4 text-label text-text-secondary">
            <a href="#" className="hover:text-brand-primary transition-colors">Cuidados</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Garantía Botánica</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Políticas</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
