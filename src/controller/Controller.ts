import { Coords } from "../interfaces/Coords";
import LugaresInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";

export default class Controller implements LugaresInterface {

    constructor() {

    } 
    addPlace(coordenadas: Coords): Boolean {
        throw new Error("Method not implemented.");
    }
    getPlaces(): Place[] {
        throw new Error("Method not implemented.");
    }
    setPlaces(places: Place[]): Boolean {
        throw new Error("Method not implemented.");
    }
    

}