import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './application/store';

const isProd = import.meta.env.MODE === 'production';

createRoot(document.getElementById('root')!).render(
  isProd ? (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <StrictMode>
        <Provider store={store}><App /></Provider>
      </StrictMode>
    </BrowserRouter>
  ) : (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Provider store={store}><App /></Provider>
    </BrowserRouter>
  )
);
