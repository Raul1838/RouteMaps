import PathwayTypeEnum from "../enums/PathwayTypeEnum.ts";
import {Coords} from "./Coords.ts";

export interface Pathway {
    Id?: number,
    type?: PathwayTypeEnum;
    start: Coords;
    end: Coords;
    steps: Coords[];
    duration: number,
    distence: number,
    favourite?: boolean,
    vehicle?: number
}