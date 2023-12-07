import PlacesController from "../controller/PlacesController";
import { Coords } from "../interfaces/Coords";
import Place from "../interfaces/Place";

export default class PlacesViewModel {

    private placesController: PlacesController;

    constructor(placesController: PlacesController) {
        this.placesController = placesController;
    }

    async addPlaceByCoords(coordenadas: Coords): Promise<Boolean> {
        return await this.placesController.addPlaceByCoords(coordenadas);
    }

    setPlaces(places: Place[]): void {
        return this.placesController.setPlaces(places);
    }

}