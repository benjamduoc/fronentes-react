import { Navigate } from 'react-router-dom';
import { useSesion } from '../context/SesionContext';

export default function RutaAdmin({ children }) {
  const { sesion } = useSesion();
  if (!sesion || sesion.rol !== 'admin') return <Navigate to="/inicio-sesion" replace />;
  return children;
}
