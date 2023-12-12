import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import {BrowserRouter} from "react-router-dom"; // or "const mapboxgl = require('mapbox-gl');"

// const { VITE_MAP_API_KEY } = getEnvVariables();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
)
