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