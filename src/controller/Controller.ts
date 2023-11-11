import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";

export default class Controller implements VehiclesInterface {

    constructor() {

    }
    deleteVehicle(id: number): Boolean {
        throw new Error("Method not implemented.");
    }
    setVehicles(vehicles: Vehicle[]): Boolean {
        throw new Error("Method not implemented.");
    }
    getVehicles(): Vehicle[] {
        throw new Error("Method not implemented.");
    }




}