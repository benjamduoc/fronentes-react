import { useState } from 'react';
import { useDatos } from '../../context/DatosContext';
import { useFormulario } from '../../hooks/useFormulario';
import { usePagina } from '../../hooks/usePagina';
import { generarId } from '../../utils/formato';

const VACIO = { nombre: '', correo: '', mensaje: '' };

export default function Contacto() {
  usePagina('Contacto');
  const { contactos, setContactos } = useDatos();
  const form = useFormulario(VACIO);
  const [enviado, setEnviado] = useState(false);

  function enviar(e) {
    e.preventDefault();
    const v = form.valores;
    setContactos([
      ...contactos,
      { id: generarId('CO', contactos, 3), nombre: v.nombre, correo: v.correo, mensaje: v.mensaje, fecha: new Date().toISOString() },
    ]);
    form.reiniciar();
    setEnviado(true);
  }

  return (
    <main className="container my-4">
      <h2 className="titulos">Contacto</h2>
      <div className="panel-blanco col-md-7 mx-auto">
        <form onSubmit={enviar}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input name="nombre" className="form-control" value={form.valores.nombre} onChange={form.cambiar} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input name="correo" type="email" className="form-control" value={form.valores.correo} onChange={form.cambiar} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea name="mensaje" rows="4" className="form-control" value={form.valores.mensaje} onChange={form.cambiar} required></textarea>
          </div>
          <button className="btn btn-dark">Enviar</button>
          {enviado && <div className="alert alert-success mt-3">Mensaje enviado, gracias por contactarnos.</div>}
        </form>
      </div>
    </main>
  );
}
