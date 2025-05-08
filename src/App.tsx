import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Calculos from './pages/calculos/calculos';
import KwToAmperes from './components/KwToAmperes';
import KWToKVA from './pages/calculos/KWToKVA';
import Tutorials from './pages/Tuturiales/Tutorials';
import DCWireCalculator from './components/DCWireCalculator';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculos" element={<Calculos />} />
        <Route path="/calculos/kw-a-amperes" element={<KwToAmperes />} />
        <Route path="/calculos/kw-a-kva" element={<KWToKVA />} />
        <Route path="/tutoriales" element={<Tutorials/>} />
        <Route path="/calculos/calculadora-cables" element={<DCWireCalculator />} />
        <Route path="/documentacion" element={"<Documentacion />"} />
      </Routes>
    </div>
  );
}

export default App;
