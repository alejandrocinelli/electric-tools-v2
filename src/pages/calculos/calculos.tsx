import React from 'react';
import { Link } from 'react-router-dom';



const Calculos = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Cálculos eléctricos y térmicos</h1>

      <p className="text-gray-600 mb-8">
        Herramientas rápidas para convertir entre unidades de potencia eléctrica y climatización. Elegí el cálculo que necesitás.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/calculos/kw-a-amperes"
          className="border rounded-xl p-4 shadow bg-white hover:shadow-lg transition cursor-pointer block"
        >
          <h2 className="text-xl font-semibold mb-2">⚡ kW a Amperes (trifásico)</h2>
          <p className="text-sm text-gray-500">
            Conversión de potencia activa a corriente en un sistema trifásico.
          </p>
        </Link>

        <Link
          to="/calculos/kw-a-kva"
          className="border rounded-xl p-4 shadow bg-white hover:shadow-lg transition cursor-pointer block"
        >
          <h2 className="text-xl font-semibold mb-2">🔌 KW a KVA / KVA A KW </h2>
          <p className="text-sm text-gray-500">Conversión con factor de potencia.</p>
        </Link>

        <Link
          to="/calculos/frigorias-a-kw"
          className="border rounded-xl p-4 shadow bg-white hover:shadow-lg transition cursor-pointer block"
        >
          <h2 className="text-xl font-semibold mb-2">❄️ Frigorías a kW</h2>
          <p className="text-sm text-gray-500">Para dimensionar equipos de aire acondicionado.</p>
        </Link>

        {/* Podés seguir agregando más cards así */}
      </div>
    </div>
  );
};

export default Calculos;
