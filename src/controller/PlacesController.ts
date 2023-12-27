import InvalidToponymException from "../exceptions/InvalidToponymException";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import PlacesInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";
import IllegalArgumentException from "../exceptions/IllegalArgumentException";
import EmptyPlacesException from "../exceptions/EmptyPlacesException";
import PlaceNotFoundException from "../exceptions/PlaceNotFoundException";


export default class PlacesController implements PlacesInterface {
    private places: Array<Place>;
    private apiService: APIPlacesInterface;
    constructor(apiService: APIPlacesInterface) {
        this.apiService = apiService;
        this.places = new Array();
    }

    toggleFavourite({ Longitud, Latitud }: { Longitud: number; Latitud: number; }): Boolean {
        
        const index = this.places.findIndex(place => (place.Longitud === Longitud
            && place.Latitud === Latitud));

        if (index !== -1) {
            this.places[index].Favorito = !this.places[index].Favorito;
            console.log('Place updated:', this.places[index]);
            return true;
        } else {
            throw new PlaceNotFoundException();
        }
    }

    async addPlaceByToponym(placeName?: string | undefined, coordenadas?: Coords | undefined): Promise<Boolean> {
        var result: Place | undefined;
        try {
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
        } catch (error) {
            throw error;
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
            throw error;
        }
    }
    private checkValidCoordinates(coordenadas: Coords) {
        if ((typeof coordenadas.Latitud !== 'number') || (typeof coordenadas.Longitud !== 'number')) {
            throw new IllegalArgumentException();
        }
    }

    deletePlace(paramPlace: Place): Boolean {
        if (this.places.length === 0) {
            throw new EmptyPlacesException("No hay lugares para eliminar.");
        }
        const index = this.places.findIndex(place => (place.Nombre === paramPlace.Nombre &&
            place.Latitud === paramPlace.Latitud &&
            place.Longitud === paramPlace.Longitud));

        if (index !== -1) {
            this.places.splice(index, 1);
            return true;
        } else {
            throw new PlaceNotFoundException("No se encontró el lugar a eliminar.");
        }
    }

    setPlaces(places: Place[]): void {
        this.places = places;
    }

    getPlaces(): Place[] {
        if (this.places.length === 0) {
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