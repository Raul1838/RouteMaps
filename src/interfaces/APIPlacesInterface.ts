import { APIRouteModel, APIRouteNotFound } from "./APIRouteModel";
import { Coords } from "./Coords";

export default interface APIPlacesInterface{
    getRoute(Inicio: Coords, Final: Coords, Vehicle: string): Promise<APIRouteModel | APIRouteNotFound>
}