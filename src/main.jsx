import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './css/productos.css';
import './css/login.css';
import './css/registroProductos.css';
import './css/estilo.css';
import './css/tema.css';
import './css/react.css';

import App from './App';
import { CarritoProvider } from './context/CarritoContext';
import { DatosProvider } from './context/DatosContext';
import { SesionProvider } from './context/SesionContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <SesionProvider>
        <DatosProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </DatosProvider>
      </SesionProvider>
    </BrowserRouter>
  </StrictMode>
);
