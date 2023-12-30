import { Coords } from "./Coords.ts";
import { PathwayTypes } from "../enums/PathwayTypes.ts";
import { OpenRoutingPathway } from "./OpenRoutingPathway.ts";
import { PathwayTransportMeans } from "../enums/PathwayTransportMeans.ts";

export interface Pathway {
    id?: number,
    type: PathwayTypes;
    start: Coords;
    end: Coords;
    path: OpenRoutingPathway;
    duration: number,
    distance: number,
    favourite: boolean,
    transportMean: PathwayTransportMeans,
    vehicle?: string
}
