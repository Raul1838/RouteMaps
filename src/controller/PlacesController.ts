import InvalidToponymException from "../exceptions/InvalidToponymException";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import {Coords} from "../interfaces/Coords";
import Place from "../interfaces/Place";
import IllegalArgumentException from "../exceptions/IllegalArgumentException";
import EmptyPlacesException from "../exceptions/EmptyPlacesException";
import PlaceNotFoundException from "../exceptions/PlaceNotFoundException";
import APIPlacesService from "../api/APIPlacesService.ts";
import {OpenRouteService} from "../services/OpenRouteService.ts";
import {FirebaseService} from "../services/FirebaseService.ts";


export class PlacesController {
    constructor(
        private apiService: APIPlacesInterface,
        private openRouteService: OpenRouteService,
        private firebaseService: FirebaseService,
    ) { }

    async addPlaceByToponym(placeName: string, userId: string): Promise<Place[]> {
        const completePlace: Coords = await this.openRouteService.getCoordinatesFromPlaceName(placeName);
        this.checkForValidToponym(completePlace.name);
        return await this.firebaseService.storePlace({
            Nombre: completePlace.name || '',
            Latitud: completePlace.lat || 0,
            Longitud: completePlace.lon || 0,
            Favorito: false
        }, userId);
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
        if ((typeof coordenadas.lat !== 'number') || (typeof coordenadas.lon !== 'number')) {
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
    async getPlaces(userId: string): Promise<Place[]> {
        const data = await this.firebaseService.getPlaces( userId );
        return data?.places || [];
    }

    async setPlaces(places: Place[], userId: string): Promise<void> {
        await this.firebaseService.setPlaces(places, userId);
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
        if( splitInputTerm.length > 1 ) {
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
export function getPlacesController(apiService?: APIPlacesInterface, openRouteService?: OpenRouteService, firebaseService?: FirebaseService): PlacesController {
    if (!_instance) {
        if (!apiService) apiService = new APIPlacesService();
        if (!openRouteService) openRouteService = new OpenRouteService();
        if (!firebaseService) firebaseService = new FirebaseService();
        _instance = new PlacesController(apiService, openRouteService, firebaseService);
    }
    return _instance;
}
