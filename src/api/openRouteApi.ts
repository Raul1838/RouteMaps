import axios from 'axios';      // yarn add axios
import { getEnvVariables } from '../helpers/getEnvVariables';


const { VITE_API_URL } = getEnvVariables();
export const openRouteApi = axios.create({
    baseURL: process.env.VITE_API_URL
});
