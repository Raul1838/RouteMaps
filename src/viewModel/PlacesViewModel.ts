import PlacesController from "../controller/PlacesController";
import { Coords } from "../interfaces/Coords";
import Place from "../interfaces/Place";

export default class PlacesViewModel {

    private placesController: PlacesController;

    constructor(placesController: PlacesController) {
        this.placesController = placesController;
    }

    async addPlace(coordenadas: Coords): Promise<Boolean> {
        return await this.placesController.addPlace(coordenadas);
    }

    getPlaces(): Place[] {
        return this.placesController.getPlaces();
    }

    setPlaces(places: Place[]): Boolean {
        return this.placesController.setPlaces(places);
    }

}