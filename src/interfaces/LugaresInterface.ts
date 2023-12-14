import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    addPlaceByCoords(coordenadas : Coords): Promise<Boolean>;
    addPlaceByToponym(placeName?: string | undefined, coordenadas?: Coords | undefined): Promise<Boolean>;
    setPlaces(places: Place[]): void;
    getPlaces(): Place[];
}