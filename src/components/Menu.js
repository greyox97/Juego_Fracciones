import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div>
      <h1 tabIndex={0}>Juego de Fracciones</h1>
      
      {/* Aseguramos que el lector de pantalla pueda leer esta sección */}
      <section aria-labelledby="menu-instructions">
        <h2 id="menu-instructions" tabIndex={0}>Selecciona una categoría:</h2>

        <ul>
          <li>
            <Link to="/decimales-a-fracciones" className="menu-item" aria-label="Decimales a Fracciones">
              Decimales a Fracciones
            </Link>
          </li>
          <li>
            <Link to="/relacion-orden-fracciones" className="menu-item" aria-label="Relación de Orden entre Fracciones">
              Relación de Orden entre Fracciones
            </Link>
          </li>
          <li>
            <Link to="/tipos-de-fracciones" className="menu-item" aria-label="Tipos de Fracciones">
              Tipos de Fracciones
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Menu;
