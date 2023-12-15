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

    getPlaces(): Place[] {
        return this.placesController.getPlaces();
    }


    async addPlaceByToponym(placeName: string): Promise<Boolean> {
        return await this.placesController.addPlaceByToponym(placeName);
    }

    deletePlace(place: Place): Boolean {
        return this.placesController.deletePlace(place);
    }

    setPlaces(places: Place[]): void {
        this.placesController.setPlaces(places);
    }
}
