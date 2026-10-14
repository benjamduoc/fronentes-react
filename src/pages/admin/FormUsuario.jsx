import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { useFormulario } from '../../hooks/useFormulario';
import { usePagina } from '../../hooks/usePagina';
import { generarId } from '../../utils/formato';

function Formulario({ actual }) {
  const navigate = useNavigate();
  const { usuarios, setUsuarios } = useDatos();
  const form = useFormulario({
    nombre_completo: actual?.nombre_completo ?? '',
    correo: actual?.correo ?? '',
    contrasena: '',
    telefono: actual?.telefono ?? '',
    region: actual?.region ?? '',
    comuna: actual?.comuna ?? '',
    rol: actual?.rol ?? 'cliente',
  });
  const v = form.valores;

  function guardar(e) {
    e.preventDefault();
    const datos = {
      nombre_completo: v.nombre_completo, correo: v.correo, telefono: v.telefono,
      region: v.region, comuna: v.comuna, rol: v.rol,
    };
    setUsuarios(
      actual
        ? usuarios.map(u =>
            u.id === actual.id ? { ...u, ...datos, ...(v.contrasena ? { contrasena: v.contrasena } : {}) } : u
          )
        : [...usuarios, { id: generarId('US', usuarios, 3), ...datos, contrasena: v.contrasena }]
    );
    navigate('/admin/usuarios');
  }

  return (
    <div className="panel-blanco text-dark col-md-7">
      <h3>{actual ? 'EDITAR USUARIO ' + actual.id : 'NUEVO USUARIO'}</h3>
      <form onSubmit={guardar}>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input className="form-control" name="nombre_completo" type="text" value={v.nombre_completo} onChange={form.cambiar} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input className="form-control" name="correo" type="email" value={v.correo} onChange={form.cambiar} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            className="form-control" name="contrasena" type="password" minLength={4} maxLength={10}
            value={v.contrasena} onChange={form.cambiar} required={!actual}
            placeholder={actual ? 'Dejar vacío para no cambiarla' : undefined}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input className="form-control" name="telefono" type="text" value={v.telefono} onChange={form.cambiar} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Región</label>
          <input className="form-control" name="region" type="text" value={v.region} onChange={form.cambiar} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Comuna</label>
          <input className="form-control" name="comuna" type="text" value={v.comuna} onChange={form.cambiar} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select className="form-select" name="rol" value={v.rol} onChange={form.cambiar}>
            <option value="cliente">cliente</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button className="btn btn-info" type="submit">Guardar</button>{' '}
        <Link className="btn btn-danger" to="/admin/usuarios">Cancelar</Link>
      </form>
    </div>
  );
}

export default function FormUsuario() {
  usePagina('Usuario - ADMI');
  const { id } = useParams();
  const { usuarios } = useDatos();
  const actual = id ? usuarios.find(u => u.id === id) : undefined;

  if (id && !actual) {
    return (
      <p>
        Usuario no encontrado. <Link to="/admin/usuarios">Volver a usuarios</Link>
      </p>
    );
  }
  return <Formulario key={id ?? 'nuevo'} actual={actual} />;
}
