import {Coords} from "../interfaces/Coords.ts";
import {OpenRouteService} from "../services/OpenRouteService.ts";
import {Pathway} from "../interfaces/Pathway.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";
import {FirebaseService} from "../services/FirebaseService.ts";

export class PathwayController {

    constructor(
        private openRouteService: OpenRouteService,
        private firebaseService: FirebaseService
    ) { }

    async calculatePathway( from: Coords, to: Coords ): Promise<Pathway> {
        if( (!from.lat || !from.lon) && from.name ) {
            from = await this.openRouteService.getCoordinatesFromPlaceName( from.name );
        }
        if( (!to.lat || !to.lon) && to.name ) {
            to = await this.openRouteService.getCoordinatesFromPlaceName( to.name );
        }
        return await this.openRouteService.calculatePathway( from, to );
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

}

let _instance: PathwayController;
export function getPathwayController(openRouteService?: OpenRouteService, firebaseService?: FirebaseService): PathwayController {
    if (!_instance) {
        if( !openRouteService ) openRouteService = new OpenRouteService();
        if( !firebaseService ) firebaseService = new FirebaseService();
        _instance = new PathwayController( openRouteService, firebaseService );
    }
    return _instance;
}
