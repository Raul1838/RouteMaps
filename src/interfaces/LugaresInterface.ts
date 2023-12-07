import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    addPlaceByCoords(coordenadas : Coords): Promise<Boolean>;
    getPlaces(): Place[];
    setPlaces(places: Place[]): Boolean;
}