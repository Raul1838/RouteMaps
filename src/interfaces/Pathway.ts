import {Coords} from "./Coords.ts";

export interface Pathway {
    type: string;
    start: Coords;
    end: Coords;
    steps: Coords[];
}
