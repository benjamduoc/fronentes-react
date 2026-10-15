Tienda online de componentes de computación (tarjetas de video, procesadores, monitores, memoria RAM y almacenamiento) con un panel de administración.

## Tecnologías

- React 19 y React Router 7 (rutas públicas y rutas de administrador)
- Bootstrap 5 y Bootstrap Icons (diseño responsivo)
- Vite 7 (servidor de desarrollo y build)
- Estado global con Context API: sesión, datos y carrito
- Persistencia en `localStorage` y `sessionStorage`

## Qué contiene

1. **Tienda (pública):** lo que ve el cliente.
2. **Administrador (`/admin`):** gestión de productos, categorías, usuarios, órdenes y reportes. Solo accede un usuario con rol admin.

## Funciones de la tienda

| Función | Descripción |
|---|---|
| Inicio | Presentación, ficha rotativa de productos en oferta, índice de categorías con cantidad de productos y productos destacados |
| Productos, Ofertas y Categorías | Listado completo, solo productos con descuento, y productos filtrados por categoría |
| Detalle de producto | Imagen, precio neto, IVA, precio final, stock disponible y botón "Agregar al carrito" |
| Carrito | Cambiar cantidades (sin superar el stock), eliminar productos, limpiar el carrito y ver el total. Se conserva al recargar la página |
| Checkout | Datos del cliente y dirección de entrega (región y comuna encadenadas) con validación. Si el usuario inició sesión, el formulario se autocompleta |
| Pago correcto | Comprobante con número de orden, datos del cliente, dirección, detalle y total. Permite imprimir la boleta y enviarla por correo |
| Pago con error | Muestra el motivo, el detalle de la compra y el botón "Volver a realizar el pago", que recupera los datos ingresados |
| Registro e inicio de sesión | Registro con validación (RUT, correo, confirmación de contraseña) e inicio de sesión. Redirige al panel si el usuario es admin |
| Blog, Nosotros y Contacto | Dos artículos con su detalle, información de la empresa y formulario de contacto que guarda los mensajes |
| Navbar | Navegación, menú de categorías y carrito con cantidad y total siempre visibles |

### Flujo de compra

```
Carrito (/carrito) -> Checkout (/checkout) -> Pago correcto (/pago-correcto/:id)
                                          \-> Pago con error (/pago-error) -> reintento en /checkout
```

Al pagar correctamente se crea la orden (con cliente, dirección y estado), se descuenta el stock y se vacía el carrito. Si el pago falla, el carrito y el stock no cambian.

El pago es simulado. En el checkout hay una casilla "Simular pago rechazado (solo para pruebas)" para mostrar la vista de error. El pago también falla si algún producto no tiene stock suficiente.

# Fronentes (React)

Migración a React de la tienda `fronentes` (HTML + JS plano). Mismo aspecto y mismo comportamiento;
los datos siguen viviendo en `localStorage`.

## Uso
Requiere Node 20.19+ o 22.12+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run preview    # sirve dist/
```

## Accesos de prueba
- Admin: admin@gmail.com / admin123 → `/admin`
- Cliente: benja@duoc.cl / 1234
