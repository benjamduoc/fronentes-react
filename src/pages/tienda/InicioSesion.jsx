import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDatos } from '../../context/DatosContext';
import { useSesion } from '../../context/SesionContext';
import { useFormulario } from '../../hooks/useFormulario';
import { usePagina } from '../../hooks/usePagina';
import { generarId, urlImagen } from '../../utils/formato';

const REGIONES = [
  ['metropolitana', 'Metropolitana'], ['aisen', 'Aisen'], ['antofagasta', 'Antofagasta'],
  ['araucanía', 'Araucanía'], ['arica y parinacota', 'Arica Y Parinacota'], ['atacama', 'Atacama'],
  ['biobio', 'Biobio'], ['coquimbo', 'Coquimbo'], ['libertador bernardo', 'Libertador Bernardo'],
  ['los lagos', 'Los Lagos'], ['los rios', 'Los Rios'], ['magallanes', 'Magallanes'],
  ['maule', 'Maule'], ['ñuble', 'Ñuble'], ['tarapaca', 'Tarapaca'], ['valparaiso', 'Valparaiso'],
];

const LOGIN_VACIO = { correo: '', contrasena: '' };
const REGISTRO_VACIO = {
  nombre_completo: '', rut: '', correo: '', contrasena: '', contrasenaConf: '',
  telefono: '', region: '', comuna: '',
};

function Campo({ id, etiqueta, ancho, children }) {
  return (
    <div className={`login-campo${ancho ? ' login-ancho' : ''}`}>
      <label htmlFor={id}>{etiqueta}</label>
      {children}
    </div>
  );
}

