import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const isProd = import.meta.env.MODE === 'production';

createRoot(document.getElementById('root')!).render(
  isProd ? (
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
);
