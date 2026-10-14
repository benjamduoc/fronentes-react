import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';
import { formatoPrecio, precioFinal } from '../../utils/formato';

export default function ReporteProductos() {
  usePagina('Reporte productos - ADMI');
  const { productos, categorias } = useDatos();
  return (
    <>
      <h2>Reporte de productos</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Categoría</th>
            <th scope="col">N° productos</th>
            <th scope="col">Stock total</th>
            <th scope="col">Valor inventario</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => {
            const lista = productos.filter(p => p.categoria === c.id);
            return (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{lista.length}</td>
                <td>{lista.reduce((s, p) => s + p.stock, 0)}</td>
                <td>{formatoPrecio(lista.reduce((s, p) => s + precioFinal(p) * p.stock, 0))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
