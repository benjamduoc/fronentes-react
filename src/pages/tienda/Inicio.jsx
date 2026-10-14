import { Link } from 'react-router-dom';
import OfertasDestacadas from '../../components/OfertasDestacadas';
import TarjetaProducto from '../../components/TarjetaProducto';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';

const BENEFICIOS = [
  ['bi-truck', 'Despacho a todo Chile', 'Recibe tus componentes donde estés'],
  ['bi-shield-check', '12 meses de garantía', 'Respaldo en cada producto'],
  ['bi-credit-card-2-front', 'Pago seguro', 'Compra con confianza'],
];

export default function Inicio() {
  usePagina('Bienvenido');
  const { productos, categorias } = useDatos();
  const ofertas = productos.filter(p => p.oferta > 0);

  return (
    <main className="container my-4">
      <section className="wireframe-box hero-placa" aria-labelledby="titulo-inicio">
        <div className="row align-items-center g-4">
          <div className={ofertas.length ? 'col-lg-7' : 'col-12'}>
            <h1 id="titulo-inicio">Arma tu PC pieza por pieza</h1>
            <p className="hero-sub">
              Tarjetas de video, procesadores, monitores, memoria y almacenamiento, con el stock a la vista y despacho a todo Chile.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/productos" className="btn btn-custom btn-lg">Ver productos</Link>
              <Link to="/ofertas" className="btn btn-outline-light btn-lg">Ver ofertas</Link>
            </div>
          </div>
          {ofertas.length > 0 && (
            <div className="col-lg-5">
              <OfertasDestacadas productos={ofertas} />
            </div>
          )}
        </div>
      </section>

      <nav className="indice-categorias" aria-label="Categorías">
        {categorias.map(c => (
          <Link key={c.id} to={`/categorias/${c.id}`}>
            <span className="indice-nombre">{c.nombre}</span>
            <span className="indice-cantidad">{productos.filter(p => p.categoria === c.id).length} productos</span>
          </Link>
        ))}
      </nav>

      <div className="beneficios">
        {BENEFICIOS.map(([icono, titulo, detalle]) => (
          <div key={titulo} className="beneficio">
            <i className={`bi ${icono}`} aria-hidden="true"></i>
            <div>
              <strong>{titulo}</strong>
              <br />
              <small>{detalle}</small>
            </div>
          </div>
        ))}
      </div>

      <h2 className="titulos">Productos destacados</h2>
      <div className="row g-4 mb-5">
        {productos.slice(0, 8).map(p => (
          <TarjetaProducto key={p.id} producto={p} />
        ))}
      </div>
    </main>
  );
}
