// src/pages/Home.tsx
import { links } from "../data/links"; // Importa los links desde el archivo de datos 

function Home() {
    return (
      <div className="p-6 text-center bg-stone-100">
        <p className="text-lg mb-4">Bienvenido aquí encontrarás enlaces útiles para tu trabajo diario.</p>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {links.map((item, index) => (
        <div key={index} className="bg-white shadow-xl rounded-2xl p-4 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <img src={item.image} alt={item.title} className="w-20 h-20 mb-4" />
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="bg-violet-800 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
            Ir al sitio
          </a>
        </div>
      ))}
    </div>
      </div>
    );
}

export default Home;