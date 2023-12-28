import {Coords} from "../interfaces/Coords.ts";
import {OpenRouteService} from "../services/OpenRouteService.ts";
import {Pathway} from "../interfaces/Pathway.ts";

export class PathwayController {

    constructor( private openRouteService: OpenRouteService ) { }

    async calculatePathway( from: Coords, to: Coords ): Promise<Pathway> {
        if( (!from.lat || !from.lon) && from.name ) {
            from = await this.openRouteService.getCoordinatesFromPlaceName( from.name );
            console.log(from);
        }
        if( (!to.lat || !to.lon) && to.name ) {
            to = await this.openRouteService.getCoordinatesFromPlaceName( to.name );
            console.log(to);
        }
        return await this.openRouteService.calculatePathway( from, to );
    }

}

let _instance: PathwayController;
export function getPathwayController(openRouteService?: OpenRouteService): PathwayController {
    if (!_instance) {
        _instance = new PathwayController((!openRouteService ? new OpenRouteService() : openRouteService));
    }
    return _instance;
}
