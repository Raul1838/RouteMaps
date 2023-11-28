import EmptyPlacesException from "../exceptions/EmptyPlacesException";
import PlaceNotFoundException from "../exceptions/PlaceNotFoundException";
import PlacesInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";

export default class PlacesController implements PlacesInterface {
    private places: Array<Place>;
    constructor() {
        this.places = new Array();
    }

    deletePlace(paramPlace: Place): Boolean {
        const index = this.places.findIndex(place => (place.Nombre === paramPlace.Nombre &&
            place.Latitud === paramPlace.Latitud &&
            place.Longitud === paramPlace.Longitud));

        if (index !== -1) {
            this.places.splice(index, 1);
            console.log('Place deleted:', paramPlace);
            return true;
        } else {
            throw new PlaceNotFoundException();
        }
    }
    getPlaces(): Place[] {
        if (this.places.length === 0) {
            throw new EmptyPlacesException();
        }
        return this.places
    }
    setPlaces(places: Place[]): Boolean {
        this.places = places;
        return this.places === places;
    }


}