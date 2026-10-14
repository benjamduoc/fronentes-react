import { Link } from 'react-router-dom';
import { formatoPrecio, urlImagen } from '../utils/formato';

export default function TarjetaProducto({ producto: p }) {
  const enOferta = p.oferta > 0;
  return (
    <div className="col-6 col-md-3">
      <Link to={`/productos/${p.id}`} className="card-link">
        <div className="card-placeholder text-center">
          {enOferta && <span className="badge-oferta">-{Math.round((1 - p.oferta / p.precio) * 100)}%</span>}
          {p.stock <= 5 && <span className="badge-stock">¡Últimas unidades!</span>}
          <div className="img-box mb-2">
            <img src={urlImagen(p.imagen)} className="img-producto" alt={p.titulo} />
          </div>
          <span className="nav-link-custom d-block mb-2 small">{p.titulo}</span>
          <div className="small">
            {enOferta ? (
              <>
                <span className="text-decoration-line-through text-muted">{formatoPrecio(p.precio)}</span>{' '}
                <span className="fw-bold text-danger">{formatoPrecio(p.oferta)}</span>
              </>
            ) : (
              <span className="fw-bold">{formatoPrecio(p.precio)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
