import { Route, Routes } from 'react-router-dom';
import LayoutAdmin from './components/LayoutAdmin';
import LayoutTienda from './components/LayoutTienda';
import RutaAdmin from './components/RutaAdmin';
import ScrollArriba from './components/ScrollArriba';

import Blog from './pages/tienda/Blog';
import BlogDetalle from './pages/tienda/BlogDetalle';
import Carrito from './pages/tienda/Carrito';
import Categorias from './pages/tienda/Categorias';
import Checkout from './pages/tienda/Checkout';
import Contacto from './pages/tienda/Contacto';
import DetalleProducto from './pages/tienda/DetalleProducto';
import Inicio from './pages/tienda/Inicio';
import InicioSesion from './pages/tienda/InicioSesion';
import { Ofertas, Productos, ProductosDeCategoria } from './pages/tienda/Listados';
import NoEncontrada from './pages/tienda/NoEncontrada';
import Nosotros from './pages/tienda/Nosotros';
import PagoCorrecto from './pages/tienda/PagoCorrecto';
import PagoError from './pages/tienda/PagoError';

import Boleta from './pages/admin/Boleta';
import CategoriasAdmin from './pages/admin/CategoriasAdmin';
import Dashboard from './pages/admin/Dashboard';
import DetalleUsuario from './pages/admin/DetalleUsuario';
import FormCategoria from './pages/admin/FormCategoria';
import FormProducto from './pages/admin/FormProducto';
import FormUsuario from './pages/admin/FormUsuario';
import HistorialCompras from './pages/admin/HistorialCompras';
import Ordenes from './pages/admin/Ordenes';
import Perfil from './pages/admin/Perfil';
import ProductosAdmin from './pages/admin/ProductosAdmin';
import ProductosCriticos from './pages/admin/ProductosCriticos';
import ReporteProductos from './pages/admin/ReporteProductos';
import Reportes from './pages/admin/Reportes';
import UsuariosAdmin from './pages/admin/UsuariosAdmin';

export default function App() {
  return (
    <>
      <ScrollArriba />
      <Routes>
        <Route element={<LayoutTienda />}>
          <Route index element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="productos/:id" element={<DetalleProducto />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="categorias/:id" element={<ProductosDeCategoria />} />
          <Route path="ofertas" element={<Ofertas />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetalle />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="pago-correcto/:id" element={<PagoCorrecto />} />
          <Route path="pago-error" element={<PagoError />} />
          <Route path="inicio-sesion" element={<InicioSesion />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>

        <Route
          path="admin"
          element={
            <RutaAdmin>
              <LayoutAdmin />
            </RutaAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="ordenes" element={<Ordenes />} />
          <Route path="ordenes/:id" element={<Boleta />} />
          <Route path="productos" element={<ProductosAdmin />} />
          <Route path="productos/nuevo" element={<FormProducto />} />
          <Route path="productos/:id/editar" element={<FormProducto />} />
          <Route path="productos/criticos" element={<ProductosCriticos />} />
          <Route path="productos/reportes" element={<ReporteProductos />} />
          <Route path="categorias" element={<CategoriasAdmin />} />
          <Route path="categorias/nueva" element={<FormCategoria />} />
          <Route path="categorias/:id/editar" element={<FormCategoria />} />
          <Route path="usuarios" element={<UsuariosAdmin />} />
          <Route path="usuarios/nuevo" element={<FormUsuario />} />
          <Route path="usuarios/:id" element={<DetalleUsuario />} />
          <Route path="usuarios/:id/editar" element={<FormUsuario />} />
          <Route path="usuarios/:id/historial" element={<HistorialCompras />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </>
  );
}
