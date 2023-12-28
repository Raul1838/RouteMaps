import {Coords} from "./Coords.ts";
import {OpenRoutingPathway} from "./OpenRoutingPathway.ts";

export interface Pathway {
    type: string;
    start: Coords;
    end: Coords;
    path: OpenRoutingPathway;
    distance: number;
    duration: number;
}
