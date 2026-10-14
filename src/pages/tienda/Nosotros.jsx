import { usePagina } from '../../hooks/usePagina';

const PANELES = [
  ['history', 'bi-clock-history', '2020', 'Nuestra historia'],
  ['warranty', 'bi-shield-check', '12 meses', 'Garantía'],
  ['values', 'bi-heart', 'Siempre', 'Nuestros valores'],
];

export default function Nosotros() {
  usePagina('Sobre Nosotros');
  return (
    <main className="container my-4">
      <div className="wireframe-box p-4 mb-4">
        <h1 className="fw-bold">Sobre Nosotros</h1>
        <p>
          Somos Fronentes, una tienda de componentes de computación enfocada en ofrecer buenos precios, garantía real y
          atención cercana a todo el país.
        </p>
      </div>
      <div className="row g-4 mb-5">
        {PANELES.map(([variante, icono, ano, leyenda]) => (
          <div key={variante} className="col-md-4 story-panel-wrap">
            <div className={`story-panel story-panel--${variante}`}>
              <span className="story-year">{ano}</span>
              <div className="story-icon-circle">
                <i className={`bi ${icono} story-icon`}></i>
              </div>
              <span className="story-caption">{leyenda}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
