import { formatoPrecio, precioFinal, urlImagen } from '../utils/formato';

export default function TablaProductosCompra({ lineas }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th scope="col" className="d-none d-sm-table-cell">Imagen</th>
            <th scope="col">Nombre</th>
            <th scope="col" className="text-end">Precio</th>
            <th scope="col" className="text-end">Cantidad</th>
            <th scope="col" className="text-end">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {lineas.map(({ id, cantidad, producto, precio }) => {
            const unitario = precio ?? (producto ? precioFinal(producto) : 0);
            return (
              <tr key={id}>
                <td className="d-none d-sm-table-cell">{producto && <img src={urlImagen(producto.imagen)} className="carrito-img" alt="" />}</td>
                <td>{producto ? producto.titulo : id}</td>
                <td className="text-end">{formatoPrecio(unitario)}</td>
                <td className="text-end">{cantidad}</td>
                <td className="text-end">{formatoPrecio(unitario * cantidad)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
