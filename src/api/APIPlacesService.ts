import { getEnvVariables } from "../helpers/getEnvVariables";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import { GetPlaceByCoord } from "../interfaces/OpenRoutingInterface";
import Place from "../interfaces/Place";
import { openRouteApi } from "./openRouteApi";

const { VITE_ROUTES_API_KEY } = getEnvVariables();

export default class APIPlacesService implements APIPlacesInterface {
    async getPlaceByCoord(coordinates: Coords): Promise<Place> {
        var result : Place = {
            Latitud: coordinates.Latitud!,
            Longitud: coordinates.Longitud!,
            Nombre: "",
            Favorito: false
        };
        var res : GetPlaceByCoord | undefined = await openRouteApi.get(`/geocode/reverse?${VITE_ROUTES_API_KEY}&point.lon=${coordinates.Longitud!}&point.lat=${coordinates.Latitud!}`);
        if (res?.features[0].properties.name !== undefined) {
            result = {...result, Nombre: res?.features[0].properties.name}
        }
        if (result.Nombre === undefined) {
            throw new Error("");
        }
        return result;
    }

}