import VehicleEnum from "../enums/VehicleEnum";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";
import RouteNotFoundException from "../exceptions/RouteNotFoundException";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { APIRouteModel, APIRouteNotFound } from "../interfaces/APIRouteModel";
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
        var drivingMethod;

        if (this.isVehicleEnum(vehicle)) {
            drivingMethod = this.mapVehicleEnumToString(vehicle);
        } else if (typeof vehicle === 'object') {
            drivingMethod = 'driving-car';
        } else {
            throw new InvalidVehicleException();
        }


        const result: APIRouteModel | APIRouteNotFound = await this.apiService.getRoute(startCoords, endCoords, drivingMethod);

        if (this.isAPIRouteModel(result)) {
            this.manageResponseAsRouteModel(result, startCoords, endCoords);
        } else if (this.isAPIRouteNotFound(result)) {
            this.manageResponseAsNotFound(result);
        } else {
            throw new Error();
        }

    }


    // Other methods
    // Type guard function
    isVehicleEnum(vehicle: Vehicle | VehicleEnum): vehicle is VehicleEnum {
        return typeof vehicle === 'string';
    }

    // Function to map VehicleEnum to string
    mapVehicleEnumToString(vehicleEnum: VehicleEnum): string {
        switch (vehicleEnum) {
            case VehicleEnum.Vehicle:
                return 'driving-car';
            case VehicleEnum.Bike:
                return 'bike';
            case VehicleEnum.Walking:
                return 'walk';
            default:
                throw new InvalidVehicleException();
        }
    }

    isAPIRouteModel(result: APIRouteModel | APIRouteNotFound): result is APIRouteModel {
        return (result as APIRouteModel).features !== undefined;
    }

    isAPIRouteNotFound(result: APIRouteModel | APIRouteNotFound): result is APIRouteNotFound {
        return (result as APIRouteNotFound).error !== undefined;
    }

    manageResponseAsRouteModel(result: APIRouteModel, startCoords: Coords, endCoords: Coords): Boolean {
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

    manageResponseAsNotFound(response: APIRouteNotFound) {
        if (response.error.code === 2010) {
            throw new RouteNotFoundException(response.error.message);
        }
    }

}