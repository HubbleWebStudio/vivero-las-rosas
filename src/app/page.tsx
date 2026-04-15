import Hero from '@/components/features/Hero'
import CategoriasBotanicas from '@/components/features/CategoriasBotanicas'
import BannerProductos from '@/components/features/BannerProductos'
import Productos from '@/components/features/Productos'
import Servicio from '@/components/features/Servicio'
import Experiencia from '@/components/features/Experiencia'
import ArtGallery from '@/components/features/ArtGallery'
import Ubicacion from '@/components/features/Ubicacion'
import Contacto from '@/components/features/Contacto'

export default function Home() {
  return (
    <main>
      {/* 01 - Hero */}
      <Hero />

      {/* 02 - Categorías Botánicas */}
      <CategoriasBotanicas />

      {/* 03 - Banner Catálogo */}
      <BannerProductos />

      {/* 04 - Productos */}
      <Productos />

      {/* 05 - Servicio Profesional de Paisajismo */}
      <Servicio />

      {/* 06 - Experiencia / Stats */}
      <Experiencia />

      {/* 07 - Art Gallery */}
      <ArtGallery />

      {/* 08 - Ubicación y Horarios */}
      <Ubicacion />

      {/* 09 - Contacto */}
      <Contacto />
    </main>
  )
}
