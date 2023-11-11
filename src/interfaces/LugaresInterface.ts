import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    addPlace(coordenadas : Coords): Boolean;
    getPlaces(): Place[];
    setPlaces(places: Place[]): Boolean;
}