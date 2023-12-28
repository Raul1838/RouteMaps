import { Coords } from "../interfaces/Coords.ts";
import { OpenRouteService } from "../services/OpenRouteService.ts";
import { Pathway } from "../interfaces/Pathway.ts";
import PathwayInterface from "../interfaces/PathwayInterface.ts";
import Vehicle from "../interfaces/Vehicle.ts";
import { PriceService } from "../services/PriceService.ts";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException.ts";
import { PathwayException } from "../exceptions/PathwayException.ts";

export class PathwayController implements PathwayInterface {

    constructor(private openRouteService: OpenRouteService,
        private priceService: PriceService) { }

    async calculatePathway(from: Coords, to: Coords): Promise<Pathway> {
        if ((!from.lat || !from.lon) && from.name) {
            from = await this.openRouteService.getCoordinatesFromPlaceName(from.name);
        }
        if ((!to.lat || !to.lon) && to.name) {
            to = await this.openRouteService.getCoordinatesFromPlaceName(to.name);
        }
        return await this.openRouteService.calculatePathway(from, to);
    }

    async calculatePrice(pathway: Pathway, vehicle: Vehicle): Promise<number> {
        if (vehicle.consumo === undefined) {
            throw new VehicleNotFoundException('El vehículo no existe');
        }
        if (pathway.distance === undefined){
            throw new PathwayException('La ruta no es válida');
        }
        const price = await this.priceService.getPrice(vehicle.propulsion);
        let priceConsumido = ((price * vehicle.consumo * pathway.distance) / 10000);
        let priceConsumidoDecimales = parseFloat(priceConsumido.toFixed(2));
        return priceConsumidoDecimales;
    }
}

let _instance: PathwayController;
export function getPathwayController(openRouteService?: OpenRouteService, priceService?: PriceService): PathwayController {
    if (!_instance) {
        const orService = openRouteService || new OpenRouteService();
        const pService = priceService || new PriceService();
        _instance = new PathwayController(orService, pService);
    }
    return _instance;
}
