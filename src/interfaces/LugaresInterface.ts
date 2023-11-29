import { Coords } from "./Coords";
import Place from "./Place";

export default interface LugaresInterface {
    addPlace(placeName?: string | undefined, coordenadas?: Coords | undefined): Promise<Boolean>;
    getPlaces(): Place[];
    setPlaces(places: Place[]): Boolean;
}