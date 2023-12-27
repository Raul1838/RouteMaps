import { Coords } from "../interfaces/Coords.ts";
import { OpenRouteService } from "../services/OpenRouteService.ts";
import { Pathway } from "../interfaces/Pathway.ts";
import PathwayInterface from "../interfaces/PathwayInterface.ts";
import Vehicle from "../interfaces/Vehicle.ts";

export class PathwayController implements PathwayInterface {

    constructor( private openRouteService: OpenRouteService ) { }

    async calculatePathway( from: Coords, to: Coords ): Promise<Pathway> {
        if( (!from.lat || !from.lon) && from.name ) {
            from = await this.openRouteService.getCoordinatesFromPlaceName( from.name );
        }
        if( (!to.lat || !to.lon) && to.name ) {
            to = await this.openRouteService.getCoordinatesFromPlaceName( to.name );
        }
        return await this.openRouteService.calculatePathway(from, to);
    }

    async calculatePrice(pathway: Pathway, vehicle: Vehicle): Promise<number> {
        throw new Error('Not implemented yet');
    }
}

let _instance: PathwayController;
export function getPathwayController(openRouteService?: OpenRouteService): PathwayController {
    if (!_instance) {
        _instance = new PathwayController((!openRouteService ? new OpenRouteService() : openRouteService));
    }
    return _instance;
}
