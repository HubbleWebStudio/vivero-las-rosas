import HeroPaisajismo from '@/components/features/HeroPaisajismo'
import ServiciosPaisajismo from '@/components/features/ServiciosPaisajismo'
import GaleriaPaisajismo from '@/components/features/GaleriaPaisajismo'
import ProcesoPaisajismo from '@/components/features/ProcesoPaisajismo'
import TeEsperamos from '@/components/features/TeEsperamos'

export default function PaisajismoPage() {
  return (
    <>
      {/* 01 — Hero */}
      <HeroPaisajismo />

      {/* 02 — Qué incluye el servicio */}
      <ServiciosPaisajismo />

      {/* 03 — Galería de proyectos */}
      <GaleriaPaisajismo />

      {/* 04 — Cómo trabajamos */}
      <ProcesoPaisajismo />

      {/* 05 — Te Esperamos */}
      <TeEsperamos />
    </>
  )
}
