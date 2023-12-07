import PlacesController from "../controller/PlacesController";
import { Coords } from "../interfaces/Coords";
import Place from "../interfaces/Place";

export default class PlacesViewModel {

    private placesController: PlacesController;

    constructor(placesController: PlacesController) {
        this.placesController = placesController;
    }

    getPlaces(): Place[] {
        return this.placesController.getPlaces();
    }

    setPlaces(places: Place[]): void {
        this.placesController.setPlaces(places);
    }

}