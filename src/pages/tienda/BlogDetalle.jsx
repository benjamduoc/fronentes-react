import { Link, useParams } from 'react-router-dom';
import { blogs } from '../../data/blogs';
import { usePagina } from '../../hooks/usePagina';
import { urlImagen } from '../../utils/formato';

export default function BlogDetalle() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);
  usePagina(blog ? `Detalle blog #${blog.id}` : 'Blog no encontrado');

  return (
    <main className="container my-4">
      <div className="panel-blanco">
        {blog ? (
          <>
            <h1>{blog.titulo}</h1>
            <img src={urlImagen(blog.imagen)} className="img-fluid my-3" alt={`Blog ${blog.id}`} />
            <p>{blog.texto}</p>
          </>
        ) : (
          <h1>Blog no encontrado</h1>
        )}
        <Link to="/blog" className="btn btn-dark">Volver a blogs</Link>
      </div>
    </main>
  );
}
