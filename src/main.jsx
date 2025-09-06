import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  // StrictMode is removed to prevent Leaflet map from rendering twice, which is a known issue.
  // In a real production app, you might find a better workaround or conditional application of StrictMode.
  <App />
);
