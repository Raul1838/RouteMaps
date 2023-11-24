import { type } from "os";
import APIPlacesInterface from "../interfaces/APIPlacesInterface";
import { Coords } from "../interfaces/Coords";
import PlacesInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";
import { openRouteApi } from "../api/openRouteApi";
import { getEnvVariables } from "../helpers/getEnvVariables";
import { GetPlaceByCoord } from "../interfaces/OpenRoutingInterface";
import IllegalArgumentException from "../exceptions/IllegalArgumentException";

export default class PlacesController implements PlacesInterface {
    private places : Array<Place>;
    private apiService : APIPlacesInterface;
    constructor(apiService : APIPlacesInterface) {
        this.apiService = apiService;
        this.places = new Array();
    }
    async addPlace(coordenadas: Coords): Promise<Boolean> {
    try{
        this.checkValidCoordinates(coordenadas);
        var result : Place | undefined = await this.apiService.getPlaceByCoord(coordenadas);
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
        } else {
          // Handle other errors
          console.error('An error occurred:', error);
        }
        return false;
    }
    }
    private checkValidCoordinates(coordenadas: Coords) {
        if ((typeof coordenadas.Latitud !== 'number') || (typeof coordenadas.Longitud !== 'number')) {
            throw IllegalArgumentException;
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