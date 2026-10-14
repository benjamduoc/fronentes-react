import { Link } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';

export default function CategoriasAdmin() {
  usePagina('Categorías - ADMI');
  const { categorias } = useDatos();
  return (
    <>
      <h2>Categorías</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => (
            <tr key={c.id}>
              <th scope="row">{c.id}</th>
              <td>{c.nombre}</td>
              <td>
                <Link className="btn btn-sm btn-info" to={`/admin/categorias/${c.id}/editar`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="btn btn-success" to="/admin/categorias/nueva">Nueva categoría</Link>
    </>
  );
}
