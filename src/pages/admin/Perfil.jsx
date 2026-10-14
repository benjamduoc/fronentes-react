import { useState } from 'react';
import { useDatos } from '../../context/DatosContext';
import { useSesion } from '../../context/SesionContext';
import { useFormulario } from '../../hooks/useFormulario';
import { usePagina } from '../../hooks/usePagina';

export default function Perfil() {
  usePagina('Perfil - ADMI');
  const { sesion, actualizarSesion } = useSesion();
  const { usuarios, setUsuarios } = useDatos();
  const yo = usuarios.find(u => u.id === sesion?.id);
  const form = useFormulario({
    nombre: yo?.nombre_completo ?? '',
    correo: yo?.correo ?? '',
    telefono: yo?.telefono ?? '',
  });
  const [guardado, setGuardado] = useState(false);

  if (!yo) return <p>No se encontró el usuario de esta sesión.</p>;

  function guardar(e) {
    e.preventDefault();
    const v = form.valores;
    setUsuarios(
      usuarios.map(u => (u.id === yo.id ? { ...u, nombre_completo: v.nombre, correo: v.correo, telefono: v.telefono } : u))
    );
    actualizarSesion({ nombre: v.nombre, correo: v.correo });
    setGuardado(true);
  }

  return (
    <>
      <h2>Perfil</h2>
      <div className="panel-blanco text-dark col-md-7">
        <form onSubmit={guardar}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" name="nombre" type="text" value={form.valores.nombre} onChange={form.cambiar} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input className="form-control" name="correo" type="email" value={form.valores.correo} onChange={form.cambiar} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input className="form-control" name="telefono" type="text" value={form.valores.telefono} onChange={form.cambiar} required />
          </div>
          <button className="btn btn-info">Guardar</button>
          {guardado && <div className="alert alert-success mt-3">Perfil actualizado</div>}
        </form>
      </div>
    </>
  );
}
