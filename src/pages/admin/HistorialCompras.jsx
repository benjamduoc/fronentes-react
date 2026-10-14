import { Link, useParams } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';
import { formatoPrecio, totalOrden } from '../../utils/formato';

export default function HistorialCompras() {
  usePagina('Historial - ADMI');
  const { id } = useParams();
  const { usuarios, ordenes } = useDatos();
  const u = usuarios.find(x => x.id === id);

  if (!u) {
    return (
      <p>
        Usuario no encontrado. <Link to="/admin/usuarios">Volver a usuarios</Link>
      </p>
    );
  }

  const compras = ordenes.filter(o => o.usuario === u.id);
  return (
    <>
      <h2>Historial de compras: <span>{u.nombre_completo}</span></h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Orden</th>
            <th scope="col">Fecha</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {compras.length ? (
            compras.map(o => (
              <tr key={o.id}>
                <th scope="row">{o.id}</th>
                <td>{o.fecha}</td>
                <td>{formatoPrecio(totalOrden(o))}</td>
                <td>
                  <Link className="btn btn-sm btn-secondary" to={`/admin/ordenes/${o.id}`}>Ver boleta</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Sin compras</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
