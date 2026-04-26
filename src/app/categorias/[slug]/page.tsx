import { notFound } from 'next/navigation'
import Image from 'next/image'
import { CATEGORIAS_META, type CategoriaSlug } from '@/lib/productos-data'
import Productos from '@/components/features/Productos'

const SLUGS_VALIDOS: CategoriaSlug[] = ['exterior', 'interior', 'sol', 'sombra', 'semisombra']

export function generateStaticParams() {
  return SLUGS_VALIDOS.map((slug) => ({ slug }))
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!SLUGS_VALIDOS.includes(slug as CategoriaSlug)) {
    notFound()
  }

  const cat = CATEGORIAS_META[slug as CategoriaSlug]

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(300px, 46vh, 520px)' }}
      >
        <Image
          src={cat.imagen}
          alt={`${cat.titulo} — Vivero Las Rosas`}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(10,25,10,0.75) 0%, rgba(10,25,10,0.40) 55%, rgba(10,25,10,0.08) 85%)',
          }}
        />
        <div
          className="absolute inset-0 flex flex-col justify-center container-hubble"
          style={{ paddingTop: '5rem' }}
        >
          <div className="max-w-xl">
            <p className="text-label text-white/70 tracking-widest uppercase mb-3">
              — Categoría botánica
            </p>
            <h1
              className="font-body font-bold text-white"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              {cat.titulo}.
            </h1>
          </div>
        </div>
      </section>

      {/* ── Plantas de esta categoría ── */}
      <Productos categoria={slug as CategoriaSlug} />
    </>
  )
}
