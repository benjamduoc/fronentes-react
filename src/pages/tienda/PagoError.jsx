import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TablaProductosCompra from '../../components/TablaProductosCompra';
import { useCarrito } from '../../context/CarritoContext';
import { useDatos } from '../../context/DatosContext';
import { nombreRegion } from '../../data/regiones';
import { usePagina } from '../../hooks/usePagina';
import { leerIntento, lineasDelCarrito, totalLineas } from '../../utils/checkout';
import { formatoPrecio } from '../../utils/formato';

export default function PagoError() {
  usePagina('Pago con error');
  const navigate = useNavigate();
  const { carrito } = useCarrito();
  const { productos } = useDatos();
  const [intento] = useState(leerIntento);

  if (!intento) {
    return (
      <main className="container my-4">
        <div className="mensaje-estado">
          <h1 className="h3">No hay un pago pendiente</h1>
          <p>Cuando un pago falle, aquí verás el detalle para reintentarlo.</p>
          <Link to="/carrito" className="btn btn-dark">Ir al carrito</Link>
        </div>
      </main>
    );
  }

  const { datos: d, numero, motivo } = intento;
  const lineas = lineasDelCarrito(carrito, productos);

  return (
    <main className="container my-4">
      <section className="panel-blanco comprobante" aria-labelledby="titulo-error">
        <div className="estado-compra estado-error">
          <i className="bi bi-x-circle-fill" aria-hidden="true"></i>
          <div>
            <h1 id="titulo-error" className="h3 mb-0">No se pudo realizar el pago N° {numero}</h1>
            <p className="mb-0" role="alert">{motivo}</p>
          </div>
        </div>

        <div className="my-4">
          <button type="button" className="btn btn-success btn-lg" onClick={() => navigate('/checkout')}>
            Volver a realizar el pago
          </button>
        </div>

        <h3>Datos del cliente</h3>
        <dl className="dato-lista">
          <div><dt>Nombre</dt><dd>{d.nombre}</dd></div>
          <div><dt>Apellidos</dt><dd>{d.apellidos}</dd></div>
          <div><dt>Correo</dt><dd>{d.correo}</dd></div>
        </dl>

        <h3>Dirección de entrega</h3>
        <dl className="dato-lista">
          <div><dt>Calle</dt><dd>{d.calle}</dd></div>
          <div><dt>Departamento</dt><dd>{d.departamento || '—'}</dd></div>
          <div><dt>Región</dt><dd>{nombreRegion(d.region)}</dd></div>
          <div><dt>Comuna</dt><dd>{d.comuna}</dd></div>
          <div className="dato-ancho"><dt>Indicaciones</dt><dd>{d.indicaciones || '—'}</dd></div>
        </dl>

        <h3>Detalle de la compra</h3>
        <TablaProductosCompra lineas={lineas} />
        <p className="total-linea">Total a pagar <strong>{formatoPrecio(totalLineas(lineas))}</strong></p>
        <Link to="/carrito" className="btn btn-secondary">Volver al carrito</Link>
      </section>
    </main>
  );
}
