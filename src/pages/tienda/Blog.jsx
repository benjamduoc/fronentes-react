import { Link } from 'react-router-dom';
import { blogs } from '../../data/blogs';
import { usePagina } from '../../hooks/usePagina';
import { urlImagen } from '../../utils/formato';

export default function Blog() {
  usePagina('Blogs');
  return (
    <main className="container my-4">
      <h2 className="titulos">Blogs</h2>
      <div className="row g-4 mb-5">
        {blogs.map(b => (
          <div key={b.id} className="col-md-6">
            <Link to={`/blog/${b.id}`} className="card-link">
              <div className="card-placeholder text-center">
                <img src={urlImagen(b.imagen)} className="img-fluid mb-2" alt={`Blog ${b.id}`} />
                <h5>{b.titulo}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
