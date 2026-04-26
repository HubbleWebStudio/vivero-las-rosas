/**
 * productos-data.ts — Fuente única de verdad para el catálogo de plantas
 *
 * Importar en componentes y páginas:
 *   import { productos, CATEGORIAS_META, type Producto, type CategoriaSlug } from '@/lib/productos-data'
 */

import { IMG } from '@/lib/images'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type InfoSeccion  = { titulo: string; items: string[] }
export type ProductoInfo = { intro: string; secciones: InfoSeccion[] }

export type CategoriaSlug = 'exterior' | 'interior' | 'sol' | 'sombra' | 'semisombra'

export type Producto = {
  id: number
  nombre: string
  tags: string
  descripcion: string
  imagen: string
  imagen2: string
  categorias: CategoriaSlug[]
  info?: ProductoInfo
}

// ─── Metadata de las 5 categorías botánicas ───────────────────────────────────

export const CATEGORIAS_META: Record<CategoriaSlug, {
  slug: CategoriaSlug
  titulo: string
  descripcion: string
  imagen: string
}> = {
  exterior: {
    slug: 'exterior',
    titulo: 'Exterior',
    descripcion: 'Variedades resistentes para jardines y zonas exteriores. Tolerantes al clima y de fácil mantenimiento.',
    imagen: IMG.productos.bugambilia,
  },
  interior: {
    slug: 'interior',
    titulo: 'Interior',
    descripcion: 'Plantas ornamentales para espacios interiores. Purifican el aire y aportan vida a cualquier ambiente.',
    imagen: IMG.productos.ficus_pandurata,
  },
  sol: {
    slug: 'sol',
    titulo: 'Sol',
    descripcion: 'Especies que prosperan con exposición solar directa. Perfectas para jardines, terrazas y exteriores abiertos.',
    imagen: IMG.productos.salvia_azul,
  },
  sombra: {
    slug: 'sombra',
    titulo: 'Sombra',
    descripcion: 'Plantas adaptadas a espacios con poca luz directa. Ideales para interiores oscuros y jardines bajo árboles.',
    imagen: IMG.productos.calathea,
  },
  semisombra: {
    slug: 'semisombra',
    titulo: 'Semisombra',
    descripcion: 'Especies que se adaptan a luz indirecta o filtrada. Perfectas para espacios con sol parcial durante el día.',
    imagen: IMG.productos.afelandra,
  },
}

// ─── Catálogo de 32 plantas ───────────────────────────────────────────────────

