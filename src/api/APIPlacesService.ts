import VehicleEnum from "../enums/VehicleEnum";
import { getEnvVariables } from "../helpers/getEnvVariables";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import Route from "../interfaces/Route";
import Vehicle from "../interfaces/Vehicle";

const { VITE_ROUTES_API_KEY } = getEnvVariables();

export default class APIPlacesService implements APIPlacesInterface {
    getRoute(Inicio: Coords, Final: Coords, Vehicle: VehicleEnum | Vehicle): Promise<Route> {
        throw new Error("Method not implemented.");
    }
    // async getPlaceByToponym(toponym: string): Promise<Place> {
    //     var result: Place = {
    //         Latitud: -1,
    //         Longitud: -1,
    //         Nombre: toponym,
    //         Favorito: false
    //     };
    //     var res: GetPlaceByCoord | undefined = await openRouteApi.get(`/geocode/search?api_key=${VITE_ROUTES_API_KEY}&text=${toponym}`);
    //     if (res?.features[0].geometry.coordinates !== undefined) {
    //         result = {
    //             ...result,
    //             Longitud: res?.features[0].geometry.coordinates[0],
    //             Latitud: res?.features[0].geometry.coordinates[1],
    //         }
    //     }
    //     if (result.Latitud === -1) {
    //         throw new Error("");
    //     }
    //     return result;
    // }
    



}