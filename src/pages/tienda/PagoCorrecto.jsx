import { Link, useParams } from 'react-router-dom';
import TablaProductosCompra from '../../components/TablaProductosCompra';
import { useDatos } from '../../context/DatosContext';
import { nombreRegion } from '../../data/regiones';
import { usePagina } from '../../hooks/usePagina';
import { formatoPrecio, totalOrden } from '../../utils/formato';

export default function PagoCorrecto() {
  usePagina('Pago correcto');
  const { id } = useParams();
  const { ordenes, productos } = useDatos();
  const orden = ordenes.find(o => o.id === id);

  if (!orden) {
    return (
      <main className="container my-4">
        <div className="mensaje-estado">
          <h1 className="h3">No encontramos esa compra</h1>
          <p>Revisa el número de compra o vuelve a la tienda.</p>
          <Link to="/productos" className="btn btn-dark">Ver productos</Link>
        </div>
      </main>
    );
  }

  const c = orden.cliente ?? {};
  const d = orden.direccion ?? {};
  const lineas = orden.items.map(i => ({ ...i, producto: productos.find(p => p.id === i.id) }));
  const total = totalOrden(orden);

  return (
    <main className="container my-4">
      <section className="panel-blanco comprobante" aria-labelledby="titulo-compra">
        <div className="estado-compra estado-ok">
          <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
          <div>
            <h1 id="titulo-compra" className="h3 mb-0">Se ha realizado la compra N° {orden.id}</h1>
            <p className="text-muted mb-0">Fecha: {orden.fecha}</p>
          </div>
        </div>

        <h3 className="mt-4">Datos del cliente</h3>
        <dl className="dato-lista">
          <div><dt>Nombre</dt><dd>{c.nombre ?? '—'}</dd></div>
          <div><dt>Apellidos</dt><dd>{c.apellidos ?? '—'}</dd></div>
          <div><dt>Correo</dt><dd>{c.correo ?? '—'}</dd></div>
        </dl>

        <h3>Dirección de entrega</h3>
        <dl className="dato-lista">
          <div><dt>Calle</dt><dd>{d.calle ?? '—'}</dd></div>
          <div><dt>Departamento</dt><dd>{d.departamento || '—'}</dd></div>
          <div><dt>Región</dt><dd>{d.region ? nombreRegion(d.region) : '—'}</dd></div>
          <div><dt>Comuna</dt><dd>{d.comuna ?? '—'}</dd></div>
          <div className="dato-ancho"><dt>Indicaciones</dt><dd>{d.indicaciones || '—'}</dd></div>
        </dl>

        <h3>Detalle de la compra</h3>
        <TablaProductosCompra lineas={lineas} />
        <p className="total-linea">Total pagado <strong>{formatoPrecio(total)}</strong></p>

        <div className="d-flex gap-2 flex-wrap no-imprimir">
          <button type="button" className="btn btn-dark" onClick={() => window.print()}>Imprimir boleta en PDF</button>
          <Link to="/" className="btn btn-secondary">Volver al inicio</Link>
        </div>
      </section>
    </main>
  );
}
