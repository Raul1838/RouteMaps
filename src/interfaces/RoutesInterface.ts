import VehicleEnum from "../enums/VehicleEnum";
import { Coords } from "./Coords";
import Route from "./Route";
import Vehicle from "./Vehicle";


export default interface RoutesInterface{
    setRoutes(routes: Route[]): Boolean;
    getRoutes(): Route[];
    addRoute(Inicio: Coords, Final: Coords, Vehicle: VehicleEnum | Vehicle): Promise<Boolean>
}