import { createContext, useCallback, useContext, useMemo } from 'react';
import { useAlmacenado } from '../hooks/useAlmacenado';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useAlmacenado('carrito', []);

  const agregar = useCallback(
    idProducto =>
      setCarrito(c =>
        c.some(i => i.id === idProducto)
          ? c.map(i => (i.id === idProducto ? { ...i, cantidad: i.cantidad + 1 } : i))
          : [...c, { id: idProducto, cantidad: 1 }]
      ),
    [setCarrito]
  );
  const cambiarCantidad = useCallback(
    (idProducto, delta) =>
      setCarrito(c =>
        c.map(i => (i.id === idProducto ? { ...i, cantidad: i.cantidad + delta } : i)).filter(i => i.cantidad > 0)
      ),
    [setCarrito]
  );
  const quitar = useCallback(idProducto => setCarrito(c => c.filter(i => i.id !== idProducto)), [setCarrito]);
  const vaciar = useCallback(() => setCarrito([]), [setCarrito]);
  const cantidadTotal = useMemo(() => carrito.reduce((suma, i) => suma + i.cantidad, 0), [carrito]);

  const valor = useMemo(
    () => ({ carrito, cantidadTotal, agregar, cambiarCantidad, quitar, vaciar }),
    [carrito, cantidadTotal, agregar, cambiarCantidad, quitar, vaciar]
  );
  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  return ctx;
}
