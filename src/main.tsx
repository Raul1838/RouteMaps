import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { Provider } from 'react-redux';
import { store } from './store/store';

// const { VITE_MAP_API_KEY } = getEnvVariables();

mapboxgl.accessToken = 'pk.eyJ1IjoibXItcGF5dSIsImEiOiJjbG54bzlnNzIwa3p4MmxuMHNyMnlveDJyIn0.oyNZ7eWlTKKF_cYIHaE28A';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
)