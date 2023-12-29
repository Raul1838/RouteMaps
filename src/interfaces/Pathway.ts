import PathwayTypeEnum from "../enums/PathwayTypeEnum.ts";
import { Coords } from "./Coords.ts";
import {OpenRoutingPathway} from "./OpenRoutingPathway.ts";

export interface Pathway {
    id?: number,
    type: PathwayTypeEnum;
    start: Coords;
    end: Coords;
    path: OpenRoutingPathway;
    duration: number,
    distance: number,
    favourite: boolean,
    vehicle?: string
}