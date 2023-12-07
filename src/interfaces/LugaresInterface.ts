import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    addPlaceByCoords(coordenadas : Coords): Promise<Boolean>;
    setPlaces(places: Place[]): void;
}