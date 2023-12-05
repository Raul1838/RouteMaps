import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'

import mapboxgl from 'mapbox-gl';
import {BrowserRouter} from "react-router-dom";

// const { VITE_MAP_API_KEY } = getEnvVariables();

mapboxgl.accessToken = 'pk.eyJ1IjoibXItcGF5dSIsImEiOiJjbG54bzlnNzIwa3p4MmxuMHNyMnlveDJyIn0.oyNZ7eWlTKKF_cYIHaE28A';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
)
