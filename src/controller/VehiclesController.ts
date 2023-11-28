import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";

export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }

    addVehicle(vehicle: Vehicle): Boolean {
        throw new Error("Method not implemented.");
    }
    modifyVehicle(paramVehicle: Vehicle): Boolean {
        throw new Error("Method not implemented.");
    }

    setVehicles(vehicles: Vehicle[]): Boolean {
        this.vehicles = vehicles;
        return this.vehicles === vehicles;
    }
    getVehicles(): Vehicle[] {
        if (this.vehicles.length === 0) {
            throw new EmptyVehiclesException();
        }
        return this.vehicles;
    }

}