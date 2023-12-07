import PlacesController from "../controller/PlacesController";
import { Coords } from "../interfaces/Coords";
import Place from "../interfaces/Place";

export default class PlacesViewModel {
    private placesController: PlacesController;

    constructor(placesController: PlacesController) {
        this.placesController = placesController;
    }

    async addPlaceByToponym(placeName: string): Promise<Boolean> {
        return await this.placesController.addPlaceByToponym(placeName);
    }

}
