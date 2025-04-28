import React from 'react';

// Componente para mostrar un video tutorial
interface VideoTutorial {
  title: string;
  embedUrl: string;
}

const videos: VideoTutorial[] = [
  {
    title: "Como cargar un ICD - TAREA DE RIESGO",
    embedUrl: import.meta.env.VITE_URL_TUTORIALICD
  },
  // Agregar más videos aquí
  {
    title: "Como habilitar edificios en Exactians",
    embedUrl: import.meta.env.VITE_URL_TUTORIALEXACTIAN
  },
  {
    title: "Webinar Certificación ET&DC - Conocimiento Básico de Refrigeración",
    embedUrl: import.meta.env.VITE_URL_CAPACITACIONREFRIGRERACION
  }
];

const Tutorials = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Tutoriales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{video.title}</h2>
            <iframe
              src={video.embedUrl}
              width="640"
              height="360"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              title={video.title}
              className="w-full rounded"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
