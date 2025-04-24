import { useState } from "react";

const KWToAmperesForm = () => {
  const [potencia, setPotencia] = useState("");
  const [tension, setTension] = useState("380"); // Valor por defecto
  const [fp, setFp] = useState("0.95"); // Valor por defecto
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    // Verificar si hay campos vacíos
    if (!potencia || !tension || !fp) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const p = parseFloat(potencia);
    const v = parseFloat(tension);
    const f = parseFloat(fp);

    if (f < 0.8 || f > 1 || v < 360 || v > 420) {
      alert("Valores fuera del rango permitido.");
      return;
    }

    const amperes = (p * 1000) / (Math.sqrt(3) * v * f);
    setResultado(amperes);
  };

  const reset = () => {
    setPotencia("");
    setTension("380"); // Resetea al valor por defecto
    setFp("0.95"); // Resetea al valor por defecto
    setResultado(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Formulario */}
      <div className="w-full md:w-1/2 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Conversión de kW a Amperes Trifasico</h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Potencia (kW)</label>
          <input
            type="number"
            value={potencia}
            onChange={(e) => setPotencia(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Tensión (V)</label>
          <input
            type="number"
            value={tension}
            onChange={(e) => setTension(e.target.value)}
            className="w-full border rounded px-3 py-2"
            min={360}
            max={420}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Factor de Potencia (fp)</label>
          <input
            type="number"
            value={fp}
            onChange={(e) => setFp(e.target.value)}
            className="w-full border rounded px-3 py-2"
            min={0.8}
            max={1}
            step={0.01}
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={calcular}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Calcular
          </button>
          <button
            onClick={reset}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>

        {resultado !== null && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            Resultado: <strong>{resultado.toFixed(2)} A</strong>
          </div>
        )}
      </div>

      {/* Panel informativo */}
      <div className="w-full md:w-1/2 bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-4">Guía rápida de factor de potencia</h3>
        <ul className="list-disc pl-4 space-y-2 text-sm text-gray-700">
          <li><strong>Motor trifásico:</strong> 0.80 – 0.95</li>
          <li><strong>UPS:</strong> 0.90 – 0.99</li>
          <li><strong>Rectificadores:</strong> 0.90 – 0.99</li>
          <li><strong>Iluminación LED:</strong> 0.95 – 0.98</li>
          <li><strong>Transformador sin carga:</strong> 0.10 – 0.30</li>
          <li><strong>Compresores trifásicos:</strong> 0.85 – 0.95</li>
          <li><strong>Grupos electrógenos:</strong> 0.80 – 0.90</li>
        </ul>
        <p className="mt-4 text-xs text-gray-500">
          * Estos valores son aproximados y pueden variar según tecnología, marca y uso.
        </p>
      </div>
    </div>
  );
};

export default KWToAmperesForm;
