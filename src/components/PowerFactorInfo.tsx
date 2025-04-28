const PowerFactorInfo = () => {
    const info = [
      { equipo: "Motores eléctricos industriales", fp: "0.85 - 0.95" },
      { equipo: "Rectificadores de potencia", fp: "0.90 - 0.95" },
      { equipo: "Grupos electrógenos", fp: "0.80 - 0.85" },
      { equipo: "UPS (sistemas de respaldo)", fp: "0.95 - 1.00" },
      { equipo: "Iluminación LED", fp: "0.90 - 0.95" },
      { equipo: "Transformadores en carga", fp: "0.95" },
      { equipo: "Climatización VRV / Inverter", fp: "0.95 - 1.00" },
      { equipo: "Soldadoras industriales", fp: "0.80 - 0.90" },
    ];
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-md mt-8">
        <h3 className="text-2xl font-bold mb-4 text-blue-700">Información sobre Factor de Potencia</h3>
        <p className="text-gray-600 mb-4">
          El factor de potencia (FP) representa la eficiencia del uso de la energía. Aquí te mostramos valores típicos según el tipo de carga:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-2 text-left">Tipo de equipo</th>
                <th className="border p-2 text-left">Factor de Potencia típico</th>
              </tr>
            </thead>
            <tbody>
              {info.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50">
                  <td className="border p-2">{item.equipo}</td>
                  <td className="border p-2">{item.fp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default PowerFactorInfo;
  