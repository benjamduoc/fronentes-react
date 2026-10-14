import { Link } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';

export default function UsuariosAdmin() {
  usePagina('Usuarios - ADMI');
  const { usuarios } = useDatos();
  return (
    <>
      <h2>Usuarios</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Rol</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <th scope="row">{u.id}</th>
              <td>{u.nombre_completo}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>
                <Link className="btn btn-sm btn-secondary" to={`/admin/usuarios/${u.id}`}>Mostrar</Link>{' '}
                <Link className="btn btn-sm btn-info" to={`/admin/usuarios/${u.id}/editar`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="btn btn-success" to="/admin/usuarios/nuevo">Nuevo usuario</Link>
    </>
  );
}
