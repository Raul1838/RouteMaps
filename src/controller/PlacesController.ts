import InvalidToponymException from "../exceptions/InvalidToponymException";
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

    async addPlaceByToponym(placeName?: string | undefined, coordenadas?: Coords | undefined): Promise<Boolean> {
        var result: Place | undefined;
        if (placeName !== undefined) {
            this.checkForValidToponym(placeName);
            result = await this.apiService.getPlaceByToponym(placeName!);
        } else if (coordenadas !== undefined) {
            result = await this.apiService.getPlaceByCoord(coordenadas!);
        } else {
            throw new Error("Input inválido: debe especificar un nombre o coordenadas");
        }
        if (result?.Nombre !== undefined) {
            this.places.push(result);
            return true;
        } else {
            return false;
        }
    }

    setPlaces(places: Place[]): void {
        this.places = places;
    }

    //Otros métodos

    checkForValidToponym(placeName: string | undefined) {
        if (this.containsNumber(placeName!)) {
            throw new InvalidToponymException("El nombre del lugar no puede contener números");
        }
    }

    containsNumber(text: string): boolean {
        const numberRegex = /\d/;
        return numberRegex.test(text);
    }

}