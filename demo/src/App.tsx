import { LeafletDemo } from './pages/LeafletDemo.tsx';
import { Routes, Route } from 'react-router-dom';
import OLDemo from './pages/OLDemo.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LeafletDemo />} />
      <Route path="/leaflet" element={<LeafletDemo />} />
      <Route path="/ol" element={<OLDemo />} />
    </Routes>
  );
}

export default App;
