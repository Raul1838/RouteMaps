import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";

export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehicles = vehicles;
    }

    getVehicles(): Vehicle[] {
        if (this.vehicles.length === 0) {
            throw new EmptyVehiclesException();
        }
        return this.vehicles;
    }

}