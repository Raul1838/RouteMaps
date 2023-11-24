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
    async addPlace(coordenadas: Coords): Promise<Boolean> {
        var result : Place | undefined = await this.apiService.getPlaceByCoord(coordenadas);
        if (result.Nombre !== undefined) {
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