import { type } from "os";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import PlacesInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";
import { openRouteApi } from "../api/openRouteApi";
import { getEnvVariables } from "../helpers/getEnvVariables";
import { GetPlaceByCoord } from "../interfaces/OpenRoutingInterface";

export default class PlacesController implements PlacesInterface {
    private places : Array<Place>;
    private apiService : APIPlacesInterface;
    constructor(apiService : APIPlacesInterface) {
        this.apiService = apiService;
        this.places = [];
    } 
    addPlace(coordenadas: Coords): Boolean {
        var result : Place | undefined = this.apiService.getPlaceByCoord(coordenadas);
        if (result.Nombre !== undefined) {
            this.places.push(result);
            return true;
        } else {
            return false;
        }
    }
    getPlaces(): Place[] {
        throw new Error("Method not implemented.");
    }
    setPlaces(places: Place[]): Boolean {
        throw new Error("Method not implemented.");
    }
    

}

const { VITE_ROUTES_API_KEY } = getEnvVariables();

export class APIPlacesService implements APIPlacesInterface {
    async getPlaceByCoord(coordinates: Coords): Place {
        var result : Place = {
            Latitud: coordinates.Latitud!,
            Longitud: coordinates.Longitud!,
            Nombre: "",
            Favorito: false
        };
        var res : GetPlaceByCoord | undefined = await openRouteApi.get(`/geocode/reverse?${VITE_ROUTES_API_KEY}&point.lon=${coordinates.Longitud!}&point.lat=${coordinates.Latitud!}`);
        if (res?.features[0].properties.name !== undefined) {
            result = {...Nombre: res?.features[0].properties.name}
        }
    }

}