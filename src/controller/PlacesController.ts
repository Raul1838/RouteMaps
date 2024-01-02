import InvalidToponymException from "../exceptions/InvalidToponymException";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import PlacesInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";
import IllegalArgumentException from "../exceptions/IllegalArgumentException";
import EmptyPlacesException from "../exceptions/EmptyPlacesException";
import PlaceNotFoundException from "../exceptions/PlaceNotFoundException";
import APIPlacesService from "../api/APIPlacesService.ts";
import { FirebaseService } from "../services/FirebaseService.ts";


export default class PlacesController implements PlacesInterface {
    private places: Array<Place>;
    private apiService: APIPlacesInterface;
    constructor(apiService: APIPlacesInterface, private firebaseService: FirebaseService) {
        this.apiService = apiService;
        this.places = [];
    }

    async toggleFavourite({ Longitud, Latitud }: { Longitud: number; Latitud: number; }, userId: string | undefined) {
        try {
            this.toggleFavouriteLocally({ Longitud, Latitud });
            const place: Place = {
                Latitud: Latitud,
                Longitud: Longitud,
                Favorito: false,
                Nombre: ''
            }
            await this.firebaseService.storePlace(place, userId!);
        } catch (error) {
            throw error;
        }
    }

    private toggleFavouriteLocally({ Longitud, Latitud }: { Longitud: number; Latitud: number; }) {
        if (this.places.length === 0) {
            throw new EmptyPlacesException();
        }
        const index = this.places.findIndex(place => (place.Longitud === Longitud
            && place.Latitud === Latitud));

        if (index !== -1) {
            this.places[index].Favorito = !this.places[index].Favorito;
            return true;
        } else {
            throw new PlaceNotFoundException();
        }
    }

    async addPlaceByToponym(placeName?: string | undefined, coordenadas?: Coords | undefined, userId?: string | undefined) {
        try {
            const result: Place | undefined = await this.addPlaceByToponymLocally(placeName, coordenadas);
            await this.firebaseService.storePlace(result!, userId!);
        }
        catch (error) {
            throw error;
        }
    }

    private async addPlaceByToponymLocally(placeName?: string | undefined, coordenadas?: Coords | undefined): Promise<Place | undefined> {
        try {
            var result: Place | undefined;
            if (placeName !== undefined) {
                this.checkForValidToponym(placeName);
                result = await this.apiService.getPlaceByToponym(placeName!);
            } else if (coordenadas !== undefined) {
                result = await this.apiService.getPlaceByCoord(coordenadas!);
            } else {
                throw new Error("Input inválido: debe especificar un nombre o coordenadas");
            }
            if (result!.Nombre !== undefined) {
                this.places.push(result);
                return result;
            } else {
                return undefined;
            }
        } catch (error) {
            throw error;
        }
    }

    async addPlaceByCoords(coordenadas: Coords, userId?: string | undefined): Promise<void> {
        try {
            const result: Place | undefined = await this.addPlaceByCoordsLocally(coordenadas);
            await this.firebaseService.storePlace(result!, userId!);
        } catch (error) {
            throw error;
        }
    }

    private async addPlaceByCoordsLocally(coordenadas: Coords): Promise<Place | undefined> {
        try {
            var result: Place | undefined;
            this.checkValidCoordinates(coordenadas);
            if (result!.Nombre !== undefined) {
                this.places.push(result!);
                return result!;
            } else {
                return undefined;
            }
        } catch (error) {
            throw error;
        }
    }
    private checkValidCoordinates(coordenadas: Coords) {
        if ((typeof coordenadas.lat !== 'number') || (typeof coordenadas.lon !== 'number')) {
            throw new IllegalArgumentException();
        }
    }

    async deletePlace(paramPlace: Place, userId?: string | undefined): Promise<void> {
        try {
            await this.deletePlaceLocally(paramPlace);
            await this.firebaseService.deletePlace(paramPlace, userId!);
        } catch (error) {
            throw error;
        }
    }

    deletePlaceLocally(paramPlace: Place): Boolean {
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

    async transformToValidCoords(inputTerm: string): Promise<Coords> {
        const splitInputTerm: string[] = inputTerm.split(',');
        if (splitInputTerm.length > 1) {
            if (splitInputTerm.every((value: string) => this.containsNumber(value))) {
                return { lat: parseFloat(splitInputTerm[1]), lon: parseFloat(splitInputTerm[0]) };
            }
        }
        const place: Place = await this.apiService.getPlaceByToponym(inputTerm);
        return {
            name: place.Nombre,
            lat: place.Latitud,
            lon: place.Longitud
        }
    }
}

let _instance: PlacesController;
export function getPlacesController(apiService?: APIPlacesInterface, firebaseService?: FirebaseService): PlacesController {
    if (!_instance) {
        if (!apiService) apiService = new APIPlacesService();
        if (!firebaseService) firebaseService = new FirebaseService();
        _instance = new PlacesController(apiService, firebaseService);
    }
    return _instance;
}