export const productos: Producto[] = [

  // ── Fila 1 · CÁLIDA ──────────────────────────────────────────────────────────
  {
    id: 1,
    nombre: 'Afelandra',
    tags: 'Interior · Decorativa',
    descripcion: 'Follaje exótico con venas plateadas y espigas amarillas.',
    imagen: IMG.productos.afelandra,
    imagen2: IMG.productos.afelandra_2,
    categorias: ['interior', 'semisombra'],
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
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'La Bugambilia es una de las enredaderas más espectaculares del mundo tropical, famosa por sus brácteas fucsia, moradas y rojas que cubren paredes y rejas durante meses. Símbolo de los jardines mexicanos.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de Brasil y América del Sur tropical',
            'Pertenece a la familia Nyctaginaceae',
            'Introducida a Europa en el siglo XVIII por el explorador Louis de Bougainville',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Plena exposición solar — sin sol no florece con intensidad',
            'Riego moderado; tolera sequías una vez establecida',
            'Poda tras cada floración para estimular nueva brotación',
            'Fertiliza con potasio en primavera para más flores',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Sus "flores" son brácteas; las flores verdaderas son pequeñas y blancas',
            'Espinas filosas — manipular con guantes',
            'Florece casi todo el año en climas cálidos',
          ],
        },
      ],
    },
  },
  {
    id: 3,
    nombre: 'Árbol de la Abundancia',
    tags: 'Interior · Decorativa',
    descripcion: 'Tronco trenzado símbolo de prosperidad y buena suerte.',
    imagen: IMG.productos.arbol_de_la_abundancia,
    imagen2: IMG.productos.arbol_de_la_abundancia_2,
    categorias: ['interior', 'semisombra'],
    info: {
      intro: 'El Árbol de la Abundancia, con su característico tronco trenzado y follaje verde brillante, es símbolo de prosperidad en la cultura feng shui. Transforma cualquier rincón interior en un espacio de energía positiva.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de los humedales tropicales de México y América Central',
            'Conocido científicamente como Pachira aquatica o Money Tree',
            'Popularizado como amuleto de la suerte en Asia desde los años ochenta',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante indirecta; evitar el sol directo',
            'Riego moderado — dejar que el sustrato se seque entre riegos',
            'Ambiente con humedad moderada',
            'Abona mensualmente en primavera y verano',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'El tronco trenzado se logra entrelazando tallos jóvenes',
            'Puede alcanzar varios metros en exteriores cálidos',
            'Tóxico para perros y gatos en grandes cantidades',
          ],
        },
      ],
    },
  },
  {
    id: 4,
    nombre: 'Kalancho',
    tags: 'Interior · Suculenta',
    descripcion: 'Suculenta florida en colores vivos, muy fácil de cuidar.',
    imagen: IMG.productos.kalancho,
    imagen2: IMG.productos.kalancho_2,
    categorias: ['interior', 'sol', 'semisombra'],
    info: {
      intro: 'El Kalancho es una suculenta tropical que sorprende con racimos de flores en rojo, naranja, amarillo o rosa durante semanas. Fácil de cuidar y muy resistente, es perfecta para regalar o decorar interiores luminosos.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de Madagascar, isla volcánica al este de África',
            'Familia Crassulaceae; pariente del crasuláceo y la planta jade',
            'Hibridado desde el siglo XX para ampliar su paleta de colores',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante; soporta sol suave de mañana',
            'Riego muy escaso — es suculenta que acumula agua en sus hojas',
            'No rocíes las hojas para evitar pudrición',
            'Temperatura entre 10 °C y 25 °C',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Florece más cuando recibe noches largas (fotoperiodo corto)',
            'Tóxico para mascotas — contiene bufadienólidos',
            'Poda leve tras la floración estimula una nueva tanda de flores',
          ],
        },
      ],
    },
  },

  // ── Fila 2 · FRÍA ────────────────────────────────────────────────────────────
  {
    id: 5,
    nombre: 'Alternanthera',
    tags: 'Exterior · Jardín',
    descripcion: 'Follaje colorido perfecto para bordes y macizos.',
    imagen: IMG.productos.alternanthera,
    imagen2: IMG.productos.alternanthera_2,
    categorias: ['exterior', 'sol', 'semisombra'],
    info: {
      intro: 'La Alternanthera, también llamada Periquito, es una planta tapizante de bajo porte con follaje multicolor en rojos, púrpuras y verdes. Crea alfombras de color vibrante en jardines y macizos.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de América tropical (Brasil y Argentina)',
            'Familia Amaranthaceae, muy usada en jardines formales por su follaje coloreado',
            'Existen más de 200 variedades con distintas tonalidades de follaje',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol para colores más intensos; semisombra los suaviza',
            'Riego regular — no tolera períodos largos de sequía',
            'Poda frecuente para mantener forma compacta y estimular follaje nuevo',
            'Abona mensualmente en temporada de crecimiento',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Sus colores se intensifican con mayor exposición solar',
            'Excelente para borduras y alfombras en jardines formales',
            'No resiste las heladas; reponer en primavera si es necesario',
          ],
        },
      ],
    },
  },
  {
    id: 6,
    nombre: 'Calathea',
    tags: 'Interior · Tropical',
    descripcion: 'Hojas pintadas con patrones únicos, ideal para sombra.',
    imagen: IMG.productos.calathea,
    imagen2: IMG.productos.calathea_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'La Calathea, conocida como la "planta de la oración", cierra sus hojas al anochecer en un movimiento diurno fascinante. Sus patrones únicos de rayas y manchas la convierten en una obra de arte viva.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de las selvas tropicales de América del Sur',
            'Familia Marantaceae con más de 300 especies conocidas',
            'Su movimiento diurno se debe a órganos llamados pulvinos en la base del pecíolo',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz indirecta o sombra — el sol directo quema sus hojas',
            'Riego frecuente con agua sin cloro o reposada; sensible a sales',
            'Humedad ambiental alta — ideal nebulizar o usar bandeja con agua',
            'Temperatura constante entre 18 °C y 27 °C',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Las puntas se secan si el agua contiene cloro o flúor en exceso',
            'No tolera corrientes de aire frío',
            'No tóxica para mascotas — excelente opción en hogares con animales',
          ],
        },
      ],
    },
  },
  {
    id: 7,
    nombre: 'Anturio',
    tags: 'Interior · Tropical',
    descripcion: 'Flores lacadas en rojo intenso, ideal para interiores.',
    imagen: IMG.productos.anturio,
    imagen2: IMG.productos.anturio_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'El Anturio es una de las plantas de interior más elegantes, reconocido por sus espatas lacadas en rojo intenso que parecen de plástico. En condiciones adecuadas puede florecer casi todo el año.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de las selvas tropicales de Colombia y Ecuador',
            'Familia Araceae; pariente del spathiphyllum y la filodendro',
            'Descubierto en el siglo XIX y rápidamente adoptado como ornamental global',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante indirecta; sin sol directo',
            'Riego moderado — dejar secar la capa superficial entre riegos',
            'Alta humedad — nebuliza el ambiente o usa bandeja con grava húmeda',
            'Temperatura entre 16 °C y 25 °C',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'La "flor" es una espata modificada; la flor verdadera es el espádice central',
            'Tóxico para personas y mascotas si se ingiere',
            'Prefiere macetas pequeñas — sus raíces se sienten bien en espacios ajustados',
          ],
        },
      ],
    },
  },
  {
    id: 8,
    nombre: 'Ficus Pandurata',
    tags: 'Interior · Tropical',
    descripcion: 'Hojas grandes en forma de violín, tendencia en diseño.',
    imagen: IMG.productos.ficus_pandurata,
    imagen2: IMG.productos.ficus_pandurata_2,
    categorias: ['interior', 'semisombra'],
    info: {
      intro: 'El Ficus Pandurata o Ficus de hoja de violín es la planta tendencia en el diseño de interiores contemporáneo. Sus enormes hojas brillantes en forma de violín crean un impacto visual único en cualquier espacio.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de las selvas tropicales de África occidental',
            'Familia Moraceae; pariente del higo y la higuera',
            'Popularizado globalmente en los años 2010 como símbolo del diseño nórdico-tropical',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante indirecta; puede tolerar algo de sol de mañana',
            'Riego moderado — esperar a que los primeros centímetros de tierra estén secos',
            'Limpiar hojas con paño húmedo para maximizar la fotosíntesis',
            'No mover con frecuencia — el cambio de ubicación lo estresa',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Pierde hojas al cambiar de ubicación; dale tiempo para adaptarse',
            'Contiene látex que puede irritar la piel y es tóxico para mascotas',
            'Puede crecer hasta 3 metros en interiores bien iluminados',
          ],
        },
      ],
    },
  },

  // ── Fila 3 · AROMÁTICAS ───────────────────────────────────────────────────────
  {
    id: 9,
    nombre: 'Albaca',
    tags: 'Aromática · Exterior',
    descripcion: 'Hierba aromática ideal para cocina y jardines.',
    imagen: IMG.productos.albaca,
    imagen2: IMG.productos.albaca_2,
    categorias: ['exterior', 'sol', 'semisombra'],
    info: {
      intro: 'La Albahaca es la reina de las aromáticas mediterráneas: indispensable en la cocina y deliciosa en balcones y jardines. Sus hojas perfumadas y sus flores blancas la hacen tan útil como ornamental.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de India y regiones tropicales de Asia',
            'Familia Lamiaceae; pariente de la menta y el romero',
            'Cultivada por el ser humano desde hace más de 5 000 años',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol o semisombra luminosa',
            'Riego regular — mantener tierra húmeda con buen drenaje',
            'Eliminar las flores para prolongar la calidad aromática de las hojas',
            'Temperatura mínima de 10 °C; sensible al frío',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Sus hojas son más aromáticas antes de que florezca',
            'Al florecer, el sabor se vuelve más amargo',
            'Excelente compañera de cultivo para jitomates y pimientos',
          ],
        },
      ],
    },
  },
  {
    id: 10,
    nombre: 'Cedro Limón',
    tags: 'Aromática · Exterior',
    descripcion: 'Árbol aromático con fragancia cítrica intensa.',
    imagen: IMG.productos.cedro_limon,
    imagen2: IMG.productos.cedro_limon_2,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'El Cedro Limón, conocido también como Hierba Luisa, es un arbusto aromático de fragancia cítrica fresca e intensa. Muy apreciado en infusiones, cocteles y como repelente natural de insectos.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de Sudamérica (Argentina, Chile y Perú)',
            'Introducido en Europa por exploradores españoles en el siglo XVII',
            'Familia Verbenaceae; conocido científicamente como Aloysia citrodora',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Plena exposición solar para mayor intensidad aromática',
            'Riego moderado; tolera períodos de sequía breves',
            'Poda al final del invierno para estimular nuevo crecimiento',
            'Resiste el frío moderado pero no heladas prolongadas',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Sus hojas frescas o secas son ideales para infusiones digestivas y relajantes',
            'Excelente repelente natural de mosquitos e insectos',
            'Puede crecer como arbusto de hasta 3 metros sin poda',
          ],
        },
      ],
    },
  },
  {
    id: 11,
    nombre: 'Citronela',
    tags: 'Aromática · Exterior',
    descripcion: 'Repelente natural de mosquitos con aroma a limón.',
    imagen: IMG.productos.citronela,
    imagen2: IMG.productos.citronela_2,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'La Citronela es la famosa planta repelente de mosquitos con inconfundible aroma a limón fresco. Su presencia en terrazas y jardines crea una barrera aromática natural muy efectiva.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa del sur de Asia (Sri Lanka e India)',
            'Familia Poaceae (gramíneas), usada en aromaterapia desde hace siglos',
            'El aceite esencial de citronela es uno de los repelentes de insectos más conocidos del mundo',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol directo para máxima producción de aceites esenciales',
            'Riego moderado; tolera períodos de sequía breves',
            'Puede crecer hasta 1.5 m; pódala para mantener la forma',
            'Temperatura mínima de 10 °C',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Frotar las hojas libera el aroma repelente activo',
            'Puede usarse en infusiones y platos asiáticos',
            'En interiores pierde efectividad como repelente por falta de luz directa',
          ],
        },
      ],
    },
  },
  {
    id: 12,
    nombre: 'Menta',
    tags: 'Aromática · Exterior',
    descripcion: 'Hierba fresca y aromática perfecta para infusiones.',
    imagen: IMG.productos.menta,
    imagen2: IMG.productos.menta_2,
    categorias: ['exterior', 'sol', 'semisombra'],
    info: {
      intro: 'La Menta es una de las plantas aromáticas más versátiles del mundo: desde el mojito hasta la medicina natural. Su crecimiento vigoroso y su aroma refrescante la hacen imprescindible en cualquier jardín o balcón.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Híbrido natural entre Mentha aquatica y Mentha spicata',
            'Familia Lamiaceae; conocida y cultivada desde la antigüedad',
            'Su uso medicinal y culinario se remonta a más de 2 000 años en el Mediterráneo',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Semisombra o sol suave; el sol intenso reseca las hojas',
            'Riego abundante — le gusta la tierra húmeda',
            'Mejor en maceta para controlar su expansión',
            'Cosechar antes de que florezca para mejor sabor y aroma',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Es invasiva en jardines — sus raíces se extienden muy rápido',
            'Excelente repelente natural de hormigas y pulgones',
            'No tóxica para humanos; el aceite puro puede irritar piel delicada',
          ],
        },
      ],
    },
  },

  // ── Fila 4 · FLORES CÁLIDAS ───────────────────────────────────────────────────
  {
    id: 13,
    nombre: 'Belén',
    tags: 'Exterior · Colgante',
    descripcion: 'Cascadas de flores en colores vivos todo el año.',
    imagen: IMG.productos.belen,
    imagen2: IMG.productos.belen_2,
    categorias: ['exterior', 'semisombra', 'sombra'],
    info: {
      intro: 'El Belén, llamado también Alegría del hogar, produce flores abundantes y coloridas prácticamente todo el año. Es ideal para macetas colgantes y rincones con poca luz directa donde otros colores no llegan.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de Tanzania y Mozambique en África oriental',
            'Familia Balsaminaceae, con más de 1 000 especies en el mundo',
            'Popular globalmente como planta de temporada para macetas y jardines sombreados',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz indirecta brillante o semisombra — el sol directo quema las flores',
            'Riego regular; mantener tierra húmeda con buen drenaje',
            'Alta humedad favorece la floración continua',
            'Pellizca los brotes para promover ramificación y más flores',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Florece de primavera a otoño; descansa en invierno',
            'Sensible a temperaturas bajo 10 °C',
            'Elimina las flores marchitas para estimular nueva floración',
          ],
        },
      ],
    },
  },
  {
    id: 14,
    nombre: 'Coleo',
    tags: 'Exterior · Decorativa',
    descripcion: 'Follaje multicolor en rojos, verdes y amarillos.',
    imagen: IMG.productos.coleo,
    imagen2: IMG.productos.coleo_2,
    categorias: ['exterior', 'semisombra'],
    info: {
      intro: 'El Coleo es un arbusto de follaje multicolor en rojos, verdes, dorados y chocolates que cambia de intensidad según la luz. Su paleta cromática lo convierte en uno de los mejores contrastes del jardín.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo del sudeste asiático (Java, Indonesia)',
            'Familia Lamiaceae; pariente del romero y la albahaca',
            'Los híbridos modernos fueron desarrollados principalmente en los siglos XIX y XX',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Semisombra o luz filtrada — el sol intenso puede quemar las hojas más claras',
            'Riego regular; tierra húmeda sin encharcamiento',
            'Pellizca los brotes apicales para mayor ramificación y follaje más denso',
            'Abona mensualmente en primavera y verano',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Los colores son más vivos con buena iluminación sin sol directo',
            'Las flores son pequeñas y moradas; conviene eliminarlas para destacar el follaje',
            'No resiste heladas',
          ],
        },
      ],
    },
  },
  {
    id: 15,
    nombre: 'Cyclamen',
    tags: 'Interior · Flor',
    descripcion: 'Flores elegantes en rosa y blanco, ideal para invierno.',
    imagen: IMG.productos.cyclamen,
    imagen2: IMG.productos.cyclamen_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'El Cyclamen es una de las flores de invierno más elegantes y sofisticadas. Sus pétalos enrollados hacia atrás en rosa, blanco o fucsia emergen entre hojas marmoleadas de plata en los meses más fríos.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo del Mediterráneo y Oriente Medio',
            'Familia Primulaceae, con unas 20 especies silvestres en la naturaleza',
            'Cultivado ornamentalmente desde el siglo XVI en toda Europa',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante indirecta; sin sol directo que queme las flores',
            'Riego por el platillo — nunca mojar el tubérculo ni el centro',
            'Temperatura fresca entre 10 °C y 18 °C; el calor lo hace dormir',
            'Abona con fertilizante bajo en nitrógeno durante la floración',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Entra en dormancia en verano; reducir riego hasta que rebrote en otoño',
            'Tóxico para mascotas y humanos si se ingiere',
            'El frío suave (sin heladas) prolonga la floración varios meses',
          ],
        },
      ],
    },
  },
  {
    id: 16,
    nombre: 'Diplademia',
    tags: 'Exterior · Trepadora',
    descripcion: 'Flores trompeta en rosa vibrante todo el verano.',
    imagen: IMG.productos.diplademia,
    imagen2: IMG.productos.diplademia_2,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'La Diplademia es una trepadora de flores trompeta en rosa vibrante que conquista muros, rejas y pérgolas durante todo el verano. Su floración exuberante y su facilidad de cultivo la hacen muy popular en terrazas.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de Brasil y América del Sur tropical',
            'Familia Apocynaceae; pariente de la adelfa y la vinca',
            'Hibridada para crear flores más grandes y colores más variados',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol para máxima floración',
            'Riego regular en verano; reducir en invierno',
            'Necesita soporte o tutor para trepar',
            'Poda al final del invierno para estimular nueva brotación',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Florece desde primavera hasta el primer frío del otoño',
            'El látex que exuda puede irritar la piel y es tóxico si se ingiere',
            'En climas templados puede rebrotar desde la raíz tras el invierno',
          ],
        },
      ],
    },
  },

  // ── Fila 5 · FOLLAJE OSCURO ───────────────────────────────────────────────────
  {
    id: 17,
    nombre: 'Buxo Sencillo',
    tags: 'Exterior · Jardín',
    descripcion: 'Arbusto compacto, perfecto para topiaria y setos.',
    imagen: IMG.productos.buxo_sencillo,
    imagen2: IMG.productos.buxo_sencillo_2,
    categorias: ['exterior', 'sol', 'semisombra'],
    info: {
      intro: 'El Buxo es el arbusto clásico del jardín formal europeo: perfectamente adaptable a cualquier forma de topiaria. Su densidad de hoja perenne lo hace imprescindible para setos, borduras y figuras geométricas.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo del Mediterráneo, Europa y norte de África',
            'Familia Buxaceae, usado en jardines formales durante más de 2 000 años',
            'Los jardines romanos, renacentistas y barrocos lo emplearon para crear setos',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Sol pleno o semisombra — muy adaptable en cuanto a luz',
            'Riego moderado; establecido, tolera bien la sequía',
            'Poda frecuente para dar forma; responde muy bien a recortes periódicos',
            'Vigila la polilla del boj en primavera',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Tóxico para personas y animales si se ingiere',
            'En setos, la poda frecuente es clave para mantener densidad y forma',
            'Crecimiento lento pero muy longevo en jardines bien mantenidos',
          ],
        },
      ],
    },
  },
  {
    id: 18,
    nombre: 'Cuna de Moisés',
    tags: 'Interior · Decorativa',
    descripcion: 'Hojas bicolor que crean un efecto visual dramático.',
    imagen: IMG.productos.cuna_de_moises,
    imagen2: IMG.productos.cuna_de_moises_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'La Cuna de Moisés destaca por su dramático follaje bicolor: verde brillante en el haz y púrpura intenso en el envés. Su contraste cromático la convierte en una de las plantas de interior más decorativas.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de México y Guatemala',
            'Familia Commelinaceae; también conocida como Rhoeo spathacea',
            'Muy cultivada en jardines tropicales y subtropicales de toda América',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante indirecta o semisombra — el sol directo agota su color',
            'Riego moderado; dejar que la capa superficial se seque entre riegos',
            'Alta humedad favorece su crecimiento y brillo',
            'Abona mensualmente en primavera y verano',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'La savia puede causar irritación en piel sensible',
            'Tóxica para perros y gatos',
            'Sus pequeñas flores blancas aparecen en "barcas" entre las hojas basales',
          ],
        },
      ],
    },
  },
  {
    id: 19,
    nombre: 'Hule',
    tags: 'Interior · Tropical',
    descripcion: 'Hojas grandes y brillantes, fácil cuidado en interior.',
    imagen: IMG.productos.hule,
    imagen2: IMG.productos.hule_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'El Hule o Ficus Elastica es una planta de gran porte con hojas grandes, ovaladas y brillantes que aporta un toque tropical imponente a cualquier interior. Purifica el aire y crece con mínimo cuidado.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de India, Nepal y el sudeste asiático',
            'Familia Moraceae; misma familia del Ficus lyrata y la higuera',
            'Fue una de las principales fuentes de caucho natural antes del siglo XIX',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante indirecta; tolera semisombra mejor que el Ficus lyrata',
            'Riego moderado; dejar secar 2-3 cm de tierra entre riegos',
            'Limpiar las hojas con paño húmedo para brillarlas',
            'Sensible a los cambios bruscos de ubicación',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'El látex blanco que exuda puede causar dermatitis',
            'Tóxico para perros y gatos',
            'Puede crecer varios metros en interiores bien iluminados',
          ],
        },
      ],
    },
  },
  {
    id: 20,
    nombre: 'Lengua de Suegra',
    tags: 'Interior · Suculenta',
    descripcion: 'Suculenta vertical de bajo mantenimiento y gran aguante.',
    imagen: IMG.productos.lengua_de_suegra,
    imagen2: IMG.productos.lengua_de_suegra_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'La Lengua de Suegra es quizás la planta de interior más resistente del mundo. Prospera con poca luz, poca agua y poco cuidado, siendo la opción perfecta para principiantes o espacios con escasa luminosidad.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de África tropical occidental (Nigeria y Congo)',
            'Familia Asparagaceae; rebautizada como Dracaena trifasciata',
            'Seleccionada por la NASA como una de las mejores plantas purificadoras del aire',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Tolera desde plena sombra hasta sol suave — muy adaptable',
            'Riego muy escaso; dejar que la tierra se seque completamente entre riegos',
            'Evitar encharcamiento — es la principal causa de muerte',
            'Temperatura mínima de 10 °C',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Purifica el aire eliminando benceno y formaldehído',
            'Tóxica para perros y gatos si se ingiere',
            'Puede sobrevivir semanas sin riego sin ningún daño',
          ],
        },
      ],
    },
  },

  // ── Fila 6 · MORADOS Y DORADOS ────────────────────────────────────────────────
  {
    id: 21,
    nombre: 'Duranta Cuba',
    tags: 'Exterior · Jardín',
    descripcion: 'Flores moradas en cascada y berries dorados.',
    imagen: IMG.productos.duranta_cuba,
    imagen2: IMG.productos.duranta_cuba_2,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'La Duranta Cuba es un arbusto de rápido crecimiento con flores lilas en racimos colgantes y vistosos berries dorados que maduran en otoño. Muy apreciada en setos y jardines formales de bajo mantenimiento.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de América tropical y el Caribe',
            'Familia Verbenaceae; cultivada en todo el mundo tropical como ornamental',
            'Existen variedades con flores desde blancas hasta morado intenso',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol para mayor floración y fructificación',
            'Riego moderado; tolerante a sequías una vez establecida',
            'Poda periódica para mantener forma — responde muy bien al recorte',
            'Abona en primavera para estimular el crecimiento',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Los berries dorados son tóxicos para humanos y mascotas',
            'Atrae mariposas y colibríes cuando está en flor',
            'Excelente para setos vivos y cercos decorativos',
          ],
        },
      ],
    },
  },
  {
    id: 22,
    nombre: 'Malva',
    tags: 'Exterior · Flor',
    descripcion: 'Flores en rosa y lila, atrae mariposas y polinizadores.',
    imagen: IMG.productos.malva,
    imagen2: IMG.productos.malva_2,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'La Malva es una planta florífera de gran elegancia natural con flores en tonos rosa y lila atravesadas por delicadas venas oscuras. Silvestre y generosa, atrae una amplia variedad de polinizadores.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Originaria del Mediterráneo y el suroeste de Asia',
            'Familia Malvaceae; familia que incluye el algodón y el cacao',
            'Usada desde la antigüedad en medicina natural por sus propiedades emolientes',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol, con tolerancia a semisombra ligera',
            'Riego moderado; tolera bien los períodos secos',
            'Escasa necesidad de fertilizante',
            'Puede alcanzar 1-2 metros de altura en condiciones óptimas',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Florece de primavera a otoño',
            'Todas sus partes son comestibles: flores, hojas y frutos',
            'Excelente planta nectárea para abejas y mariposas',
          ],
        },
      ],
    },
  },
  {
    id: 23,
    nombre: 'Duranta Golden',
    tags: 'Exterior · Jardín',
    descripcion: 'Follaje dorado brillante, ideal para setos decorativos.',
    imagen: IMG.productos.duranta_golden,
    imagen2: IMG.productos.duranta_golden_2,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'La Duranta Golden es una variedad de follaje dorado amarillo brillante que aporta luz y contraste a jardines y setos. Su crecimiento vigoroso y fácil mantenimiento la convierten en una de las favoritas en paisajismo.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Cultivar de Duranta erecta, originaria de América tropical',
            'Familia Verbenaceae; seleccionada por su follaje áureo',
            'Usada globalmente en jardines formales y diseño de paisajes contemporáneos',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol para mantener el color dorado intenso; la sombra lo vuelve verdoso',
            'Riego moderado; resistente una vez establecida',
            'Poda frecuente para mantener forma y estimular follaje nuevo',
            'Abona en primavera',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Su valor ornamental está en el follaje, no en la flor',
            'Sus berries, si los produce, son tóxicos',
            'Excelente para crear contraste cromático junto a plantas de follaje oscuro',
          ],
        },
      ],
    },
  },
  {
    id: 24,
    nombre: 'Violeta Africana',
    tags: 'Interior · Flor',
    descripcion: 'Flores aterciopeladas en violeta para escritorios.',
    imagen: IMG.productos.violeta_africana,
    imagen2: IMG.productos.violeta_africana_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'La Violeta Africana es la planta florífera de interior más popular del mundo. Sus flores aterciopeladas en violeta, azul, rosa y blanco florecen casi sin interrupción durante todo el año con muy poco esfuerzo.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de las montañas de Tanzania y Kenia en África oriental',
            'Familia Gesneriaceae; descubierta en el siglo XIX por el barón Walter von Saint Paul',
            'Actualmente existen más de 16 000 variedades registradas en el mundo',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante indirecta — el sol directo quema las hojas',
            'Riego por el platillo o la base; el agua en las hojas deja manchas permanentes',
            'Temperatura constante entre 18 °C y 24 °C; sensible a cambios bruscos',
            'Abona mensualmente con fertilizante para flores',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Las hojas vellosas NO deben mojarse — provocan manchas y pudrición',
            'No tóxica para mascotas ni humanos',
            'Repite la floración si se le da suficiente luz y se eliminan flores marchitas',
          ],
        },
      ],
    },
  },

  // ── Fila 7 · EXTERIORES AZULES Y BLANCOS ─────────────────────────────────────
  {
    id: 25,
    nombre: 'Lavanda',
    tags: 'Aromática · Exterior',
    descripcion: 'Aroma relajante y flores violetas que atraen abejas.',
    imagen: IMG.productos.lavanda,
    imagen2: IMG.productos.lavanda,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'La Lavanda es el símbolo por excelencia de la Provenza francesa. Su aroma calmante, sus espigas violeta y su resistencia al calor y la sequía la convierten en una planta imprescindible en terrazas y jardines soleados.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de la cuenca mediterránea, especialmente del sur de Francia y España',
            'Familia Lamiaceae; su nombre proviene del latín "lavare" (lavar)',
            'Cultivada comercialmente en Provenza desde el siglo XVII',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol — esencial para su floración y aroma intenso',
            'Riego escaso; planta mediterránea muy tolerante a la sequía',
            'Suelo bien drenado, incluso pobre; el exceso de nutrientes reduce el aroma',
            'Poda después de la floración para mantener forma compacta',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Sus flores secas mantienen el aroma durante meses o años',
            'Excelente repelente de polillas y mosquitos',
            'Múltiples usos en aromaterapia, cosmética y cocina',
          ],
        },
      ],
    },
  },
  {
    id: 26,
    nombre: 'Palo de Brasil',
    tags: 'Interior · Decorativa',
    descripcion: 'Troncos leñosos con follaje verde vibrante.',
    imagen: IMG.productos.palo_de_brasil,
    imagen2: IMG.productos.palo_de_brasil_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'El Palo de Brasil es una dracena de interior con troncos leñosos y follaje tropical verde vibrante que emerge en penacho. Su porte vertical y elegante encaja perfectamente en estilos modernos y minimalistas.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de África tropical (Guinea Ecuatorial y países vecinos)',
            'Familia Asparagaceae; conocido científicamente como Dracaena fragrans',
            'Muy cultivado en todo el mundo como planta de interior desde el siglo XIX',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz brillante indirecta; tolera semisombra',
            'Riego moderado; dejar secar los primeros centímetros entre riegos',
            'Sensible al flúor del agua del grifo — usar agua reposada',
            'Abona mensualmente en primavera y verano',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Tóxico para perros y gatos',
            'Purifica el aire eliminando formaldehído y tolueno',
            'En condiciones óptimas puede florecer con flores blancas muy perfumadas',
          ],
        },
      ],
    },
  },
  {
    id: 27,
    nombre: 'Salvia Azul',
    tags: 'Exterior · Aromática',
    descripcion: 'Flores azul violeta que atraen colibríes y abejas.',
    imagen: IMG.productos.salvia_azul,
    imagen2: IMG.productos.salvia_azul_2,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'La Salvia Azul es una planta florífera de exterior con espigas de flores azul-violeta que crean ondas de color en jardines. Muy atractiva para colibríes y mariposas, tiene una larga temporada de floración.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa del norte de México y sur de Estados Unidos',
            'Familia Lamiaceae, con más de 900 especies en el género Salvia',
            'Popularizada como planta de jardín en el siglo XX por su resistencia',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol para máxima floración',
            'Riego moderado; tolera sequías una vez establecida',
            'Poda de limpieza tras cada tanda de flores para estimular nuevas espigas',
            'Bien drenada; no tolera encharcamiento',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Florece de primavera a otoño en climas cálidos',
            'Sus flores son altamente nectaríferas para colibríes y abejas',
            'No confundir con Salvia officinalis (salvia de cocina)',
          ],
        },
      ],
    },
  },
  {
    id: 28,
    nombre: 'Teresita',
    tags: 'Exterior · Flor',
    descripcion: 'Flores pequeñas en cojín, muy resistente al sol.',
    imagen: IMG.productos.teresita,
    imagen2: IMG.productos.teresita_2,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'La Teresita es una planta rastrera cubierta de flores brillantes en rosa, rojo, amarillo y blanco. Ama el sol intenso y la sequía, perfecta para zonas áridas, macetas expuestas y jardines de bajo mantenimiento.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de Sudamérica (Argentina, Brasil y Uruguay)',
            'Familia Portulacaceae; pariente de la verdolaga',
            'Hibridada para crear flores más grandes y colores más variados en el siglo XX',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol absoluto — no funciona en sombra',
            'Riego muy escaso; suculenta que acumula agua en sus tallos',
            'Sustrato bien drenado; la arena mejora el drenaje',
            'No necesita fertilizante; el suelo pobre la hace florecer más',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Sus flores se cierran de noche y en días nublados',
            'Resiste el calor extremo y la sequía mejor que casi cualquier planta de flor',
            'Excelente para zonas de difícil riego o climas áridos',
          ],
        },
      ],
    },
  },

  // ── Fila 8 · VERDES FRESCOS ───────────────────────────────────────────────────
  {
    id: 29,
    nombre: 'Palma Camedor',
    tags: 'Interior · Tropical',
    descripcion: 'Palma elegante que purifica el aire del hogar.',
    imagen: IMG.productos.palma_camedor,
    imagen2: IMG.productos.palma_camedor_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'La Palma Camedor es una palmera de interior elegante y de bajo mantenimiento. Sus frondas arqueadas y su silueta tropical transforman cualquier rincón en un oasis verde con un toque exótico.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de las selvas húmedas de México y Guatemala',
            'Familia Arecaceae (palmeras); una de las pocas adaptadas a interiores con poca luz',
            'Llevada a Europa en el siglo XIX como planta exótica ornamental',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Luz indirecta brillante o semisombra; evitar sol directo',
            'Riego moderado; mantener tierra ligeramente húmeda en primavera-verano',
            'Nebuliza las frondas periódicamente para mantener humedad',
            'Fertiliza mensualmente de primavera a verano',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Una de las mejores purificadoras de aire según estudios NASA (elimina formaldehído y xileno)',
            'No tóxica para mascotas',
            'Crece lentamente; puede vivir décadas en la misma maceta',
          ],
        },
      ],
    },
  },
  {
    id: 30,
    nombre: 'Romero',
    tags: 'Aromática · Exterior',
    descripcion: 'Arbusto aromático versátil para cocina y jardines.',
    imagen: IMG.productos.romero,
    imagen2: IMG.productos.romero_2,
    categorias: ['exterior', 'sol'],
    info: {
      intro: 'El Romero es uno de los arbustos aromáticos mediterráneos más icónicos: versátil en cocina, hermoso en jardines y efectivo en medicina natural. Sus flores azul-lavanda y su aroma resinoso son inconfundibles.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de la cuenca mediterránea (España, Italia, Grecia)',
            'Familia Lamiaceae; pariente de la menta, la salvia y el tomillo',
            'Usado en gastronomía y medicina desde la antigua Grecia y Roma',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol — cuanto más luz, más intenso el aroma',
            'Riego muy escaso; tolera sequías prolongadas',
            'Suelo bien drenado; no tolera encharcamientos',
            'Poda después de la floración para mantener forma compacta',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Muy resistente a la sequía una vez establecido',
            'Sus ramas floridas atraen abejas y polinizadores',
            'Múltiples usos culinarios, medicinales y cosméticos',
          ],
        },
      ],
    },
  },
  {
    id: 31,
    nombre: 'Trueno de Venus',
    tags: 'Exterior · Jardín',
    descripcion: 'Follaje fino y flores blancas perfumadas en verano.',
    imagen: IMG.productos.trueno_de_venus,
    imagen2: IMG.productos.trueno_de_venus_2,
    categorias: ['exterior', 'sol', 'semisombra'],
    info: {
      intro: 'El Trueno de Venus es un árbol ornamental de follaje fino y brillante con racimos de flores blancas perfumadas en verano. Muy utilizado en jardines, calles y como seto alto por su crecimiento vigoroso.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativo de China, Japón y Corea',
            'Familia Oleaceae; familia del olivo y el jazmín',
            'Introducido en América y Europa como árbol ornamental urbano en el siglo XIX',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Pleno sol o semisombra — muy adaptable',
            'Riego moderado; resistente a la sequía una vez establecido',
            'Tolera suelos de diversa calidad',
            'Poda para controlar tamaño; responde muy bien al recorte',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Florece en verano con racimos blancos perfumados que atraen polinizadores',
            'Sus bayas negras son tóxicas para personas y animales',
            'Puede convertirse en especie invasora en algunas regiones',
          ],
        },
      ],
    },
  },
  {
    id: 32,
    nombre: 'Zamioculca',
    tags: 'Interior · Suculenta',
    descripcion: 'Resistente y elegante, prospera con poca luz y agua.',
    imagen: IMG.productos.zamioculca,
    imagen2: IMG.productos.zamioculca_2,
    categorias: ['interior', 'sombra', 'semisombra'],
    info: {
      intro: 'La Zamioculca es la planta de interior más elegante y resistente de las últimas décadas. Sus hojas oscuras y brillantes aportan elegancia minimalista con prácticamente cero mantenimiento.',
      secciones: [
        {
          titulo: 'Origen',
          items: [
            'Nativa de África oriental (Tanzania, Kenia y Zimbabwe)',
            'Familia Araceae; descubierta en los años 90 y popularizada globalmente',
            'Sobrevive en sequía extrema gracias a rizomas subterráneos que almacenan agua',
          ],
        },
        {
          titulo: 'Cuidados',
          items: [
            'Tolera desde sombra intensa hasta luz brillante indirecta',
            'Riego muy escaso; dejar que la tierra se seque completamente entre riegos',
            'No necesita humedad ambiental alta',
            'Fertiliza una o dos veces al año en primavera',
          ],
        },
        {
          titulo: 'Importante saber',
          items: [
            'Tóxica para personas y mascotas — sus hojas contienen oxalato de calcio',
            'Una de las mejores opciones para interiores con muy poca luz',
            'Sus hojas se limpian con paño húmedo para mantener el brillo',
          ],
        },
      ],
    },
  },
]
