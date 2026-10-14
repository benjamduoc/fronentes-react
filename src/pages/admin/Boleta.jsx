import { Link, useParams } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';
import { desglosarIVA, formatoPrecio, totalOrden } from '../../utils/formato';

export default function Boleta() {
  usePagina('Boleta - ADMI');
  const { id } = useParams();
  const { ordenes, usuarios, productos } = useDatos();
  const orden = ordenes.find(o => o.id === id);
  const cliente = orden?.cliente
    ? `${orden.cliente.nombre} ${orden.cliente.apellidos}`.trim()
    : usuarios.find(u => u.id === orden?.usuario)?.nombre_completo ?? 'Invitado';
  const d = orden?.direccion;

  let contenido = 'Boleta no encontrada';
  if (orden) {
    const total = totalOrden(orden);
    const { neto, iva } = desglosarIVA(total);
    contenido = (
      <>
        <h3>Boleta {orden.id}</h3>
        <p>
          Cliente: {cliente}
          <br />
          {orden.cliente?.correo && <>Correo: {orden.cliente.correo}<br /></>}
          {d && <>Entrega: {d.calle}{d.departamento ? `, depto ${d.departamento}` : ''}, {d.comuna}<br /></>}
          Fecha: {orden.fecha}
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orden.items.map(i => {
              const p = productos.find(x => x.id === i.id);
              return (
                <tr key={i.id}>
                  <td>{p ? p.titulo : i.id}</td>
                  <td>{i.cantidad}</td>
                  <td>{formatoPrecio(i.precio)}</td>
                  <td>{formatoPrecio(i.precio * i.cantidad)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>
          Neto: {formatoPrecio(neto)}
          <br />
          IVA (19%): {formatoPrecio(iva)}
          <br />
          <strong>Total: {formatoPrecio(total)}</strong>
        </p>
        <button className="btn btn-info" onClick={() => window.print()}>Imprimir</button>
      </>
    );
  }

  return (
    <>
      <div className="panel-blanco text-dark" id="boleta">{contenido}</div>
      <Link className="btn btn-secondary mt-3" to="/admin/ordenes">Volver</Link>
    </>
  );
}
