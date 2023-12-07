import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    setPlaces(lugares: Place[]): void;
    addPlace(coordenadas : Coords): Promise<Boolean>;
    getPlaces(): Place[];
}