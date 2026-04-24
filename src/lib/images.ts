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
