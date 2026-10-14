import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';

export default function ProductosCriticos() {
  usePagina('Críticos - ADMI');
  const { productos, categorias } = useDatos();
  const nombreCat = id => (categorias.find(c => c.id === id) || { nombre: '-' }).nombre;
  return (
    <>
      <h2>Productos críticos (stock ≤ 5)</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th scope="col">Categoría</th>
            <th scope="col">Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.filter(p => p.stock <= 5).map(p => (
            <tr key={p.id} className={p.stock <= 2 ? 'table-danger' : 'table-warning'}>
              <th scope="row">{p.id}</th>
              <td>{p.titulo}</td>
              <td>{nombreCat(p.categoria)}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
