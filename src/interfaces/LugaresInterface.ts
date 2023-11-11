import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    setPlaces(lugares: Place[]): Boolean;
    getPlaces(): Place[];
}