import {Coords} from "./Coords.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";
import {PathwayTransportMeans} from "../enums/PathwayTransportMeans.ts";

export interface Pathway {
    id?: number,
    type: PathwayTypes;
    start: Coords;
    end: Coords;
    codifiedPath: string;
    duration: number,
    distance: number,
    favourite: boolean,
    transportMean: PathwayTransportMeans,
    vehiclePlate: string,
    cost: number,
}
