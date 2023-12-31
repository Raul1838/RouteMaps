import { Coords } from "./Coords.ts";
import { PathwayTypes } from "../enums/PathwayTypes.ts";
import { PathwayTransportMeans } from "../enums/PathwayTransportMeans.ts";
import { OpenRoutingPostCall } from "./OpenRoutingPostCall.ts";

export interface Pathway {
    id?: number,
    type: PathwayTypes;
    start: Coords;
    end: Coords;
    path: OpenRoutingPostCall;
    duration: number,
    distance: number,
    favourite: boolean,
    transportMean: PathwayTransportMeans,
    vehicle?: string
}
