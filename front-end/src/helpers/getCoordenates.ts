import { openRouteApi } from "../api/openRouteApi";
import { Coords } from "../interfaces/Coords";
import { getEnvVariables } from "./getEnvVariables";

const { VITE_ROUTES_API_KEY } = getEnvVariables();

export const getCoordenates = async( topoinim: string ): Promise<Coords> => {
    
  
    const { data } = await openRouteApi.get('/geocode/search', {
      params: {
        api_key: VITE_ROUTES_API_KEY,
        text: topoinim,
      }
    });

    const { geometry } = data.features[0];

    // console.log({ geometry });

    const { coordinates } = geometry;

    return coordinates;
}
