import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../../components/CampoFormulario';
import TablaProductosCompra from '../../components/TablaProductosCompra';
import { useCarrito } from '../../context/CarritoContext';
import { useDatos } from '../../context/DatosContext';
import { useSesion } from '../../context/SesionContext';
import { REGIONES, comunasDe } from '../../data/regiones';
import { useFormulario } from '../../hooks/useFormulario';
import { usePagina } from '../../hooks/usePagina';
import {
  construirOrden, datosDesdeUsuario, descontarStock, guardarIntento, leerIntento,
  limpiarIntento, lineasDelCarrito, lineasSinStock, totalLineas, validarCheckout,
} from '../../utils/checkout';
import { formatoPrecio, generarId } from '../../utils/formato';

export default function Checkout() {
  usePagina('Checkout');
  const navigate = useNavigate();
  const { carrito, vaciar } = useCarrito();
  const { productos, setProductos, ordenes, setOrdenes, usuarios } = useDatos();
  const { sesion } = useSesion();

  const form = useFormulario(() => leerIntento()?.datos ?? datosDesdeUsuario(usuarios.find(u => u.id === sesion?.id)));
  const [errores, setErrores] = useState({});
  const [simularError, setSimularError] = useState(false);

  const lineas = lineasDelCarrito(carrito, productos);
  const total = totalLineas(lineas);
  const v = form.valores;

  if (lineas.length === 0) {
    return (
      <main className="container my-4">
        <div className="mensaje-estado">
          <h1 className="h3">No hay productos para pagar</h1>
          <p>Agrega productos al carrito para continuar con la compra.</p>
          <Link to="/productos" className="btn btn-dark">Ver productos</Link>
        </div>
      </main>
    );
  }

  const campo = (name, base = 'form-control') => ({
    id: name,
    name,
    value: v[name],
    onChange: form.cambiar,
    className: base + (errores[name] ? ' is-invalid' : ''),
    'aria-invalid': errores[name] ? true : undefined,
    'aria-describedby': errores[name] ? `${name}-error` : undefined,
  });

  function pagar(e) {
    e.preventDefault();
    const encontrados = validarCheckout(v);
    setErrores(encontrados);
    const primerError = Object.keys(encontrados)[0];
    if (primerError) {
      document.getElementById(primerError)?.focus();
      return;
    }

    const numero = generarId('OC', ordenes, 4);
    const sinStock = lineasSinStock(lineas);
    if (simularError || sinStock.length) {
      guardarIntento({
        numero,
        datos: v,
        motivo: sinStock.length
          ? `No hay stock suficiente de: ${sinStock.map(l => l.producto.titulo).join(', ')}.`
          : 'El medio de pago rechazó la transacción (simulación).',
      });
      navigate('/pago-error');
      return;
    }

    const orden = construirOrden({ id: numero, sesion, datos: v, lineas });
    setOrdenes([...ordenes, orden]);
    setProductos(descontarStock(productos, lineas));
    limpiarIntento();
    vaciar();
    navigate(`/pago-correcto/${orden.id}`);
  }

  return (
    <main className="container my-4">
      <form className="panel-blanco" onSubmit={pagar} noValidate>
        <div className="checkout-cabecera">
          <div>
            <h2 className="h3 mb-1">Checkout</h2>
            <p className="text-muted mb-0">Revisa tu compra y completa la información de entrega.</p>
          </div>
          <div className="total-pagar" aria-live="polite">Total a pagar: {formatoPrecio(total)}</div>
        </div>

        <TablaProductosCompra lineas={lineas} />

        <section className="seccion-form" aria-labelledby="titulo-cliente">
          <h3 id="titulo-cliente">Información del cliente</h3>
          {sesion && <p className="text-muted">Usamos los datos de tu cuenta. Puedes cambiarlos para esta compra.</p>}
          <div className="row g-3">
            <CampoFormulario id="nombre" etiqueta="Nombre" error={errores.nombre}>
              <input type="text" autoComplete="given-name" {...campo('nombre')} />
            </CampoFormulario>
            <CampoFormulario id="apellidos" etiqueta="Apellidos" error={errores.apellidos}>
              <input type="text" autoComplete="family-name" {...campo('apellidos')} />
            </CampoFormulario>
            <CampoFormulario id="correo" etiqueta="Correo" error={errores.correo} columnas="col-12">
              <input type="email" autoComplete="email" {...campo('correo')} />
            </CampoFormulario>
          </div>
        </section>

        <section className="seccion-form" aria-labelledby="titulo-direccion">
          <h3 id="titulo-direccion">Dirección de entrega</h3>
          <p className="text-muted">Ingresa la dirección de forma detallada.</p>
          <div className="row g-3">
            <CampoFormulario id="calle" etiqueta="Calle y número" error={errores.calle}>
              <input type="text" autoComplete="address-line1" {...campo('calle')} />
            </CampoFormulario>
            <CampoFormulario id="departamento" etiqueta="Departamento" opcional>
              <input type="text" placeholder="Ej: 603" autoComplete="address-line2" {...campo('departamento')} />
            </CampoFormulario>
            <CampoFormulario id="region" etiqueta="Región" error={errores.region}>
              <select
                {...campo('region', 'form-select')}
                onChange={e => form.asignar({ region: e.target.value, comuna: '' })}
              >
                <option value="">Selecciona una región</option>
                {REGIONES.map(r => (
                  <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
              </select>
            </CampoFormulario>
            <CampoFormulario id="comuna" etiqueta="Comuna" error={errores.comuna}>
              <select {...campo('comuna', 'form-select')} disabled={!v.region}>
                <option value="">{v.region ? 'Selecciona una comuna' : 'Primero elige la región'}</option>
                {comunasDe(v.region).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </CampoFormulario>
            <CampoFormulario id="indicaciones" etiqueta="Indicaciones para la entrega" opcional columnas="col-12">
              <textarea
                rows="3"
                placeholder="Ej: entre calles, color del edificio, no tiene timbre"
                {...campo('indicaciones')}
              />
            </CampoFormulario>
          </div>
        </section>

        <div className="checkout-pie">
          <div className="form-check">
            <input
              id="simular-error" type="checkbox" className="form-check-input"
              checked={simularError} onChange={e => setSimularError(e.target.checked)}
            />
            <label htmlFor="simular-error" className="form-check-label text-muted">
              Simular pago rechazado (solo para pruebas)
            </label>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <Link to="/carrito" className="btn btn-secondary">Volver al carrito</Link>
            <button type="submit" className="btn btn-success">Pagar ahora {formatoPrecio(total)}</button>
          </div>
        </div>
      </form>
    </main>
  );
}
