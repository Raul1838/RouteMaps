import axios from 'axios';      // yarn add axios
import { getEnvVariables } from '../helpers/getEnvVariables';


const { VITE_API_URL_LIGHT_PRICE } = getEnvVariables();
export const lightPriceServiceApi = axios.create({
    baseURL: VITE_API_URL_LIGHT_PRICE
});


const { VITE_API_URL_COMBUSTIBLE_PRICE } = getEnvVariables();
export const combustiblePriceServiceApi = axios.create({
    baseURL: VITE_API_URL_COMBUSTIBLE_PRICE
});