/**
 * images.ts — Registro central de imágenes del proyecto
 *
 * Flujo de trabajo:
 * 1. Sube imágenes con:  node scripts/upload-images.mjs ./tu-carpeta imagenes/seccion
 * 2. El script genera blob-manifest.json con las URLs
 * 3. Copia las URLs aquí en la sección correspondiente
 * 4. Usa las constantes en tus componentes: import { IMG } from '@/lib/images'
 *
 * Ejemplo de uso en un componente:
 *   import { IMG } from '@/lib/images'
 *   <Image src={IMG.home.portadaDesk} alt="Portada" fill />
 */

// ─── Imágenes actuales (migrar a Blob cuando estén subidas) ──────────────────
// Por ahora usan rutas locales de /public. Una vez que corras el script,
// reemplaza "/imagenes/..." por la URL de Blob correspondiente.

export const IMG = {
  home: {
    portadaDesk:       'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/portada_desk.png',
    bannerProductos:   'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/banner_productos_desk.png',
    categorias:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/categorias.png',
    gallery:           'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/gallery.jpg',
    paisajismo:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/paisajismo.jpg',
    logo:              'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/logo.png',
    planta01:          'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/planta_01.png',
    planta01_2:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/planta_01_2.png',
    planta02:          'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/planta_02.png',
    planta02_2:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/planta_02_2.png',
    planta03:          'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/planta_03.png',
    planta03_2:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/planta_03_2.png',
    planta04:          'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/planta_04.png',
    planta04_2:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/home/planta_04_2.png',
  },

  productos: {
    afelandra:              'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Afelandra.webp',
    afelandra_2:            'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Afelandra_2.webp',
    albaca:                 'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Albaca.webp',
    albaca_2:               'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Albaca_2.webp',
    alternanthera:          'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Alternanthera.webp',
    alternanthera_2:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Alternanthera_2.webp',
    anturio:                'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Anturio.webp',
    anturio_2:              'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Anturio_2.webp',
    arbol_de_la_abundancia:   'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Arbol_de_la_abundancia.webp',
    arbol_de_la_abundancia_2: 'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Arbol_de_la_abundancia_2.webp',
    belen:                  'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Belen.webp',
    belen_2:                'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Belen_2.webp',
    bugambilia:             'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Bugambilia.webp',
    bugambilia_2:           'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Bugambilia_2.webp',
    buxo_sencillo:          'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Buxo_Sencillo.webp',
    buxo_sencillo_2:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Buxo_Sencillo_2.webp',
    calathea:               'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Calathea.webp',
    calathea_2:             'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Calathea_2.webp',
    cedro_limon:            'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Cedro_limon.webp',
    cedro_limon_2:          'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Cedro_limon_2.webp',
    citronela:              'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Citronela.webp',
    citronela_2:            'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Citronela_2.webp',
    coleo:                  'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Coleo.webp',
    coleo_2:                'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Coleo_2.webp',
    cuna_de_moises:         'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Cuna_de_moises.webp',
    cuna_de_moises_2:       'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Cuna_de_moises_2.webp',
    cyclamen:               'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Cyclamen.webp',
    cyclamen_2:             'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Cyclamen_2.webp',
    diplademia:             'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Diplademia.webp',
    diplademia_2:           'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Diplademia_2.webp',
    duranta_cuba:           'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Duranta_Cuba.webp',
    duranta_cuba_2:         'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Duranta_Cuba_2.webp',
    duranta_golden:         'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Duranta_Golden.webp',
    duranta_golden_2:       'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Duranta_Golden_2.webp',
    ficus_pandurata:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Ficus_Pandurata.webp',
    ficus_pandurata_2:      'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Ficus_Pandurata_2.webp',
    hule:                   'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Hule.webp',
    hule_2:                 'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Hule_2.webp',
    kalancho:               'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Kalancho.webp',
    kalancho_2:             'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Kalancho_2.webp',
    lavanda:                'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Lavanda.webp',
    lengua_de_suegra:       'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Lengua_de_suegra.webp',
    lengua_de_suegra_2:     'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Lengua_de_suegra_2.webp',
    malva:                  'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Malva.webp',
    malva_2:                'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Malva_2.webp',
    menta:                  'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Menta.webp',
    menta_2:                'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Menta_2.webp',
    palma_camedor:          'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Palma_Camedor.webp',
    palma_camedor_2:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Palma_Camedor_2.webp',
    palo_de_brasil:         'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Palo_de_brasil.webp',
    palo_de_brasil_2:       'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Palo_de_brasil_2.webp',
    romero:                 'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Romero.webp',
    romero_2:               'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Romero_2.webp',
    salvia_azul:            'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Salvia_azul.webp',
    salvia_azul_2:          'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Salvia_azul_2.webp',
    teresita:               'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Teresita.webp',
    teresita_2:             'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Teresita_2.webp',
    trueno_de_venus:        'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Trueno_de_Venus.webp',
    trueno_de_venus_2:      'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Trueno_de_Venus_2.webp',
    violeta_africana:       'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Violeta_africana.webp',
    violeta_africana_2:     'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Violeta_africana_2.webp',
    zamioculca:             'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Zamioculca.webp',
    zamioculca_2:           'https://u8h4pffmczhmgm4b.public.blob.vercel-storage.com/imagenes/productos/Zamioculca_2.webp',
  },

  // ─── Cuando subas el lote de 200, agrega las secciones aquí ───────────────
  // Ejemplo (pegar URLs del blob-manifest.json):
  //
  // productos: {
  //   rosa_roja:   'https://xxxx.public.blob.vercel-storage.com/imagenes/productos/rosa_roja.jpg',
  //   bugambilia:  'https://xxxx.public.blob.vercel-storage.com/imagenes/productos/bugambilia.jpg',
  //   // ... etc
  // },
  //
  // paisajismo: {
  //   proyecto_01: 'https://xxxx.public.blob.vercel-storage.com/imagenes/paisajismo/proyecto_01.jpg',
  // },
} as const;

export type ImageKey = keyof typeof IMG;
