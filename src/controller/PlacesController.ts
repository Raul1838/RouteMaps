import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import PlacesInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";

export default class PlacesController implements PlacesInterface {
    private places: Array<Place>;
    private apiService: APIPlacesInterface;
    constructor(apiService: APIPlacesInterface) {
        this.apiService = apiService;
        this.places = new Array();
    }
    async addPlace(placeName?: string | undefined, coordenadas?: Coords | undefined): Promise<Boolean> {
        var result: Place | undefined;
        if (typeof placeName !== undefined) {
            result = await this.apiService.getPlaceByToponym(placeName!);
        } else if (coordenadas !== undefined) {
            result = await this.apiService.getPlaceByCoord(coordenadas!);
        } else {
            throw new Error();
        }
        if (result?.Nombre !== undefined) {
            this.places.push(result);
            return true;
        } else {
            return false;
        }
    }

    getPlaces(): Place[] {
        return this.places
    }
    setPlaces(places: Place[]): Boolean {
        this.places = places;
        return this.places === places;
    }


}