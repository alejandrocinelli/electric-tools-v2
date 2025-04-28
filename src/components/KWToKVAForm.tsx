import { useState } from "react";
import PowerFactorInfo from "./PowerFactorInfo";

const KWToKVAForm = () => {
  const [kw, setKw] = useState("");
  const [fp1, setFp1] = useState("0.95");
  const [resultadoKVA, setResultadoKVA] = useState<number | null>(null);

  const [kva, setKva] = useState("");
  const [fp2, setFp2] = useState("0.95");
  const [resultadoKW, setResultadoKW] = useState<number | null>(null);

  const [mostrarInfo, setMostrarInfo] = useState(false); // Para mostrar/ocultar la info

  const calcularKVA = () => {
    if (!kw || !fp1) return alert("Completa todos los campos.");
    const kwNum = parseFloat(kw);
    const fpNum = parseFloat(fp1);
    if (fpNum < 0.8 || fpNum > 1) return alert("FP debe estar entre 0.8 y 1");
    setResultadoKVA(kwNum / fpNum);
  };

  const calcularKW = () => {
    if (!kva || !fp2) return alert("Completa todos los campos.");
    const kvaNum = parseFloat(kva);
    const fpNum = parseFloat(fp2);
    if (fpNum < 0.8 || fpNum > 1) return alert("FP debe estar entre 0.8 y 1");
    setResultadoKW(kvaNum * fpNum);
  };

  const resetearTodo = () => {
    setKw("");
    setFp1("0.95");
    setResultadoKVA(null);
    setKva("");
    setFp2("0.95");
    setResultadoKW(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Tarjeta de formulario */}
      <div className="bg-white shadow rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* kW → kVA */}
          <div className="border p-4 rounded-xl">
            <h2 className="text-lg font-bold mb-4">🔌 De kW a kVA</h2>
            <div className="mb-3">
              <label className="block font-semibold">Potencia activa (kW)</label>
              <input
                type="number"
                value={kw}
                onChange={(e) => setKw(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-3">
              <label className="block font-semibold">Factor de potencia (fp)</label>
              <input
                type="number"
                value={fp1}
                onChange={(e) => setFp1(e.target.value)}
                min={0.8}
                max={1}
                step={0.01}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              onClick={calcularKVA}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Calcular
            </button>

            {resultadoKVA !== null && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                Resultado: <strong>{resultadoKVA.toFixed(2)} kVA</strong>
              </div>
            )}
          </div>

          {/* kVA → kW */}
          <div className="border p-4 rounded-xl">
            <h2 className="text-lg font-bold mb-4">⚡ De kVA a kW</h2>
            <div className="mb-3">
              <label className="block font-semibold">Potencia aparente (kVA)</label>
              <input
                type="number"
                value={kva}
                onChange={(e) => setKva(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-3">
              <label className="block font-semibold">Factor de potencia (fp)</label>
              <input
                type="number"
                value={fp2}
                onChange={(e) => setFp2(e.target.value)}
                min={0.8}
                max={1}
                step={0.01}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <button
              onClick={calcularKW}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Calcular
            </button>

            {resultadoKW !== null && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                Resultado: <strong>{resultadoKW.toFixed(2)} kW</strong>
              </div>
            )}
          </div>
        </div>

        {/* Botón de reset general */}
        <div className="flex justify-end mt-6">
          <button
            onClick={resetearTodo}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Resetear todo
          </button>
        </div>
      </div>

      {/* Botón para ver info extra */}
      <div className="mt-10 text-center">
        <button
          onClick={() => setMostrarInfo(!mostrarInfo)}
          className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600"
        >
          {mostrarInfo ? "Ocultar información de FP" : "Ver información de factor de potencia"}
        </button>
      </div>

      {/* Mostrar la información */}
      {mostrarInfo && (
        <div className="mt-6">
          <PowerFactorInfo />
        </div>
      )}
    </div>
  );
};

export default KWToKVAForm;

