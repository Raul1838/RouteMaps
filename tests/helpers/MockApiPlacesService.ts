import APINotAvailableExeption from "../../src/exceptions/APINotAvailableExeption";
import APIPlacesInterface from "../../src/interfaces/APIPlacesInterface";
import { Coords } from "../../src/interfaces/Coords";
import Place from "../../src/interfaces/Place";



export default class MockAPIPlacesService implements APIPlacesInterface {

    async getPlaceByToponym(toponym: string): Promise<Place> {
        if (toponym === 'Castellón') {
            return {
                Longitud: 0.012353,
                Latitud: 40.409298,
                Nombre: 'Castellon',
                Favorito: false
            }
        }
        return {
            Latitud: -1,
            Longitud: -1,
            Nombre: 'Castellon',
            Favorito: false
        }
    }

    async getPlaceByCoord(coordinates: Coords): Promise<Place> {
        if ((coordinates.lon === -0.0576800) && (coordinates.lat === 0)) {
            throw new APINotAvailableExeption();
        }
        if ((coordinates!.lon! < 100) && (coordinates!.lat! < 100)) {
            return {
                Latitud: coordinates.lat!,
                Longitud: coordinates.lon!,
                Nombre: "Madrid",
                Favorito: false
            };
        }
        return {
            Latitud: coordinates.lat!,
            Longitud: coordinates.lon!,
            Nombre: "",
            Favorito: false
        };
    }

}