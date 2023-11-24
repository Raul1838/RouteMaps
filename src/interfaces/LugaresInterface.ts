import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    addPlace(coordenadas : Coords): Promise<Boolean>;
    getPlaces(): Place[];
    setPlaces(places: Place[]): Boolean;
}