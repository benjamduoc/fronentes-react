import { useParams } from 'react-router-dom';
import TarjetaProducto from '../../components/TarjetaProducto';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';

function Listado({ titulo, productos }) {
  return (
    <main className="container my-4">
      <h2 className="titulos">{titulo}</h2>
      <div className="row g-4 mb-5">
        {productos.length ? (
          productos.map(p => <TarjetaProducto key={p.id} producto={p} />)
        ) : (
          <p className="text-muted">No hay productos para mostrar.</p>
        )}
      </div>
    </main>
  );
}

export function Productos() {
  usePagina('Productos', 'pagina-productos');
  const { productos } = useDatos();
  return <Listado titulo="Productos" productos={productos} />;
}

export function Ofertas() {
  usePagina('Ofertas', 'pagina-productos');
  const { productos } = useDatos();
  return <Listado titulo="Ofertas" productos={productos.filter(p => p.oferta > 0)} />;
}

export function ProductosDeCategoria() {
  usePagina('Categoría', 'pagina-productos');
  const { id } = useParams();
  const { productos, categorias } = useDatos();
  const categoria = categorias.find(c => c.id === id);
  return (
    <Listado
      titulo={categoria ? categoria.nombre : 'Categoría'}
      productos={productos.filter(p => p.categoria === id)}
    />
  );
}
