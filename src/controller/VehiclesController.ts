import { type } from "os";
import VehicleAlreadyExistException from "../exceptions/VehicleAlreadyExistException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";
import { string } from "yargs";
import Combustible from "../enums/Combustible";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";

export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }
    addVehicle(paramVehicle: Vehicle): Boolean {
        const index = this.vehicles.findIndex(vehicle => vehicle.id === paramVehicle.id);

        if (index === -1) {
            this.vehicles.push(paramVehicle);
            console.log('Vehicle inserted:', paramVehicle);
            return true;
        } else {
            throw new VehicleAlreadyExistException();
        }
    }
    setVehicles(vehicles: Vehicle[]): Boolean {
        this.vehicles = vehicles;
        return this.vehicles === vehicles;
    }
    getVehicles(): Vehicle[] {
        return this.vehicles;
    }
}