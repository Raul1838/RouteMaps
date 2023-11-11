import { Coords } from "../interfaces/Coords";
import LugaresInterface from "../interfaces/LugaresInterface";
import Place from "../interfaces/Place";

export default class Controller implements LugaresInterface {

    constructor() {

    } 
    setPlaces(lugares: Place[]): Boolean {
        throw new Error("Method not implemented.");
    }
    getPlaces(): Place[] {
        throw new Error("Method not implemented.");
    }
    insertarLugar(lugares: Place[], coordenadas: Coords): Boolean {
        throw new Error("Method not implemented.");
    }
}