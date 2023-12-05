import APINotAvailableExeption from "../exceptions/APINotAvailableExeption";
import { getEnvVariables } from "../helpers/getEnvVariables";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import GetPlaceByCoord from "../interfaces/OpenRoutingInterface";
import { Coords } from "../interfaces/Coords";
import Place from "../interfaces/Place";
import { openRouteApi } from "./openRouteApi";

const { VITE_ROUTES_API_KEY } = getEnvVariables();

export default class APIPlacesService implements APIPlacesInterface {
    async getPlaceByCoord(coordinates: Coords): Promise<Place> {
        var result: Place = {
            Latitud: coordinates.Latitud!,
            Longitud: coordinates.Longitud!,
            Nombre: "",
            Favorito: false
        };
        try {
            var res: GetPlaceByCoord | undefined = await openRouteApi.get(`/geocode/reverse?api_key=${VITE_ROUTES_API_KEY}&point.lon=${coordinates.Longitud!}&point.lat=${coordinates.Latitud!}`);
        } catch {
            throw new APINotAvailableExeption();
        }
        if (res?.data?.features[0].properties.name !== undefined) {
            result = { ...result, Nombre: res?.data?.features[0].properties.locality }
        }
        if (result.Nombre === undefined) {
            throw new Error("");
        }
        return result;
    }

}