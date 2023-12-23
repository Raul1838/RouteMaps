import {Coords} from "../interfaces/Coords.ts";
import {OpenRoutingPathway} from "../interfaces/OpenRoutingPathway.ts";

export class PathwayController {

    async calculatePathway( from: Coords, to: Coords ): Promise<OpenRoutingPathway> {
        throw new Error('Not implemented yet');
    }

}

let _instance: PathwayController;
export function getPathwayController(): PathwayController {
    if (!_instance) {
        _instance = new PathwayController();
    }
    return _instance;
}
