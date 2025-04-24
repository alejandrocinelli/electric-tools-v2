import KWToKVAForm from "../../components/KWToKVAForm";

const KWToKVA = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Conversión de kW a kVA</h1>
      <p className="text-gray-600 mb-8">
        Convertí potencia activa (kW) a potencia aparente (kVA) utilizando el factor de potencia.
      </p>
      <KWToKVAForm />
    </div>
  );
};

export default KWToKVA;
