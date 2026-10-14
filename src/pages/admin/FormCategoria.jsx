import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { useFormulario } from '../../hooks/useFormulario';
import { usePagina } from '../../hooks/usePagina';
import { generarId } from '../../utils/formato';

function Formulario({ actual }) {
  const navigate = useNavigate();
  const { categorias, setCategorias } = useDatos();
  const form = useFormulario({ nombre: actual?.nombre ?? '' });

  function guardar(e) {
    e.preventDefault();
    const nombre = form.valores.nombre;
    setCategorias(
      actual
        ? categorias.map(c => (c.id === actual.id ? { ...c, nombre } : c))
        : [...categorias, { id: generarId('CT', categorias, 2), nombre }]
    );
    navigate('/admin/categorias');
  }

  return (
    <div className="panel-blanco text-dark col-md-7">
      <h3>{actual ? 'EDITAR CATEGORÍA ' + actual.id : 'NUEVA CATEGORÍA'}</h3>
      <form onSubmit={guardar}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" name="nombre" type="text" value={form.valores.nombre} onChange={form.cambiar} required />
        </div>
        <button className="btn btn-info" type="submit">Guardar</button>{' '}
        <Link className="btn btn-danger" to="/admin/categorias">Cancelar</Link>
      </form>
    </div>
  );
}

export default function FormCategoria() {
  usePagina('Categoría - ADMI');
  const { id } = useParams();
  const { categorias } = useDatos();
  const actual = id ? categorias.find(c => c.id === id) : undefined;

  if (id && !actual) {
    return (
      <p>
        Categoría no encontrada. <Link to="/admin/categorias">Volver a categorías</Link>
      </p>
    );
  }
  return <Formulario key={id ?? 'nueva'} actual={actual} />;
}
