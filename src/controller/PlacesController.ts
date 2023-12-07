import EmptyPlacesException from "../exceptions/EmptyPlacesException";
import { Coords } from "../interfaces/Coords";
import PlacesInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";

export default class PlacesController implements PlacesInterface {
    private places : Array<Place>;
    constructor() {
        this.places = new Array();
    }
    addPlace(coordenadas: Coords): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }

    getPlaces(): Place[] {
        if (this.places.length === 0){
            throw new EmptyPlacesException();
        }
        return this.places
    }
    setPlaces(places: Place[]): void {
        this.places = places;
    }
    

}