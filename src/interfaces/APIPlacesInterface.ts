import VehicleEnum from "../enums/VehicleEnum";
import { APIRouteModel } from "./APIRouteModel";
import { Coords } from "./Coords";
import Vehicle from "./Vehicle";

export default interface APIPlacesInterface{
    getRoute(Inicio: Coords, Final: Coords, Vehicle: VehicleEnum | Vehicle): Promise<APIRouteModel>
}