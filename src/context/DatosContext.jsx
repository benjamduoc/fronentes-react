import { createContext, useContext, useMemo } from 'react';
import { useAlmacenado } from '../hooks/useAlmacenado';
import categoriasInicial from '../bdd/categorias.json';
import contactosInicial from '../bdd/contactos.json';
import ordenesInicial from '../bdd/ordenes.json';
import productosInicial from '../bdd/productos.json';
import usuariosInicial from '../bdd/usuarios.json';

const DatosContext = createContext(null);

export function DatosProvider({ children }) {
  const [productos, setProductos] = useAlmacenado('productos', productosInicial);
  const [categorias, setCategorias] = useAlmacenado('categorias', categoriasInicial);
  const [usuarios, setUsuarios] = useAlmacenado('usuarios', usuariosInicial);
  const [ordenes, setOrdenes] = useAlmacenado('ordenes', ordenesInicial);
  const [contactos, setContactos] = useAlmacenado('contactos', contactosInicial);

  const valor = useMemo(
    () => ({
      productos, setProductos,
      categorias, setCategorias,
      usuarios, setUsuarios,
      ordenes, setOrdenes,
      contactos, setContactos,
    }),
    [productos, categorias, usuarios, ordenes, contactos, setProductos, setCategorias, setUsuarios, setOrdenes, setContactos]
  );
  return <DatosContext.Provider value={valor}>{children}</DatosContext.Provider>;
}

export function useDatos() {
  const ctx = useContext(DatosContext);
  if (!ctx) throw new Error('useDatos debe usarse dentro de <DatosProvider>');
  return ctx;
}
