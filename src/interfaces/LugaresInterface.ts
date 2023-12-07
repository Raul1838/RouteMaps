import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    addPlaceByToponym(placeName?: string | undefined, coordenadas?: Coords | undefined): Promise<Boolean>;
    setPlaces(places: Place[]): void;
}