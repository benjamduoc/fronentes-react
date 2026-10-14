import { Link } from 'react-router-dom';
import { usePagina } from '../../hooks/usePagina';

export default function NoEncontrada() {
  usePagina('Página no encontrada');
  return (
    <main className="container my-4">
      <div className="mensaje-estado">
        <i className="bi bi-question-circle-fill display-1"></i>
        <h1 className="mt-2">Página no encontrada</h1>
        <p>La dirección que buscas no existe.</p>
        <Link to="/" className="btn btn-dark">Volver al inicio</Link>
      </div>
    </main>
  );
}
