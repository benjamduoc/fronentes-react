import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { useFormulario } from '../../hooks/useFormulario';
import { usePagina } from '../../hooks/usePagina';
import { generarId } from '../../utils/formato';

function Formulario({ actual }) {
  const navigate = useNavigate();
  const { productos, setProductos, categorias } = useDatos();
  const form = useFormulario({
    titulo: actual?.titulo ?? '',
    precio: actual?.precio ?? '',
    stock: actual?.stock ?? '',
    oferta: actual?.oferta ?? 0,
    imagen: actual?.imagen ?? '',
    categoria: actual?.categoria ?? categorias[0]?.id ?? '',
  });
  const v = form.valores;

  function guardar(e) {
    e.preventDefault();
    const datos = {
      titulo: v.titulo,
      precio: +v.precio,
      stock: +v.stock,
      oferta: +v.oferta || 0,
      imagen: v.imagen,
      categoria: v.categoria,
    };
    setProductos(
      actual
        ? productos.map(p => (p.id === actual.id ? { ...p, ...datos } : p))
        : [...productos, { id: generarId('PR', productos, 3), ...datos }]
    );
    navigate('/admin/productos');
  }

  return (
    <div className="panel-blanco text-dark col-md-7">
      <h3>{actual ? 'EDITAR PRODUCTO ' + actual.id : 'NUEVO PRODUCTO'}</h3>
      <form onSubmit={guardar}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" name="titulo" type="text" value={v.titulo} onChange={form.cambiar} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input className="form-control" name="precio" type="number" min="0" value={v.precio} onChange={form.cambiar} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input className="form-control" name="stock" type="number" min="0" value={v.stock} onChange={form.cambiar} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio oferta (0 = sin oferta)</label>
          <input className="form-control" name="oferta" type="number" min="0" value={v.oferta} onChange={form.cambiar} />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select className="form-select" name="categoria" value={v.categoria} onChange={form.cambiar}>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen (ruta, ej: img/productos/archivo.png)</label>
          <input className="form-control" name="imagen" type="text" value={v.imagen} onChange={form.cambiar} required />
        </div>
        <button className="btn btn-info" type="submit">Guardar</button>{' '}
        <Link className="btn btn-danger" to="/admin/productos">Cancelar</Link>
      </form>
    </div>
  );
}

export default function FormProducto() {
  usePagina('Producto - ADMI');
  const { id } = useParams();
  const { productos } = useDatos();
  const actual = id ? productos.find(p => p.id === id) : undefined;

  if (id && !actual) {
    return (
      <p>
        Producto no encontrado. <Link to="/admin/productos">Volver a productos</Link>
      </p>
    );
  }
  return <Formulario key={id ?? 'nuevo'} actual={actual} />;
}
