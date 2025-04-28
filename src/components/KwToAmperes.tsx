import { useState } from "react";
import PowerFactorInfo from "./PowerFactorInfo"; // 👈 Acordate de importar el componente

const KWOrKVAToAmperesForm = () => {
  const [tipoPotencia, setTipoPotencia] = useState<"kw" | "kva">("kw");
  const [valorPotencia, setValorPotencia] = useState("");
  const [tension, setTension] = useState("380");
  const [fp, setFp] = useState("0.95");
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    if (!valorPotencia || !tension || !fp) {
      alert("Por favor completá todos los campos.");
      return;
    }

    const potenciaNum = parseFloat(valorPotencia);
    const tensionNum = parseFloat(tension);
    const fpNum = parseFloat(fp);

    if (tensionNum < 360 || tensionNum > 420) {
      alert("La tensión debe estar entre 360V y 420V.");
      return;
    }

    if (fpNum < 0.8 || fpNum > 1) {
      alert("El factor de potencia debe estar entre 0.8 y 1.");
      return;
    }

    let amperes: number;

    if (tipoPotencia === "kw") {
      amperes = (potenciaNum * 1000) / (Math.sqrt(3) * tensionNum * fpNum);
    } else {
      amperes = (potenciaNum * 1000) / (Math.sqrt(3) * tensionNum);
    }

    setResultado(amperes);
  };

  const resetearFormulario = () => {
    setValorPotencia("");
    setTension("380");
    setFp("0.95");
    setResultado(null);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 w-full max-w-3xl mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Conversión de {tipoPotencia === "kw" ? "kW" : "kVA"} a Amperes (trifásico)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Tipo de potencia */}
        <div>
          <label className="block font-semibold mb-1">Tipo de potencia</label>
          <select
            value={tipoPotencia}
            onChange={(e) => {
              setTipoPotencia(e.target.value as "kw" | "kva");
              setResultado(null);
            }}
            className="w-full border rounded px-3 py-2"
          >
            <option value="kw">kW</option>
            <option value="kva">kVA</option>
          </select>
        </div>

        {/* Valor de potencia */}
        <div>
          <label className="block font-semibold mb-1">
            {tipoPotencia === "kw" ? "Potencia activa (kW)" : "Potencia aparente (kVA)"}
          </label>
          <input
            type="number"
            value={valorPotencia}
            onChange={(e) => setValorPotencia(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Tensión */}
        <div>
          <label className="block font-semibold mb-1">Tensión (V)</label>
          <input
            type="number"
            value={tension}
            onChange={(e) => setTension(e.target.value)}
            min={360}
            max={420}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Factor de potencia */}
        {tipoPotencia === "kw" && (
          <div>
            <label className="block font-semibold mb-1">Factor de potencia (fp)</label>
            <input
              type="number"
              value={fp}
              onChange={(e) => setFp(e.target.value)}
              min={0.8}
              max={1}
              step={0.01}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <button
          onClick={calcular}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Calcular
        </button>

        <button
          onClick={resetearFormulario}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
        >
          Resetear
        </button>
      </div>

      {/* Resultado */}
      {resultado !== null && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded text-center">
          Corriente trifásica: <strong>{resultado.toFixed(2)} A</strong>
        </div>
      )}

      {/* Información sobre factor de potencia */}
      {tipoPotencia === "kw" && <PowerFactorInfo />}
    </div>
  );
};

export default KWOrKVAToAmperesForm;
