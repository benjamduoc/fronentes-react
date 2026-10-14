import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';
import { lineasDelCarrito, lineasSinStock, totalLineas } from '../../utils/checkout';
import { formatoPrecio, precioFinal, urlImagen } from '../../utils/formato';

export default function Carrito() {
  usePagina('Carrito de compra');
  const { carrito, quitar, vaciar, cambiarCantidad } = useCarrito();
  const { productos } = useDatos();

  const lineas = lineasDelCarrito(carrito, productos);
  const total = totalLineas(lineas);
  const sinStock = lineasSinStock(lineas);

  return (
    <main className="container my-4">
      <h2 className="titulos">Carrito de compra</h2>
      <div className="panel-blanco">
        {lineas.length === 0 ? (
          <div className="text-center py-4">
            <p className="mb-3">Tu carrito está vacío. Agrega productos para continuar con la compra.</p>
            <Link to="/productos" className="btn btn-dark">Ver productos</Link>
          </div>
        ) : (
          <>
            {sinStock.length > 0 && (
              <div className="alert alert-warning" role="alert">
                Reduce la cantidad para continuar: {sinStock.map(l => `${l.producto.titulo} (stock ${l.producto.stock})`).join(', ')}.
              </div>
            )}
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">Imagen</th>
                    <th scope="col">Nombre</th>
                    <th scope="col" className="text-end">Precio</th>
                    <th scope="col" className="text-center">Cantidad</th>
                    <th scope="col" className="text-end">Subtotal</th>
                    <th scope="col"><span className="visually-hidden">Acciones</span></th>
                  </tr>
                </thead>
                <tbody>
                  {lineas.map(({ id, cantidad, producto: p }) => (
                    <tr key={id}>
                      <td><img src={urlImagen(p.imagen)} className="carrito-img" alt="" /></td>
                      <td>{p.titulo}</td>
                      <td className="text-end">{formatoPrecio(precioFinal(p))}</td>
                      <td className="text-center">
                        <div className="cantidad-control" role="group" aria-label={`Cantidad de ${p.titulo}`}>
                          <button type="button" className="btn btn-sm btn-secondary" aria-label={`Quitar una unidad de ${p.titulo}`} onClick={() => cambiarCantidad(id, -1)}>−</button>
                          <span aria-live="polite">{cantidad}</span>
                          <button type="button" className="btn btn-sm btn-secondary" aria-label={`Agregar una unidad de ${p.titulo}`} disabled={cantidad >= p.stock} onClick={() => cambiarCantidad(id, 1)}>+</button>
                        </div>
                      </td>
                      <td className="text-end">{formatoPrecio(precioFinal(p) * cantidad)}</td>
                      <td className="text-end">
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => quitar(id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="resumen-pie">
              <p className="total-linea">Total <strong>{formatoPrecio(total)}</strong></p>
              <div className="d-flex gap-2 flex-wrap">
                <button type="button" className="btn btn-secondary" onClick={vaciar}>Limpiar carrito</button>
                {sinStock.length > 0 ? (
                  <button type="button" className="btn btn-success" disabled>Comprar ahora</button>
                ) : (
                  <Link to="/checkout" className="btn btn-success">Comprar ahora</Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
