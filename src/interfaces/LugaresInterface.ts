import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    setPlaces(lugares: Place[]): void;
    getPlaces(): Place[];
}