import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';
import { formatoPrecio, totalOrden } from '../../utils/formato';

export default function Reportes() {
  usePagina('Reportes - ADMI');
  const { ordenes } = useDatos();
  return (
    <>
      <h2>Reportes</h2>
      <p>Ventas totales: <strong>{formatoPrecio(ordenes.reduce((s, o) => s + totalOrden(o), 0))}</strong></p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Orden</th>
            <th scope="col">Fecha</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map(o => (
            <tr key={o.id}>
              <th scope="row">{o.id}</th>
              <td>{o.fecha}</td>
              <td>{formatoPrecio(totalOrden(o))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