export default function InicioSesion() {
  usePagina('Inicio Sesion', 'pagina-login');
  const { usuarios, setUsuarios } = useDatos();
  const { sesion, iniciarSesion } = useSesion();
  const login = useFormulario(LOGIN_VACIO);
  const registro = useFormulario(REGISTRO_VACIO);
  const [vista, setVista] = useState('login');
  const [mensaje, setMensaje] = useState(null);

  const enRegistro = vista === 'registro';
  const avisar = (texto, tipo) => setMensaje({ texto, tipo });
  const cambiarVista = nueva => {
    setVista(nueva);
    setMensaje(null);
  };

  if (sesion) return <Navigate to={sesion.rol === 'admin' ? '/admin' : '/'} replace />;

  function entrar(e) {
    e.preventDefault();
    const correo = login.valores.correo.trim();
    const usuario = usuarios.find(u => u.correo === correo && u.contrasena === login.valores.contrasena);
    if (!usuario) return avisar('Correo o contraseña incorrectos', 'danger');
    iniciarSesion(usuario);
  }

  function registrar(e) {
    e.preventDefault();
    const f = registro.valores;
    if (f.contrasena !== f.contrasenaConf) return avisar('Las contraseñas no coinciden', 'danger');
    const correo = f.correo.trim();
    if (usuarios.some(u => u.correo === correo)) return avisar('Ese correo ya está registrado', 'danger');
    setUsuarios([
      ...usuarios,
      {
        id: generarId('US', usuarios, 3), nombre_completo: f.nombre_completo.trim(), rut: f.rut,
        correo, contrasena: f.contrasena, telefono: f.telefono,
        region: f.region, comuna: f.comuna, rol: 'cliente',
      },
    ]);
    registro.reiniciar();
    setVista('login');
    avisar('Registro exitoso, ya puedes iniciar sesión', 'success');
  }

  return (
    <main>
      <div className="login-tarjeta">
        <aside className="login-marca">
          <img src={urlImagen('img/Logo_de_empresa_2.png')} alt="Logo Fronentes" />
          <h1>FRONENTES</h1>
          <p>Componentes y tecnología para armar tu equipo. Entra a tu cuenta para comprar y seguir tus pedidos.</p>
          <div className="login-cambio">
            {enRegistro ? (
              <>¿Ya tienes cuenta? <button type="button" onClick={() => cambiarVista('login')}>Inicia sesión</button></>
            ) : (
              <>¿Aún no tienes cuenta? <button type="button" onClick={() => cambiarVista('registro')}>Regístrate</button></>
            )}
          </div>
        </aside>

        <section className="login-panel">
          <div className="login-pestanas" role="tablist" aria-label="Acceso a la cuenta">
            <button type="button" role="tab" aria-selected={!enRegistro} onClick={() => cambiarVista('login')}>
              Iniciar sesión
            </button>
            <button type="button" role="tab" aria-selected={enRegistro} onClick={() => cambiarVista('registro')}>
              Crear cuenta
            </button>
          </div>

          {mensaje && (
            <div className={`alert alert-${mensaje.tipo} login-mensaje`} role="alert">{mensaje.texto}</div>
          )}

          {!enRegistro ? (
            <form className="login-form" onSubmit={entrar}>
              <div>
                <h2>Bienvenido de vuelta</h2>
                <p className="login-sub">Ingresa tus datos para continuar.</p>
              </div>
              <Campo id="login-correo" etiqueta="Correo electrónico">
                <input
                  id="login-correo" type="email" maxLength={100} placeholder="tucorreo@ejemplo.cl" name="correo"
                  autoComplete="email" value={login.valores.correo} onChange={login.cambiar} required
                />
              </Campo>
              <Campo id="login-contrasena" etiqueta="Contraseña">
                <input
                  id="login-contrasena" type="password" minLength={4} maxLength={10} placeholder="Tu contraseña" name="contrasena"
                  autoComplete="current-password" value={login.valores.contrasena} onChange={login.cambiar} required
                />
              </Campo>
              <button className="login-boton">Iniciar sesión</button>
            </form>
          ) : (
            <form className="login-form login-form--doble" onSubmit={registrar}>
              <div className="login-ancho">
                <h2>Crea tu cuenta</h2>
                <p className="login-sub">Solo toma un minuto.</p>
              </div>
              <Campo id="reg-nombre" etiqueta="Nombre completo" ancho>
                <input
                  id="reg-nombre" type="text" maxLength={100} name="nombre_completo" autoComplete="name"
                  value={registro.valores.nombre_completo} onChange={registro.cambiar} required
                />
              </Campo>
              <Campo id="reg-rut" etiqueta="RUT">
                <input
                  id="reg-rut" type="text" minLength={8} maxLength={9} pattern="\d{7,8}[0-9kK]" placeholder="12345678K" name="rut"
                  value={registro.valores.rut} onChange={registro.cambiar} required
                />
              </Campo>
              <Campo id="reg-telefono" etiqueta="Teléfono">
                <input
                  id="reg-telefono" type="text" name="telefono" autoComplete="tel"
                  value={registro.valores.telefono} onChange={registro.cambiar} required
                />
              </Campo>
              <Campo id="reg-correo" etiqueta="Correo electrónico" ancho>
                <input
                  id="reg-correo" type="email" maxLength={100} name="correo" autoComplete="email"
                  value={registro.valores.correo} onChange={registro.cambiar} required
                />
              </Campo>
              <Campo id="reg-contrasena" etiqueta="Contraseña">
                <input
                  id="reg-contrasena" type="password" minLength={4} maxLength={10} name="contrasena" autoComplete="new-password"
                  value={registro.valores.contrasena} onChange={registro.cambiar} required
                />
              </Campo>
              <Campo id="reg-contrasena-conf" etiqueta="Confirmar contraseña">
                <input
                  id="reg-contrasena-conf" type="password" minLength={4} maxLength={10} name="contrasenaConf" autoComplete="new-password"
                  value={registro.valores.contrasenaConf} onChange={registro.cambiar} required
                />
              </Campo>
              <Campo id="region" etiqueta="Región">
                <select id="region" name="region" value={registro.valores.region} onChange={registro.cambiar} required>
                  <option value="">Seleccione la región</option>
                  {REGIONES.map(([valor, texto]) => (
                    <option key={valor} value={valor}>{texto}</option>
                  ))}
                </select>
              </Campo>
              <Campo id="reg-comuna" etiqueta="Comuna">
                <input
                  id="reg-comuna" type="text" name="comuna"
                  value={registro.valores.comuna} onChange={registro.cambiar} required
                />
              </Campo>
              <button className="login-boton login-ancho">Crear cuenta</button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
