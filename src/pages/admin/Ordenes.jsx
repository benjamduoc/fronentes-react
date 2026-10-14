import { Link } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';
import { formatoPrecio, totalOrden } from '../../utils/formato';

export default function Ordenes() {
  usePagina('Órdenes - ADMI');
  const { ordenes, usuarios } = useDatos();
  const cliente = o =>
    o.cliente
      ? `${o.cliente.nombre} ${o.cliente.apellidos}`.trim()
      : (usuarios.find(u => u.id === o.usuario) || { nombre_completo: 'Invitado' }).nombre_completo;
  return (
    <>
      <h2>Órdenes / Boletas</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Cliente</th>
            <th scope="col">Fecha</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map(o => (
            <tr key={o.id}>
              <th scope="row">{o.id}</th>
              <td>{cliente(o)}</td>
              <td>{o.fecha}</td>
              <td>{formatoPrecio(totalOrden(o))}</td>
              <td>
                <Link className="btn btn-sm btn-secondary" to={`/admin/ordenes/${o.id}`}>Mostrar boleta</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
