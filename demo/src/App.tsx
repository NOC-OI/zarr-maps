import { LeafletDemo } from './pages/LeafletDemo.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import OLDemo from './pages/OLDemo.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/leaflet" replace />} />
      <Route path="/leaflet" element={<LeafletDemo />} />
      <Route path="/ol" element={<OLDemo />} />
    </Routes>
  );
}

export default App;
