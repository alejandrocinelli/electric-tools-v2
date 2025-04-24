// src/components/Navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-violet-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Herramientas de Capacidad
        </h1>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <div className={`md:flex space-x-6 ${open ? 'block' : 'hidden'} md:block`}>
          <Link to="/" className="block py-2">Inicio</Link>
          <Link to="/calculos" className="block py-2">Cálculos</Link>
          <Link to="/links" className="block py-2">Tutoriales</Link>
          <Link to="/documentacion" className="block py-2">Documentación</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
