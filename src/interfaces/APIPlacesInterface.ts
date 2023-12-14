import { Coords } from "./Coords";
import Place from "./Place";

export default interface APIPlacesInterface{
    getPlaceByCoord(coordinates: Coords): Promise<Place>;
    getPlaceByToponym(toponym: string): Promise<Place>;
}