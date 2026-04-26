'use client'

import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Maximize2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { IMG } from '@/lib/images'

type InfoSeccion = { titulo: string; items: string[] }
type ProductoInfo = { intro: string; secciones: InfoSeccion[] }
type Producto = {
  id: number
  nombre: string
  tags: string
  descripcion: string
  imagen: string
  imagen2: string
  info?: ProductoInfo
}

const productos: Producto[] = [
  // ── Fila 1 · CÁLIDA (rojos, fucsia intensos + follaje plateado) ──────────
  {
    id: 1,
    nombre: 'Afelandra',
    tags: 'Interior · Decorativa',
    descripcion: 'Follaje exótico con venas plateadas y espigas amarillas.',
    imagen: IMG.productos.afelandra,
    imagen2: IMG.productos.afelandra_2,
    info: {
      intro: 'La Afelandra es una planta tropical reconocida por sus llamativas hojas verde oscuro con venas plateadas y sus espigas de flores amarillas. Perfecta para dar un toque exótico a cualquier interior.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de las selvas tropicales de Brasil y México',
            'Pertenece a la familia Acanthaceae',
            'Se cultiva desde el siglo XIX como planta ornamental',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante indirecta — evitar el sol directo',
            'Riego moderado; mantener la tierra húmeda sin encharcar',
            'Le favorece la humedad ambiental alta',
            'Temperatura ideal: entre 15 °C y 25 °C',
            'Abona cada mes durante primavera y verano',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Florece en primavera con espigas amarillas muy vistosas',
            'Las hojas caen si el ambiente es muy seco o hay corrientes de aire',
            'Tóxica para mascotas y niños — colócala fuera de su alcance',
          ],
        },
      ],
    },
  },
  {
    id: 2,
    nombre: 'Bugambilia',
    tags: 'Exterior · Sol',
    descripcion: 'Espectacular enredadera de flores fucsia y morado.',
    imagen: IMG.productos.bugambilia,
    imagen2: IMG.productos.bugambilia_2,
  },
  {
    id: 3,
    nombre: 'Árbol de la Abundancia',
    tags: 'Interior · Decorativa',
    descripcion: 'Tronco trenzado símbolo de prosperidad y buena suerte.',
    imagen: IMG.productos.arbol_de_la_abundancia,
    imagen2: IMG.productos.arbol_de_la_abundancia_2,
  },
  {
    id: 4,
    nombre: 'Kalancho',
    tags: 'Interior · Suculenta',
    descripcion: 'Suculenta florida en colores vivos, muy fácil de cuidar.',
    imagen: IMG.productos.kalancho,
    imagen2: IMG.productos.kalancho_2,
  },
  // ── Fila 2 · FRÍA (tropicales decorativas interior) ──────────────────────
  {
    id: 5,
    nombre: 'Alternanthera',
    tags: 'Exterior · Jardín',
    descripcion: 'Follaje colorido perfecto para bordes y macizos.',
    imagen: IMG.productos.alternanthera,
    imagen2: IMG.productos.alternanthera_2,
  },
  {
    id: 6,
    nombre: 'Calathea',
    tags: 'Interior · Tropical',
    descripcion: 'Hojas pintadas con patrones únicos, ideal para sombra.',
    imagen: IMG.productos.calathea,
    imagen2: IMG.productos.calathea_2,
  },
  {
    id: 7,
    nombre: 'Anturio',
    tags: 'Interior · Tropical',
    descripcion: 'Flores lacadas en rojo intenso, ideal para interiores.',
    imagen: IMG.productos.anturio,
    imagen2: IMG.productos.anturio_2,
  },
  {
    id: 8,
    nombre: 'Ficus Pandurata',
    tags: 'Interior · Tropical',
    descripcion: 'Hojas grandes en forma de violín, tendencia en diseño.',
    imagen: IMG.productos.ficus_pandurata,
    imagen2: IMG.productos.ficus_pandurata_2,
  },
  // ── Fila 3 · FRÍA (aromáticas verdes, hierbas) ───────────────────────────
  {
    id: 9,
    nombre: 'Albaca',
    tags: 'Aromática · Exterior',
    descripcion: 'Hierba aromática ideal para cocina y jardines.',
    imagen: IMG.productos.albaca,
    imagen2: IMG.productos.albaca_2,
  },
  {
    id: 10,
    nombre: 'Cedro Limón',
    tags: 'Aromática · Exterior',
    descripcion: 'Árbol aromático con fragancia cítrica intensa.',
    imagen: IMG.productos.cedro_limon,
    imagen2: IMG.productos.cedro_limon_2,
  },
  {
    id: 11,
    nombre: 'Citronela',
    tags: 'Aromática · Exterior',
    descripcion: 'Repelente natural de mosquitos con aroma a limón.',
    imagen: IMG.productos.citronela,
    imagen2: IMG.productos.citronela_2,
  },
  {
    id: 12,
    nombre: 'Menta',
    tags: 'Aromática · Exterior',
    descripcion: 'Hierba fresca y aromática perfecta para infusiones.',
    imagen: IMG.productos.menta,
    imagen2: IMG.productos.menta_2,
  },
  // ── Fila 4 · CÁLIDA (rosas, corales, multicolor cálido) ──────────────────
  {
    id: 13,
    nombre: 'Belén',
    tags: 'Interior · Colgante',
    descripcion: 'Cascadas de flores en colores vivos todo el año.',
    imagen: IMG.productos.belen,
    imagen2: IMG.productos.belen_2,
  },
  {
    id: 14,
    nombre: 'Coleo',
    tags: 'Interior · Decorativa',
    descripcion: 'Follaje multicolor en rojos, verdes y amarillos.',
    imagen: IMG.productos.coleo,
    imagen2: IMG.productos.coleo_2,
  },
  {
    id: 15,
    nombre: 'Cyclamen',
    tags: 'Interior · Flor',
    descripcion: 'Flores elegantes en rosa y blanco, ideal para invierno.',
    imagen: IMG.productos.cyclamen,
    imagen2: IMG.productos.cyclamen_2,
  },
  {
    id: 16,
    nombre: 'Diplademia',
    tags: 'Exterior · Trepadora',
    descripcion: 'Flores trompeta en rosa vibrante todo el verano.',
    imagen: IMG.productos.diplademia,
    imagen2: IMG.productos.diplademia_2,
  },
  // ── Fila 5 · FRÍA (follaje oscuro, suculentas verdes) ────────────────────
  {
    id: 17,
    nombre: 'Buxo Sencillo',
    tags: 'Exterior · Jardín',
    descripcion: 'Arbusto compacto, perfecto para topiaria y setos.',
    imagen: IMG.productos.buxo_sencillo,
    imagen2: IMG.productos.buxo_sencillo_2,
  },
  {
    id: 18,
    nombre: 'Cuna de Moisés',
    tags: 'Interior · Decorativa',
    descripcion: 'Hojas bicolor que crean un efecto visual dramático.',
    imagen: IMG.productos.cuna_de_moises,
    imagen2: IMG.productos.cuna_de_moises_2,
  },
  {
    id: 19,
    nombre: 'Hule',
    tags: 'Interior · Tropical',
    descripcion: 'Hojas grandes y brillantes, fácil cuidado en interior.',
    imagen: IMG.productos.hule,
    imagen2: IMG.productos.hule_2,
  },
  {
    id: 20,
    nombre: 'Lengua de Suegra',
    tags: 'Interior · Suculenta',
    descripcion: 'Suculenta vertical de bajo mantenimiento y gran aguante.',
    imagen: IMG.productos.lengua_de_suegra,
    imagen2: IMG.productos.lengua_de_suegra_2,
  },
  // ── Fila 6 · CÁLIDA (morados cálidos, dorados) ───────────────────────────
  {
    id: 21,
    nombre: 'Duranta Cuba',
    tags: 'Exterior · Jardín',
    descripcion: 'Flores moradas en cascada y berries dorados.',
    imagen: IMG.productos.duranta_cuba,
    imagen2: IMG.productos.duranta_cuba_2,
  },
  {
    id: 22,
    nombre: 'Malva',
    tags: 'Exterior · Flor',
    descripcion: 'Flores en rosa y lila, atrae mariposas y polinizadores.',
    imagen: IMG.productos.malva,
    imagen2: IMG.productos.malva_2,
  },
  {
    id: 23,
    nombre: 'Duranta Golden',
    tags: 'Exterior · Jardín',
    descripcion: 'Follaje dorado brillante, ideal para setos decorativos.',
    imagen: IMG.productos.duranta_golden,
    imagen2: IMG.productos.duranta_golden_2,
  },
  {
    id: 24,
    nombre: 'Violeta Africana',
    tags: 'Interior · Flor',
    descripcion: 'Flores aterciopeladas en violeta para escritorios.',
    imagen: IMG.productos.violeta_africana,
    imagen2: IMG.productos.violeta_africana_2,
  },
  // ── Fila 7 · FRÍA (lavanda, exterior azules y blancos) ───────────────────
  {
    id: 25,
    nombre: 'Lavanda',
    tags: 'Aromática · Exterior',
    descripcion: 'Aroma relajante y flores violetas que atraen abejas.',
    imagen: IMG.productos.lavanda,
    imagen2: IMG.productos.lavanda,
  },
  {
    id: 26,
    nombre: 'Palo de Brasil',
    tags: 'Interior · Decorativa',
    descripcion: 'Troncos leñosos con follaje verde vibrante.',
    imagen: IMG.productos.palo_de_brasil,
    imagen2: IMG.productos.palo_de_brasil_2,
  },
  {
    id: 27,
    nombre: 'Salvia Azul',
    tags: 'Exterior · Aromática',
    descripcion: 'Flores azul violeta que atraen colibríes y abejas.',
    imagen: IMG.productos.salvia_azul,
    imagen2: IMG.productos.salvia_azul_2,
  },
  {
    id: 28,
    nombre: 'Teresita',
    tags: 'Exterior · Flor',
    descripcion: 'Flores pequeñas en cojín, muy resistente al sol.',
    imagen: IMG.productos.teresita,
    imagen2: IMG.productos.teresita_2,
  },
  // ── Fila 8 · FRÍA (palmeras, aromáticas, verde oscuro) ───────────────────
  {
    id: 29,
    nombre: 'Palma Camedor',
    tags: 'Interior · Tropical',
    descripcion: 'Palma elegante que purifica el aire del hogar.',
    imagen: IMG.productos.palma_camedor,
    imagen2: IMG.productos.palma_camedor_2,
  },
  {
    id: 30,
    nombre: 'Romero',
    tags: 'Aromática · Exterior',
    descripcion: 'Arbusto aromático versátil para cocina y jardines.',
    imagen: IMG.productos.romero,
    imagen2: IMG.productos.romero_2,
  },
  {
    id: 31,
    nombre: 'Trueno de Venus',
    tags: 'Exterior · Jardín',
    descripcion: 'Follaje fino y flores blancas perfumadas en verano.',
    imagen: IMG.productos.trueno_de_venus,
    imagen2: IMG.productos.trueno_de_venus_2,
  },
  {
    id: 32,
    nombre: 'Zamioculca',
    tags: 'Interior · Suculenta',
    descripcion: 'Resistente y elegante, prospera con poca luz y agua.',
    imagen: IMG.productos.zamioculca,
    imagen2: IMG.productos.zamioculca_2,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

/* ── Lightbox ── */
function Lightbox({ producto, onClose }: { producto: Producto; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
      className="fixed inset-0 z-50"
      style={{ background: 'rgba(12,18,12,0.85)', backdropFilter: 'blur(14px)' }}
    >
      {/* ── Mobile layout ── */}
      <div
        className={`md:hidden flex flex-col h-full px-4 gap-2 ${producto.info ? 'pt-10 pb-6 overflow-hidden' : 'justify-center'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Pill + botón cerrar */}
        <div className="flex items-center justify-between shrink-0">
          <div className="px-3 py-1.5 rounded-badge bg-white/15 backdrop-blur-sm">
            <span className="text-label font-medium text-white tracking-wide">{producto.tags}</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white"
            aria-label="Cerrar"
          >
            <X size={16} />
          </button>
        </div>

        {/* 2. Carrusel */}
        <div
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory shrink-0"
          style={{ scrollbarWidth: 'none' } as React.CSSProperties}
        >
          <div
            className="relative shrink-0 overflow-hidden rounded-card snap-center"
            style={{ width: '88%', aspectRatio: '4 / 5' }}
          >
            <Image src={producto.imagen} alt={`${producto.nombre} — vista general`} fill className="object-cover object-center" sizes="90vw" priority />
          </div>
          <div
            className="relative shrink-0 overflow-hidden rounded-card snap-center"
            style={{ width: '88%', aspectRatio: '4 / 5' }}
          >
            <Image src={producto.imagen2} alt={`${producto.nombre} — detalle`} fill className="object-cover object-center" sizes="90vw" priority />
          </div>
        </div>

        {/* 3. Cuadro info — se alarga y hace scroll cuando hay información detallada */}
        <div className={`bg-white rounded-card px-5 shadow-sm ${producto.info ? 'py-5 flex-1 overflow-y-auto min-h-0' : 'py-3.5'}`}>
          <h3 className="font-body font-bold text-text-primary" style={{ fontSize: '1rem' }}>
            {producto.nombre}
          </h3>
          <p className="text-body text-text-secondary leading-relaxed mt-1">
            {producto.descripcion}
          </p>
          {producto.info && (
            <>
              <p className="text-body text-text-secondary leading-relaxed mt-3">
                {producto.info.intro}
              </p>
              {producto.info.secciones.map((seccion) => (
                <div key={seccion.titulo} className="mt-4">
                  <h4 className="font-body font-semibold text-text-primary text-sm mb-2">
                    {seccion.titulo}
                  </h4>
                  <ul className="flex flex-col gap-1.5">
                    {seccion.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-small text-text-secondary leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <a
                href="https://wa.me/523316038900"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-primary text-text-on-dark text-small font-medium rounded-btn hover:bg-brand-primary-light transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.533a.75.75 0 0 0 .92.92l5.671-1.475A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.183-1.432l-.371-.22-3.367.875.893-3.26-.242-.385A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Consultar existencia
              </a>
            </>
          )}
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex items-center justify-center h-full p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 transition-colors"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
          className={producto.info ? 'grid grid-cols-3 gap-3 rounded-card overflow-hidden' : 'flex flex-row gap-3 items-stretch'}
          style={producto.info ? { width: 'min(95vw, 1440px)' } : { height: '80vh' }}
        >
          {/* Panel info — solo si el producto tiene información detallada */}
          {producto.info && (
            <div className="bg-white rounded-card px-6 py-6 overflow-y-auto flex flex-col gap-5" style={{ aspectRatio: '4 / 5' }}>
              <div>
                <h3 className="font-body font-bold text-text-primary" style={{ fontSize: '1.125rem', lineHeight: 1.25 }}>
                  {producto.nombre}
                </h3>
                <p className="text-body text-text-secondary leading-relaxed mt-2">
                  {producto.info.intro}
                </p>
              </div>
              {producto.info.secciones.map((seccion) => (
                <div key={seccion.titulo}>
                  <h4 className="font-body font-semibold text-text-primary text-sm mb-2">
                    {seccion.titulo}
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {seccion.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-small text-text-secondary leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <a
                href="https://wa.me/523316038900"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand-primary text-text-on-dark text-small font-medium rounded-btn hover:bg-brand-primary-light transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.533a.75.75 0 0 0 .92.92l5.671-1.475A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.183-1.432l-.371-.22-3.367.875.893-3.26-.242-.385A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Consultar existencia
              </a>
            </div>
          )}
          {/* Imagen 1 */}
          <div className="relative overflow-hidden rounded-card" style={{ aspectRatio: '4 / 5' }}>
            <Image src={producto.imagen} alt={`${producto.nombre} — vista general`} fill className="object-cover object-center" sizes="40vw" priority />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-badge bg-black/30 backdrop-blur-sm">
              <span className="text-label text-white/80">Vista general</span>
            </div>
          </div>
          {/* Imagen 2 */}
          <div className="relative overflow-hidden rounded-card" style={{ aspectRatio: '4 / 5' }}>
            <Image src={producto.imagen2} alt={`${producto.nombre} — detalle`} fill className="object-cover object-center" sizes="40vw" priority />
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-badge bg-black/30 backdrop-blur-sm">
              <span className="text-label text-white/80">Detalle</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ── Card individual con carrusel propio ── */
function ProductCard({
  producto,
  onExpand,
}: {
  producto: Producto
  onExpand: () => void
}) {
  const [slide, setSlide] = useState(0)
  const imagenes = [producto.imagen, producto.imagen2]
  const isLast = slide === imagenes.length - 1
  const touchStartX = useRef(0)

  function toggleSlide(e: React.MouseEvent) {
    e.stopPropagation()
    setSlide((prev) => (prev + 1) % imagenes.length)
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      // Swipe detectado — no abrir lightbox
      e.stopPropagation()
      if (diff > 0 && slide < imagenes.length - 1) setSlide(slide + 1)
      else if (diff < 0 && slide > 0) setSlide(slide - 1)
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-bg-card rounded-card shadow-sm overflow-hidden flex flex-col"
    >
      {/* Imagen — swipe cambia imagen, tap abre lightbox */}
      <div
        className="relative w-full cursor-pointer overflow-hidden"
        style={{ aspectRatio: '4 / 5' }}
        onClick={onExpand}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Transición entre imágenes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={imagenes[slide]}
              alt={producto.nombre}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Pill tag — bottom-left, solo desktop */}
        <div className="hidden md:flex absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-badge bg-white/90 backdrop-blur-sm">
          <span className="text-label font-medium text-brand-primary tracking-wide">
            {producto.tags}
          </span>
        </div>

        {/* Ícono expand — top-right */}
        <div className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
          <Maximize2 size={12} className="text-text-primary" />
        </div>

        {/* Flecha carrusel — center-right, solo desktop */}
        <button
          onClick={toggleSlide}
          aria-label={isLast ? 'Ver imagen anterior' : 'Ver siguiente imagen'}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
        >
          {isLast
            ? <ChevronLeft size={13} className="text-text-primary" />
            : <ChevronRight size={13} className="text-text-primary" />
          }
        </button>

        {/* Dots indicadores — bottom-right */}
        <div className="absolute bottom-3 right-3 z-10 flex gap-1">
          {imagenes.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
              style={{ background: i === slide ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.45)' }}
            />
          ))}
        </div>
      </div>

      {/* Info — título + CTA */}
      <div className="flex flex-col p-3 md:p-4 gap-2">
        {/* Título: base en móvil, h3 en desktop */}
        <h3 className="font-body font-bold text-text-primary text-base md:text-h3 leading-snug">{producto.nombre}</h3>
        <p className="hidden md:block text-small text-text-secondary leading-snug line-clamp-2">{producto.descripcion}</p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="mt-1 w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2.5 bg-brand-primary text-text-on-dark text-small font-medium rounded-btn hover:bg-brand-primary-light transition-colors whitespace-nowrap"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.533a.75.75 0 0 0 .92.92l5.671-1.475A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.183-1.432l-.371-.22-3.367.875.893-3.26-.242-.385A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          <span className="md:hidden">Consultar</span>
          <span className="hidden md:inline">Consultar existencia</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ── Componente principal ── */
export default function Productos() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<Producto | null>(null)

  return (
    <>
      <section id="productos" className="bg-bg section-padding">
        <div className="container-hubble">

          {/* Título — visible solo en mobile (desktop lo lleva el BannerProductos) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-6 md:hidden"
          >
            <p className="text-label text-text-secondary tracking-widest uppercase mb-2">
              — Productos de jardinería
            </p>
            <h2
              className="font-body font-bold text-text-primary"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', lineHeight: 1.1 }}
            >
              Nuestras plantas.
            </h2>
          </motion.div>

          {/* Barra superior */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          >
            <div className="flex items-start gap-2 text-small text-text-primary max-w-sm leading-relaxed">
              <MapPin size={13} className="mt-0.5 shrink-0 text-brand-primary" />
              <span>
                Envío gratis hasta 2 km de distancia. Mayor distancia a cotización según la cantidad de plantas.{' '}
                <a href="https://wa.me/523316038900" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-primary transition-colors">Contáctanos por WhatsApp</a>
              </span>
            </div>
            <motion.a
              href="#categorias"
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 bg-brand-primary text-text-on-dark text-small font-medium rounded-badge hover:bg-brand-primary-light transition-colors shrink-0"
            >
              Ver catálogo completo
              <ArrowRight size={14} />
            </motion.a>
          </motion.div>

          {/* Grid 4 cards */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {productos.map((p) => (
              <ProductCard
                key={p.id}
                producto={p}
                onExpand={() => setSelected(p)}
              />
            ))}
          </motion.div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox producto={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
