import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatoPrecio, precioFinal, urlImagen } from '../utils/formato';

const INTERVALO_MS = 6000;
const prefiereMenosMovimiento = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export default function OfertasDestacadas({ productos }) {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = productos.length;

  useEffect(() => {
    if (total < 2 || pausado || prefiereMenosMovimiento()) return;
    const temporizador = setInterval(() => setIndice(i => (i + 1) % total), INTERVALO_MS);
    return () => clearInterval(temporizador);
  }, [total, pausado]);

  if (total === 0) return null;
  const p = productos[Math.min(indice, total - 1)];
  const descuento = Math.round((1 - p.oferta / p.precio) * 100);
  const mover = paso => setIndice(i => (i + paso + total) % total);

  return (
    <section
      className="ficha-oferta"
      aria-roledescription="carrusel"
      aria-label="Productos en oferta"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div className="ficha-cabecera">
        <strong>En oferta ahora</strong>
        {total > 1 && (
          <div className="ficha-controles">
            <span className="text-muted" aria-live={pausado ? 'polite' : 'off'}>{indice + 1} de {total}</span>
            <button type="button" className="btn btn-sm btn-secondary" aria-label="Oferta anterior" onClick={() => mover(-1)}>
              <i className="bi bi-chevron-left" aria-hidden="true"></i>
            </button>
            <button type="button" className="btn btn-sm btn-secondary" aria-label="Oferta siguiente" onClick={() => mover(1)}>
              <i className="bi bi-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>
      <div className="ficha-img">
        <img src={urlImagen(p.imagen)} alt={p.titulo} />
      </div>
      <h3 className="ficha-nombre">{p.titulo}</h3>
      <div className="ficha-precios">
        <span className="precio-ahora">{formatoPrecio(precioFinal(p))}</span>
        <span className="precio-antes">{formatoPrecio(p.precio)}</span>
        <span className="dcto">-{descuento}%</span>
      </div>
      <p className={`ficha-stock${p.stock <= 5 ? ' ficha-stock-bajo' : ''}`}>
        {p.stock <= 5 ? `Quedan solo ${p.stock} unidades` : `${p.stock} unidades disponibles`}
      </p>
      <Link to={`/productos/${p.id}`} className="btn btn-dark w-100">Ver detalle</Link>
    </section>
  );
}
