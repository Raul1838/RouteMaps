import VehicleEnum from "../enums/VehicleEnum";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import Route from "../interfaces/Route";
import RoutesInterface from "../interfaces/RoutesInterface";
import Vehicle from "../interfaces/Vehicle";


export default class RoutesController implements RoutesInterface {
    private routes: Array<Route>;
    private apiService: APIPlacesInterface;

    constructor(apiService: APIPlacesInterface) {
        this.routes = new Array();
        this.apiService = apiService;
    }
    setRoutes(routes: Route[]): Boolean {
        throw new Error("Method not implemented.");
    }
    getRoutes(): Route[] {
        throw new Error("Method not implemented.");
    }
    addRoute(Inicio: Coords, Final: Coords, Vehicle: VehicleEnum | Vehicle): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }


}