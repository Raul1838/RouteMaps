import APINotAvailableExeption from "../../src/exceptions/APINotAvailableExeption";
import APIPlacesInterface from "../../src/interfaces/APIPlacesInterface";
import { Coords } from "../../src/interfaces/Coords";
import Place from "../../src/interfaces/Place";



export default class MockAPIPlacesService implements APIPlacesInterface {
    async getPlaceByCoord(coordinates: Coords): Promise<Place> {
        if ((coordinates.Longitud === -0.0576800) && (coordinates.Latitud === 0)) {
            throw new APINotAvailableExeption();
        }
        if ((coordinates!.Longitud! < 100) && (coordinates!.Latitud! < 100)) {
            return {
                Latitud: coordinates.Latitud!,
                Longitud: coordinates.Longitud!,
                Nombre: "Madrid",
                Favorito: false
            };
        }
        return {
            Latitud: coordinates.Latitud!,
            Longitud: coordinates.Longitud!,
            Nombre: "",
            Favorito: false
        };
    }

}