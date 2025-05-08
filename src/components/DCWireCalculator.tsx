import { useState } from "react";

interface InputData {
  length: number;
  current: number;
  maxVoltageDrop: number;
  parallelConductors: number;
  systemVoltage: number;
  temperature: number;
}

const sections = [
  { size: 4, admissibleCurrent: 41 },
  { size: 6, admissibleCurrent: 53 },
  { size: 10, admissibleCurrent: 69 },
  { size: 16, admissibleCurrent: 97 },
  { size: 25, admissibleCurrent: 121 },
  { size: 35, admissibleCurrent: 149 },
  { size: 50, admissibleCurrent: 181 },
  { size: 70, admissibleCurrent: 221 },
  { size: 95, admissibleCurrent: 272 },
  { size: 120, admissibleCurrent: 316 },
  { size: 150, admissibleCurrent: 360 },
  { size: 185, admissibleCurrent: 415 },
  { size: 240, admissibleCurrent: 492 },
];

const copperConductivity = 56; // m/(Ω*mm²) para cobre

export default function DCWireCalculator() {
  const [inputs, setInputs] = useState<InputData>({
    length: 0,
    current: 0,
    maxVoltageDrop: 0.4,
    parallelConductors: 1,
    systemVoltage: 48,
    temperature: 25,
  });

  const [result, setResult] = useState<{ section: number; conductors: number; voltageDrop: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value.replace(",", "."));
    setInputs({ ...inputs, [name]: isNaN(parsedValue) ? 0 : parsedValue });
  };

  const handleVoltageDropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseFloat(e.target.value);
    setInputs({ ...inputs, maxVoltageDrop: value });
  };

  const reset = () => {
    setInputs({
      length: 0,
      current: 0,
      maxVoltageDrop: 0.4,
      parallelConductors: 1,
      systemVoltage: 48,
      temperature: 25,
    });
    setResult(null);
    setError(null);
  };

  const calculate = () => {
    const { length, current, maxVoltageDrop } = inputs;

    let found = false;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const currentPerConductor = current; // por defecto con 1 conductor

      const voltageDrop = (2 * length * currentPerConductor) / (copperConductivity * section.size);

      if (voltageDrop <= maxVoltageDrop && section.admissibleCurrent >= current) {
        setResult({
          section: section.size,
          conductors: 1,
          voltageDrop,
        });
        setError(null);
        found = true;
        return;
      }
    }

    // Si no se encontró con un solo conductor, intentar con varios
    for (let parallel = 2; parallel <= 10; parallel++) {
      const currentPerConductor = current / parallel;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const voltageDrop = (2 * length * currentPerConductor) / (copperConductivity * section.size);
        const totalAdmissibleCurrent = section.admissibleCurrent * parallel;

        if (voltageDrop <= maxVoltageDrop && totalAdmissibleCurrent >= current) {
          setResult({
            section: section.size,
            conductors: parallel,
            voltageDrop,
          });
          setError(null);
          found = true;
          return;
        }
      }
    }

    if (!found) {
      setResult(null);
      setError("No se puede cumplir la caída de tensión ni la corriente requerida. Aumente la sección o la cantidad de conductores.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow-md space-y-6 mt-4">
      <h2 className="text-2xl font-bold text-center">Calculador de Corriente Continua</h2>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-semibold">Longitud de los cables (m)</label>
          <input
            type="text"
            name="length"
            value={inputs.length.toString().replace(".", ",")}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Consumo estimado (Imax, A)</label>
          <input
            type="text"
            name="current"
            value={inputs.current.toString().replace(".", ",")}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Máxima caída de tensión admisible (V)</label>
          <select
            name="maxVoltageDrop"
            value={inputs.maxVoltageDrop}
            onChange={handleVoltageDropChange}
            className="border rounded-lg p-2"
          >
            {[0.4, 0.5, 0.6,0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.7].map((v) => (
              <option key={v} value={v}>
                {v.toString().replace(".", ",")} V
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Conductores en paralelo (mínimo)</label>
          <input
            type="number"
            name="parallelConductors"
            value={inputs.parallelConductors}
            onChange={handleChange}
            className="border rounded-lg p-2"
            min={1}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Tensión del sistema (V)</label>
          <input
            type="text"
            name="systemVoltage"
            value={inputs.systemVoltage.toString().replace(".", ",")}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">Temperatura de operación (°C)</label>
          <input
            type="text"
            name="temperature"
            value={inputs.temperature.toString().replace(".", ",")}
            onChange={handleChange}
            className="border rounded-lg p-2"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition"
        >
          Calcular
        </button>

        <button
          onClick={reset}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl transition"
        >
          Resetear
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-green-100 rounded-xl text-center">
          <h3 className="text-xl font-bold mb-2">Resultado</h3>
          <p>Sección mínima sugerida: <strong>{result.section} mm²</strong></p>
          <p>Cantidad de conductores en paralelo: <strong>{result.conductors}</strong></p>
          <p>Caída de tensión estimada: <strong>{result.voltageDrop.toFixed(2)} V</strong></p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 rounded-xl text-center">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
}
