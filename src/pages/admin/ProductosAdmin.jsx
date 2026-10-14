import { Link } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';
import { formatoPrecio, urlImagen } from '../../utils/formato';

export default function ProductosAdmin() {
  usePagina('Productos - ADMI', 'pagina-productos-admin');
  const { productos, setProductos, categorias } = useDatos();
  const nombreCat = id => (categorias.find(c => c.id === id) || { nombre: '-' }).nombre;

  function eliminar(id) {
    if (confirm('¿Eliminar el producto ' + id + '?')) setProductos(productos.filter(p => p.id !== id));
  }

  return (
    <>
      <h2>Productos</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th scope="col">Categoría</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Imagen</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <th scope="row">{p.id}</th>
              <td>{p.titulo}</td>
              <td>{nombreCat(p.categoria)}</td>
              <td>{formatoPrecio(p.precio)}</td>
              <td>{p.stock}</td>
              <td>
                <img src={urlImagen(p.imagen)} alt={p.titulo} width="50" />
              </td>
              <td>
                <Link className="btn btn-sm btn-info" to={`/admin/productos/${p.id}/editar`}>Editar</Link>{' '}
                <button className="btn btn-sm btn-danger" onClick={() => eliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="btn btn-success" to="/admin/productos/nuevo">Nuevo producto</Link>{' '}
      <Link className="btn btn-warning" to="/admin/productos/criticos">Productos críticos</Link>{' '}
      <Link className="btn btn-secondary" to="/admin/productos/reportes">Reportes</Link>
    </>
  );
}
