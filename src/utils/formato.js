
export const formatoPrecio = n => '$' + Number(n).toLocaleString('es-CL');

export const precioFinal = p => (p.oferta > 0 ? p.oferta : p.precio);

export const totalOrden = o => o.items.reduce((suma, i) => suma + i.precio * i.cantidad, 0);

export function desglosarIVA(total) {
  const neto = Math.round(total / 1.19);
  return { neto, iva: total - neto };
}

export function generarId(prefijo, lista, largo) {
  const mayor = Math.max(0, ...lista.map(x => parseInt(String(x.id).replace(prefijo, ''), 10) || 0));
  return prefijo + String(mayor + 1).padStart(largo, '0');
}

export const urlImagen = ruta => import.meta.env.BASE_URL + ruta;
