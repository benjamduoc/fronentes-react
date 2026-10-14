export const REGIONES = [
  { id: 'arica y parinacota', nombre: 'Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'] },
  { id: 'tarapaca', nombre: 'Tarapacá', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica'] },
  { id: 'antofagasta', nombre: 'Antofagasta', comunas: ['Antofagasta', 'Calama', 'Mejillones', 'Tocopilla', 'San Pedro de Atacama'] },
  { id: 'atacama', nombre: 'Atacama', comunas: ['Copiapó', 'Caldera', 'Vallenar', 'Chañaral'] },
  { id: 'coquimbo', nombre: 'Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel', 'Vicuña'] },
  { id: 'valparaiso', nombre: 'Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Concón', 'Quilpué', 'Villa Alemana', 'San Antonio', 'Quillota', 'Los Andes', 'San Felipe'] },
  {
    id: 'metropolitana',
    nombre: 'Región Metropolitana de Santiago',
    comunas: [
      'Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí', 'Curacaví', 'El Bosque',
      'El Monte', 'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo', 'La Cisterna', 'La Florida',
      'La Granja', 'La Pintana', 'La Reina', 'Lampa', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul',
      'Maipú', 'María Pinto', 'Melipilla', 'Ñuñoa', 'Padre Hurtado', 'Paine', 'Pedro Aguirre Cerda', 'Peñaflor',
      'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel', 'Puente Alto', 'Quilicura', 'Quinta Normal', 'Recoleta',
      'Renca', 'San Bernardo', 'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón', 'Santiago',
      'Talagante', 'Tiltil', 'Vitacura',
    ],
  },
  { id: 'libertador bernardo', nombre: "Libertador General Bernardo O'Higgins", comunas: ['Rancagua', 'Machalí', 'San Fernando', 'Rengo', 'Santa Cruz', 'Pichilemu'] },
  { id: 'maule', nombre: 'Maule', comunas: ['Talca', 'Curicó', 'Linares', 'Cauquenes', 'Constitución'] },
  { id: 'ñuble', nombre: 'Ñuble', comunas: ['Chillán', 'Chillán Viejo', 'San Carlos', 'Bulnes', 'Quirihue'] },
  { id: 'biobio', nombre: 'Biobío', comunas: ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante', 'Los Ángeles', 'Coronel', 'Lota'] },
  { id: 'araucanía', nombre: 'La Araucanía', comunas: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón', 'Angol'] },
  { id: 'los rios', nombre: 'Los Ríos', comunas: ['Valdivia', 'La Unión', 'Río Bueno', 'Panguipulli'] },
  { id: 'los lagos', nombre: 'Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Castro', 'Puerto Varas', 'Ancud'] },
  { id: 'aisen', nombre: 'Aysén', comunas: ['Coyhaique', 'Puerto Aysén', 'Chile Chico'] },
  { id: 'magallanes', nombre: 'Magallanes y de la Antártica Chilena', comunas: ['Punta Arenas', 'Puerto Natales', 'Porvenir'] },
];

export const comunasDe = idRegion => REGIONES.find(r => r.id === idRegion)?.comunas ?? [];
export const nombreRegion = idRegion => REGIONES.find(r => r.id === idRegion)?.nombre ?? idRegion ?? '';
