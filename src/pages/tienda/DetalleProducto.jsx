import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { useDatos } from '../../context/DatosContext';
import { usePagina } from '../../hooks/usePagina';
import { desglosarIVA, precioFinal, urlImagen } from '../../utils/formato';

export default function DetalleProducto() {
  usePagina('Detalle del producto', 'pagina-productos');
  const { id } = useParams();
  const { productos } = useDatos();
  const { agregar } = useCarrito();
  const [agregado, setAgregado] = useState(false);
  const producto = productos.find(p => p.id === id);

  useEffect(() => {
    setAgregado(false);
  }, [id]);

  if (!producto) {
    return (
      <main className="container my-4">
        <div className="container-presentacion">
          <div className="card-productos">
            <h1>Producto no encontrado</h1>
          </div>
        </div>
      </main>
    );
  }

  const total = precioFinal(producto);
  const { neto, iva } = desglosarIVA(total);

  function alAgregar() {
    agregar(producto.id);
    setAgregado(true);
  }

  return (
    <main className="container my-4">
      <div className="container-presentacion">
        <div className="card-productos">
          <h1>{producto.titulo}</h1>
          <img src={urlImagen(producto.imagen)} className="card-productos-img" alt="producto-detalle" />
        </div>
        <div className="card-precios">
          <div className="card-precios-detalles">
            <p>Precio neto: ${neto.toLocaleString('es-CL')}</p>
            <p>IVA (19%): ${iva.toLocaleString('es-CL')}</p>
            <strong>
              <p>Precio TOTAL: ${total.toLocaleString('es-CL')}</p>
            </strong>
            <p>Stock disponible: {producto.stock}</p>
          </div>
          <button type="button" className="btn btn-info btn-lg btn-carrito" onClick={alAgregar}>
            {agregado ? 'Agregado ✔' : 'Agregar al carrito'}
          </button>
        </div>
      </div>

      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelUno" aria-expanded="true">
              Descripción del producto
            </button>
          </h2>
          <div id="panelUno" className="accordion-collapse collapse show">
            <div className="accordion-body">Próximamente descripciones del producto disponibles (en construcción)</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelDos" aria-expanded="false">
              Características
            </button>
          </h2>
          <div id="panelDos" className="accordion-collapse collapse">
            <div className="accordion-body">Característica 1</div>
          </div>
        </div>
      </div>
    </main>
  );
}
