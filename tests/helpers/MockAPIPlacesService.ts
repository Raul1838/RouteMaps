import VehicleEnum from "../../src/enums/VehicleEnum";
import APIPlacesInterface from "../../src/interfaces/APIPlacesInterface";
import { Coords } from "../../src/interfaces/Coords";
import Place from "../../src/interfaces/Place";
import Route from "../../src/interfaces/Route";
import Vehicle from "../../src/interfaces/Vehicle";



export default class MockAPIPlacesService implements APIPlacesInterface {
    getRoute(Inicio: Coords, Final: Coords, Vehicle: VehicleEnum | Vehicle): Promise<Route> {
        throw new Error("Method not implemented.");
    }
    // async getPlaceByCoord(coordinates: Coords): Promise<Place> {

    //     if ((coordinates!.Longitud! < 100) && (coordinates!.Latitud! < 100)) {
    //         return {
    //             Latitud: coordinates.Latitud!,
    //             Longitud: coordinates.Longitud!,
    //             Nombre: "Madrid",
    //             Favorito: false
    //         };
    //     }
    //     return {
    //             Latitud: coordinates.Latitud!,
    //             Longitud: coordinates.Longitud!,
    //             Nombre: "",
    //             Favorito: false
    //     };
    // }

}