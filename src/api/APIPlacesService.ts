import VehicleEnum from "../enums/VehicleEnum";
import { getEnvVariables } from "../helpers/getEnvVariables";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { APIRouteModel } from "../interfaces/APIRouteModel";
import { Coords } from "../interfaces/Coords";
import Route from "../interfaces/Route";
import Vehicle from "../interfaces/Vehicle";
import { openRouteApi } from "./openRouteApi";

const { VITE_ROUTES_API_KEY } = getEnvVariables();

export default class APIPlacesService implements APIPlacesInterface {
    async getRoute(Inicio: Coords, Final: Coords, Vehicle: VehicleEnum | Vehicle): Promise<APIRouteModel> {
        try {
            const response: APIRouteModel | undefined = await openRouteApi.get(`/v2/directions/driving-car?api_key=${VITE_ROUTES_API_KEY}&start=${Inicio.Longitud},${Inicio.Latitud}&end=${Final.Longitud},${Final.Latitud}`);
            return response!;
        }
        catch {
            throw new Error();
        }
    }
}