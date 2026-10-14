import { useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Collapse } from 'bootstrap';
import { useCarrito } from '../context/CarritoContext';
import { useDatos } from '../context/DatosContext';
import { useSesion } from '../context/SesionContext';
import { totalCarrito } from '../utils/checkout';
import { formatoPrecio, urlImagen } from '../utils/formato';

const ENLACES_IZQUIERDA = [
  ['/', 'Home', true],
  ['/productos', 'Productos'],
  ['/categorias', 'Categorías'],
  ['/ofertas', 'Ofertas'],
  ['/nosotros', 'Nosotros'],
];
const ENLACES_DERECHA = [
  ['/blog', 'Blogs'],
  ['/contacto', 'Contactos'],
];

function ItemMenu({ ruta, texto, exacto }) {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={ruta} end={exacto}>
        {texto}
      </NavLink>
    </li>
  );
}

export default function Navbar() {
  const { sesion, cerrarSesion } = useSesion();
  const { carrito, cantidadTotal } = useCarrito();
  const { productos } = useDatos();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const menu = document.getElementById('navbarSupportedContent');
    if (menu) Collapse.getInstance(menu)?.hide();
  }, [pathname]);

  function salir(e) {
    e.preventDefault();
    cerrarSesion();
    navigate('/inicio-sesion');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={urlImagen('img/Logo_de_empresa_2.png')} alt="Logo" width="90" height="55" className="d-inline-block align-middle" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center">
            {ENLACES_IZQUIERDA.map(([ruta, texto, exacto]) => (
              <ItemMenu key={ruta} ruta={ruta} texto={texto} exacto={exacto} />
            ))}
            {sesion ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={e => e.preventDefault()}>
                  {sesion.nombre}
                </a>
                <ul className="dropdown-menu">
                  {sesion.rol === 'admin' && (
                    <li>
                      <Link className="dropdown-item" to="/admin">Panel de administración</Link>
                    </li>
                  )}
                  <li>
                    <a className="dropdown-item" href="#" onClick={salir}>Cerrar Sesión</a>
                  </li>
                </ul>
              </li>
            ) : (
              <ItemMenu ruta="/inicio-sesion" texto="Iniciar Sesión" />
            )}
            {ENLACES_DERECHA.map(([ruta, texto]) => (
              <ItemMenu key={ruta} ruta={ruta} texto={texto} />
            ))}
          </ul>
        </div>
        <Link to="/carrito" className="d-flex align-items-center gap-2 cart-link">
          <i className="bi bi-cart-fill" aria-hidden="true"></i>
          <span>Carrito</span>
          <span className="cart-count" aria-label={`${cantidadTotal} productos`}>{cantidadTotal}</span>
          <span className="cart-total">{formatoPrecio(totalCarrito(carrito, productos))}</span>
        </Link>
      </div>
    </nav>
  );
}
