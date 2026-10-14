import { Link, useParams } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';

export default function DetalleUsuario() {
  usePagina('Usuario - ADMI');
  const { id } = useParams();
  const { usuarios } = useDatos();
  const u = usuarios.find(x => x.id === id);

  return (
    <>
      <div className="panel-blanco text-dark" id="detalle-usuario">
        {u ? (
          <>
            <h3>{u.nombre_completo}</h3>
            <p>
              ID: {u.id}
              <br />
              Correo: {u.correo}
              <br />
              Teléfono: {u.telefono}
              <br />
              Región: {u.region} · Comuna: {u.comuna}
              <br />
              Rol: {u.rol}
            </p>
            <Link className="btn btn-info" to={`/admin/usuarios/${u.id}/editar`}>Editar usuario</Link>{' '}
            <Link className="btn btn-success" to={`/admin/usuarios/${u.id}/historial`}>Historial de compras</Link>
          </>
        ) : (
          'Usuario no encontrado'
        )}
      </div>
      <Link className="btn btn-secondary mt-3" to="/admin/usuarios">Volver</Link>
    </>
  );
}
