import { Coords } from "./Coords";
import Place from "./Place";

export default interface APIPlacesInterface{
    getPlaceByCoord(coordinates: Coords): Place
}