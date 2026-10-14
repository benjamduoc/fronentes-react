import { Link } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';

export default function Categorias() {
  usePagina('Categorías', 'pagina-productos');
  const { categorias, productos } = useDatos();
  return (
    <main className="container my-4">
      <h2 className="titulos">Categorías</h2>
      <div className="row g-4 mb-5">
        {categorias.map(c => (
          <div key={c.id} className="col-6 col-md-4">
            <Link to={`/categorias/${c.id}`} className="card-link">
              <div className="card-placeholder text-center">
                <h5 className="my-3">{c.nombre}</h5>
                <span className="small">{productos.filter(p => p.categoria === c.id).length} productos</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
