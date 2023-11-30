import VehicleEnum from "../enums/VehicleEnum";
import { Coords } from "./Coords";
import Route from "./Route";
import Vehicle from "./Vehicle";

export default interface APIPlacesInterface{
    getRoute(Inicio: Coords, Final: Coords, Vehicle: VehicleEnum | Vehicle): Promise<Route>
}