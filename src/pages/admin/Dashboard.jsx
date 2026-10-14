import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';

export default function Dashboard() {
  usePagina('Dashboard - ADMI');
  const { productos, usuarios, ordenes } = useDatos();
  const datos = [
    ['Productos', productos.length, 'bi-box-seam'],
    ['Usuarios', usuarios.length, 'bi-people'],
    ['Órdenes', ordenes.length, 'bi-receipt'],
    ['Críticos', productos.filter(p => p.stock <= 5).length, 'bi-exclamation-triangle'],
  ];
  return (
    <>
      <h2>Home / Dashboard</h2>
      <div className="row g-3">
        {datos.map(([titulo, cantidad, icono]) => (
          <div key={titulo} className="col-6 col-md-3">
            <div className="tarjeta-dato">
              <i className={`bi ${icono}`}></i>
              <h2>{cantidad}</h2>
              {titulo}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
