import { type } from "os";
import InvalidToponymException from "../exceptions/InvalidToponymException";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import PlacesInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";
import { openRouteApi } from "../api/openRouteApi";
import { getEnvVariables } from "../helpers/getEnvVariables";
import  GetPlaceByCoord  from "../interfaces/OpenRoutingInterface";
import IllegalArgumentException from "../exceptions/IllegalArgumentException";
import APINotAvailableExeption from "../exceptions/APINotAvailableExeption";
import EmptyPlacesException from "../exceptions/EmptyPlacesException";

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

    async addPlaceByCoords(coordenadas: Coords): Promise<Boolean> {
        try {
            this.checkValidCoordinates(coordenadas);
            var result: Place | undefined = await this.apiService.getPlaceByCoord(coordenadas);
            if (result.Nombre !== undefined) {
                this.places.push(result);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            if (error instanceof IllegalArgumentException) {
                // Handle IllegalArgumentException
                console.error('Invalid coordinates:', error.message);
                throw error;
            } else if (error instanceof APINotAvailableExeption) {
                console.error('API not available: ', error);
                throw error;
            } else {
                // Handle other errors
                console.error('An error occurred:', error);
            }
            return false;
        }
    }
    private checkValidCoordinates(coordenadas: Coords) {
        if ((typeof coordenadas.Latitud !== 'number') || (typeof coordenadas.Longitud !== 'number')) {
            throw new IllegalArgumentException();
        }
    }

    setPlaces(places: Place[]): void {
        this.places = places;
    }

    getPlaces(): Place[] {
        if (this.places.length === 0){
            throw new EmptyPlacesException();
        }
        return this.places
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