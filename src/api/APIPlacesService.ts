import APINotAvailableExeption from "../exceptions/APINotAvailableExeption";
import { getEnvVariables } from "../helpers/getEnvVariables";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import GetPlaceByCoord from "../interfaces/OpenRoutingInterface";
import Place from "../interfaces/Place";
import { openRouteApi } from "./openRouteApi";

const { VITE_ROUTES_API_KEY } = getEnvVariables();

export default class APIPlacesService implements APIPlacesInterface {
    async getPlaceByToponym(toponym: string): Promise<Place> {
        var result: Place = {
            Latitud: -1,
            Longitud: -1,
            Nombre: toponym,
            Favorito: false
        };
        var res: GetPlaceByCoord | undefined = await openRouteApi.get(`/geocode/search?api_key=${VITE_ROUTES_API_KEY}&text=${toponym}`);
        if (res?.data.features[0].geometry.coordinates !== undefined) {
            result = {
                ...result,
                Longitud: res?.data.features[0].geometry.coordinates[0],
                Latitud: res?.data.features[0].geometry.coordinates[1],
            }
        }
        if (result.Latitud === -1) {
            throw new Error("");
        }
        return result;
    }
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