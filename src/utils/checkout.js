import { REGIONES, comunasDe } from '../data/regiones';
import { precioFinal } from './formato';

export const normalizar = texto =>
  String(texto ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

export const lineasDelCarrito = (carrito, productos) =>
  carrito
    .map(item => ({ ...item, producto: productos.find(p => p.id === item.id) }))
    .filter(linea => linea.producto);

export const totalLineas = lineas => lineas.reduce((suma, l) => suma + precioFinal(l.producto) * l.cantidad, 0);
export const totalCarrito = (carrito, productos) => totalLineas(lineasDelCarrito(carrito, productos));
export const lineasSinStock = lineas => lineas.filter(l => l.cantidad > l.producto.stock);

export const DATOS_VACIOS = {
  nombre: '', apellidos: '', correo: '', calle: '', departamento: '', region: '', comuna: '', indicaciones: '',
};

export function datosDesdeUsuario(usuario) {
  if (!usuario) return { ...DATOS_VACIOS };
  const [nombre = '', ...resto] = String(usuario.nombre_completo ?? '').trim().split(/\s+/);
  const region = REGIONES.find(r => normalizar(r.id) === normalizar(usuario.region))?.id ?? '';
  const comuna = comunasDe(region).find(c => normalizar(c) === normalizar(usuario.comuna)) ?? '';
  return { ...DATOS_VACIOS, nombre, apellidos: resto.join(' '), correo: usuario.correo ?? '', region, comuna };
}

export function validarCheckout(d) {
  const errores = {};
  if (!d.nombre.trim()) errores.nombre = 'Ingresa tu nombre.';
  if (!d.apellidos.trim()) errores.apellidos = 'Ingresa tus apellidos.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.correo.trim())) errores.correo = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.';
  if (d.calle.trim().length < 3) errores.calle = 'Ingresa la calle y el número.';
  if (!d.region) errores.region = 'Selecciona una región.';
  if (!d.comuna) errores.comuna = 'Selecciona una comuna.';
  return errores;
}

export function construirOrden({ id, sesion, datos, lineas, fecha = new Date().toISOString().slice(0, 10) }) {
  return {
    id,
    usuario: sesion ? sesion.id : 'INVITADO',
    fecha,
    estado: 'pagada',
    cliente: { nombre: datos.nombre.trim(), apellidos: datos.apellidos.trim(), correo: datos.correo.trim() },
    direccion: {
      calle: datos.calle.trim(),
      departamento: datos.departamento.trim(),
      region: datos.region,
      comuna: datos.comuna,
      indicaciones: datos.indicaciones.trim(),
    },
    items: lineas.map(l => ({ id: l.id, cantidad: l.cantidad, precio: precioFinal(l.producto) })),
  };
}

export const descontarStock = (productos, lineas) =>
  productos.map(p => {
    const linea = lineas.find(l => l.id === p.id);
    return linea ? { ...p, stock: Math.max(0, p.stock - linea.cantidad) } : p;
  });

const CLAVE_INTENTO = 'checkout';

export function guardarIntento(intento) {
  try {
    window.sessionStorage.setItem(CLAVE_INTENTO, JSON.stringify(intento));
  } catch (error) {
    console.error('No se pudo guardar el intento de pago', error);
  }
}

export function leerIntento() {
  try {
    return JSON.parse(window.sessionStorage.getItem(CLAVE_INTENTO));
  } catch {
    return null;
  }
}

export function limpiarIntento() {
  try {
    window.sessionStorage.removeItem(CLAVE_INTENTO);
  } catch {}
}
