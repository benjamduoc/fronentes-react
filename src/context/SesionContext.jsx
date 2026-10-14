import { createContext, useCallback, useContext, useMemo } from 'react';
import { useAlmacenado } from '../hooks/useAlmacenado';

const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  const [sesion, setSesion] = useAlmacenado('sesion', null, window.sessionStorage);

  const iniciarSesion = useCallback(
    usuario => setSesion({ id: usuario.id, nombre: usuario.nombre_completo, correo: usuario.correo, rol: usuario.rol }),
    [setSesion]
  );
  const cerrarSesion = useCallback(() => setSesion(null), [setSesion]);
  const actualizarSesion = useCallback(cambios => setSesion(s => (s ? { ...s, ...cambios } : s)), [setSesion]);

  const valor = useMemo(
    () => ({ sesion, iniciarSesion, cerrarSesion, actualizarSesion }),
    [sesion, iniciarSesion, cerrarSesion, actualizarSesion]
  );
  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  const ctx = useContext(SesionContext);
  if (!ctx) throw new Error('useSesion debe usarse dentro de <SesionProvider>');
  return ctx;
}
