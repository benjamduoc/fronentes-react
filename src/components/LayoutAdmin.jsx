import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSesion } from '../context/SesionContext';
import { urlImagen } from '../utils/formato';

const MENU = [
  ['/admin', 'Dashboard', true],
  ['/admin/ordenes', 'Órdenes / Boletas'],
  ['/admin/productos', 'Productos'],
  ['/admin/categorias', 'Categorías'],
  ['/admin/usuarios', 'Usuarios'],
  ['/admin/reportes', 'Reportes'],
  ['/admin/perfil', 'Perfil'],
];
const CLASES_ENLACE = 'nav-link link-secondary text-decoration-none text-white';

export default function LayoutAdmin() {
  const { cerrarSesion } = useSesion();
  const navigate = useNavigate();

  function salir(e) {
    e.preventDefault();
    cerrarSesion();
    navigate('/inicio-sesion');
  }

  return (
    <div className="container-fluid flex-grow-1 p-0">
      <div className="row m-0 min-vh-100">
        <div className="col-2 col-sm-3 col-xl-2 bg-dark">
          <nav className="navbar bg-dark border-bottom border-body mb-3" data-bs-theme="dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#" onClick={e => e.preventDefault()}>
                <img src={urlImagen('img/Logo_de_empresa_2.png')} alt="Logo" width="150" height="90" />
              </a>
            </div>
          </nav>
          <nav className="nav flex-column admin-menu">
            {MENU.map(([ruta, texto, exacto]) => (
              <NavLink key={ruta} className={CLASES_ENLACE} to={ruta} end={exacto}>{texto}</NavLink>
            ))}
            <Link className={CLASES_ENLACE} to="/">Página Tienda</Link>
            <a className={CLASES_ENLACE} href="#" onClick={salir}>Cerrar Sesión</a>
          </nav>
        </div>
        <div className="col-10 col-sm-9 col-xl-10 p-0 m-0">
          <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item"><h3 style={{ color: '#ffffff' }}>Fronentes</h3></li>
              </ul>
            </div>
          </nav>
          <div className="admin-contenido">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
