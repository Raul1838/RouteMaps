import PlacesController from "../controller/PlacesController";
import Place from "../interfaces/Place";

export default class PlacesViewModel {
    private placesController: PlacesController;

    constructor(placesController: PlacesController) {
        this.placesController = placesController;
    }

    deletePlace(place: Place): Boolean {
        return this.placesController.deletePlace(place);
    }

    setPlaces(places: Place[]): void {
        this.placesController.setPlaces(places);
    }
}
