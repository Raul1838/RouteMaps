import {Coords} from "../interfaces/Coords.ts";
import {OpenRouteService} from "../services/OpenRouteService.ts";
import {Pathway} from "../interfaces/Pathway.ts";
import Vehicle from "../interfaces/Vehicle.ts";
import {PriceService} from "../services/PriceService.ts";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException.ts";
import {PathwayException, PathWayExceptionMessages} from "../exceptions/PathwayException.ts";
import PathwayVehicleEnum from "../enums/PathwayVehicleEnum.ts";
import {FirebaseService} from "../services/FirebaseService.ts";

export class PathwayController {

    constructor(
        private openRouteService: OpenRouteService,
        private firebaseService: FirebaseService,
        private priceService: PriceService,
    ) { }

    async calculatePathway(from: Coords, to: Coords): Promise<Pathway> {
        if ((!from.lat || !from.lon) && from.name) {
            from = await this.openRouteService.getCoordinatesFromPlaceName(from.name);
        }
        if ((!to.lat || !to.lon) && to.name) {
            to = await this.openRouteService.getCoordinatesFromPlaceName(to.name);
        }
        return await this.openRouteService.calculatePathway(from, to);
    }

    async setDefaultPathwayType( pathwayType: PathwayTypes, userId: string ) {
        await this.firebaseService.setDefaultPathwayType( pathwayType, userId );
    }

    async getDefaultPathwayType ( userId: string ): Promise<PathwayTypes> {
        let data: PathwayTypes = PathwayTypes.UNDEFINED;
        await this.firebaseService.getDefaultPathwayType( userId ).then( (value) => {
            data = value.pathwayType;
        });
        return data;
    }

    calculateCalories(pathway: Pathway, vehicle: PathwayVehicleEnum): number {
        if (!pathway || pathway.distance === 0) {
            throw new PathwayException(PathWayExceptionMessages.InvalidPathway);
        }
        if (vehicle === PathwayVehicleEnum.Walkinkg) {
            return (pathway.distance * 12 / 250);
        } else if (vehicle === PathwayVehicleEnum.Bike) {
            return (pathway.distance * 6 / 250);
        } else {
            throw new VehicleNotFoundException('No se ha seleccionado un vehículo de tipo Bicicleta o Andando');
        }
    }

    async calculatePrice(pathway: Pathway, vehicle: Vehicle): Promise<number> {
        if (vehicle.consumo === undefined) {
            throw new VehicleNotFoundException('El vehículo no existe');
        }
        if (pathway.distance === undefined) {
            throw new PathwayException(PathWayExceptionMessages.InvalidPathway);
        }
        const price = await this.priceService.getPrice(vehicle.propulsion);
        let priceConsumido = ((price * vehicle.consumo * pathway.distance) / 10000);
        let priceConsumidoDecimales = parseFloat(priceConsumido.toFixed(2));
        return priceConsumidoDecimales;
    }
}

let _instance: PathwayController;
export function getPathwayController(openRouteService?: OpenRouteService, firebaseService?: FirebaseService, priceService?: PriceService): PathwayController {
    if (!_instance) {
        if( !openRouteService ) openRouteService = new OpenRouteService();
        if( !firebaseService ) firebaseService = new FirebaseService();
        if( !priceService ) priceService = new PriceService();
        _instance = new PathwayController(openRouteService, firebaseService, priceService);
    }
    return _instance;
}
