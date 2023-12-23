import APINotAvailableExeption from "../exceptions/APINotAvailableExeption";
import { getEnvVariables } from "../helpers/getEnvVariables";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import GetPlaceByCoord from "../interfaces/OpenRoutingInterface";
import Place from "../interfaces/Place";
import { openRouteApi } from "./openRouteApi";


export default class APIPlacesService implements APIPlacesInterface {
    constructor(){getEnvVariables;}

    async getPlaceByToponym(toponym: string): Promise<Place> {

        var result: Place = {
            Latitud: -1,
            Longitud: -1,
            Nombre: toponym,
            Favorito: false
        };

        try {
            var res: GetPlaceByCoord | undefined = await openRouteApi.get(`/geocode/search?api_key=${process.env.VITE_ROUTES_API_KEY}&text=${toponym}`);
        } catch {
            throw new APINotAvailableExeption();
        }
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
            Latitud: coordinates.lat!,
            Longitud: coordinates.lon!,
            Nombre: "",
            Favorito: false
        };
        try {
            var res: GetPlaceByCoord | undefined = await openRouteApi.get(`${process.env.VITE_API_URL}/geocode/reverse?api_key=${process.env.VITE_ROUTES_API_KEY}&point.lon=${coordinates.lon!}&point.lat=${coordinates.lat!}`);
        } catch {
            throw new APINotAvailableExeption();
        }

        if (res?.data?.features[0].properties.name !== undefined) {
            result = { ...result, Nombre: res?.data?.features[0].properties.name }
        }
        if (result.Nombre === undefined) {
            throw new Error("");
        }
        return result;
    }



}