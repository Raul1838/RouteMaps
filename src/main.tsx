import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import {BrowserRouter} from "react-router-dom";
import mapboxgl from 'mapbox-gl';
import {getEnvVariables} from "./helpers/getEnvVariables.ts"; // or "const mapboxgl = require('mapbox-gl');"

const { VITE_MAP_API_KEY } = getEnvVariables();
mapboxgl.accessToken = VITE_MAP_API_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>,
)
