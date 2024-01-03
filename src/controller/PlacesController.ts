import InvalidToponymException from "../exceptions/InvalidToponymException";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import Place from "../interfaces/Place";
import IllegalArgumentException from "../exceptions/IllegalArgumentException";
import APIPlacesService from "../api/APIPlacesService.ts";
import { OpenRouteService } from "../services/OpenRouteService.ts";
import { FirebaseService } from "../services/FirebaseService.ts";
import PlaceNotFoundException from "../exceptions/PlaceNotFoundException.ts";
import EmptyPlacesException from "../exceptions/EmptyPlacesException.ts";


export class PlacesController {
    constructor(
        private apiService: APIPlacesInterface,
        private openRouteService: OpenRouteService,
        private firebaseService: FirebaseService,
    ) { }

    async toggleFavourite({ Longitud, Latitud }: { Longitud: number; Latitud: number; }, userId: string): Promise<Boolean> {
        const data: any = await this.firebaseService.getPlaces(userId);
        const placesLength: number = data.places.length;
        if (placesLength === 0) {
            throw new EmptyPlacesException();
        }

        const index = data.places.findIndex((place: Place) => (this.areFloatsEqual(place.Longitud, Longitud)
            && this.areFloatsEqual(place.Latitud, Latitud)));

        if (index !== -1) {
            data.places[index].Favorito = !data.places[index].Favorito;
            await this.firebaseService.storePlace(data.places[index], userId);
            return true;
        } else {
            throw new PlaceNotFoundException();
        }

    }

    private areFloatsEqual(a: number, b: number, epsilon: number = Number.EPSILON): boolean {
        return Math.abs(a - b) < epsilon;
    }

    async addPlaceByToponym(placeName: string, favorite: boolean, userId: string): Promise<Place[]> {
        const completePlace: Coords = await this.openRouteService.getCoordinatesFromPlaceName(placeName);
        this.checkForValidToponym(completePlace.name);
        return await this.savePlaceIntoDatabase({
            Nombre: completePlace.name || '',
            Latitud: completePlace.lat || 0,
            Longitud: completePlace.lon || 0,
            Favorito: favorite
        }, userId);
    }

    async addPlaceByCoords(coordenadas: Coords, userId: string): Promise<Boolean> {
        try {
            this.checkValidCoordinates(coordenadas);
            const result: Place | undefined = await this.apiService.getPlaceByCoord(coordenadas);
            if (!result) return false;
            await this.savePlaceIntoDatabase(result, userId);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPlaceNameByCoords(coordenadas: Coords): Promise<string> {
        try {
            return await this.openRouteService.getPlaceNameByCoords(coordenadas);
        } catch (error) {
            throw error;
        }
    }

    private checkValidCoordinates(coordenadas: Coords) {
        if ((typeof coordenadas.lat !== 'number') || (typeof coordenadas.lon !== 'number')) {
            throw new IllegalArgumentException();
        }
    }

    private async savePlaceIntoDatabase(place: Place, userId: string): Promise<Place[]> {
        return await this.firebaseService.storePlace(place, userId);
    }

    async deletePlace(place: Place, userId: string): Promise<void> {
        await this.firebaseService.deletePlace(place, userId);
    }

    async getPlaces(userId: string): Promise<Place[]> {
        const data = await this.firebaseService.getPlaces(userId);
        return data?.places || [];
    }

    async setPlaces(places: Place[], userId: string): Promise<void> {
        await this.firebaseService.setPlaces(places, userId);
    }

    async replacePlaces(places: Place[], userId: string): Promise<void> {
        await this.firebaseService.replacePlaces(places, userId);
    }

    async setPlace(place: Place, userId: string): Promise<Place[]> {
        return await this.firebaseService.storePlace(place, userId);
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
                const placeName: string = await this.openRouteService.getPlaceNameByCoords({ lon: parseFloat(splitInputTerm[0]), lat: parseFloat(splitInputTerm[1]) });
                return {
                    lat: parseFloat(splitInputTerm[1]),
                    lon: parseFloat(splitInputTerm[0]),
                    name: placeName
                };
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
