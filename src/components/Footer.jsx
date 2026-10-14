import { Link } from 'react-router-dom';
import { urlImagen } from '../utils/formato';

const ENLACES = [
  ['/', 'Home'],
  ['/productos', 'Productos'],
  ['/nosotros', 'Nosotros'],
  ['/blog', 'Blog'],
  ['/admin', 'Admi'],
  ['/contacto', 'Contacto'],
];

export default function Footer() {
  return (
    <footer className="mt-auto py-5 text-center">
      <div className="container">
        <h4 className="mb-3" style={{ color: '#ffffff' }}>
          <img src={urlImagen('img/Logo_de_empresa_2.png')} alt="Logo" width="90" height="55" className="d-inline-block align-middle" />{' '}
          Fronentes
        </h4>
        <ul className="list-inline mb-4">
          {ENLACES.map(([ruta, texto]) => (
            <li key={ruta} className="list-inline-item mx-3">
              <Link className="link-secondary text-decoration-none text-white" to={ruta}>{texto}</Link>
            </li>
          ))}
        </ul>
        <span className="small text-white">&copy; 2026 Fronentes</span>
      </div>
    </footer>
  );
}
