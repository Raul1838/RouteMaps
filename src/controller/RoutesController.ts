import VehicleEnum from "../enums/VehicleEnum";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { APIRouteModel } from "../interfaces/APIRouteModel";
import { Coords } from "../interfaces/Coords";
import Route from "../interfaces/Route";
import RoutesInterface from "../interfaces/RoutesInterface";
import Ubicacion from "../interfaces/Ubicacion";
import Vehicle from "../interfaces/Vehicle";


export default class RoutesController implements RoutesInterface {
    private routes: Array<Route>;
    private apiService: APIPlacesInterface;

    constructor(apiService: APIPlacesInterface) {
        this.routes = new Array();
        this.apiService = apiService;
    }
    setRoutes(routes: Route[]): Boolean {
        this.routes = routes;
        return this.routes === routes;
    }
    getRoutes(): Route[] {
        return this.routes;
    }
   async getNewRoute(startCoords: Coords, endCoords: Coords, vehicle: VehicleEnum | Vehicle): Promise<boolean> {
    const result: APIRouteModel | undefined = await this.apiService.getRoute(startCoords, endCoords, vehicle);

    if (result?.features.length && result.features[0]?.properties?.summary.distance > 0) {
        const routeSteps: Ubicacion[] = [];

        result.features[0].properties.segments[0].steps.forEach(step => {
            let location: Ubicacion = {
                Distancia: step.distance,
                Duracion: step.duration,
                Instruccion: step.instruction,
                Nombre: step.name,
            };

            if (step.exit_number !== undefined) {
                location = { ...location, Salida: step.exit_number };
            }

            routeSteps.push(location);
        });

        const route: Route = {
            Inicio: startCoords,
            Fin: endCoords,
            Distancia: result.features[0]?.properties?.summary.distance ?? 0,
            Duracion: result.features[0]?.properties?.summary.duration ?? 0,
            Trayecto: routeSteps,
        };

        this.routes.push(route);
        return true;
    } else {
        return false;
    }
}

}