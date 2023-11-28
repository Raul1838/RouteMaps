import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";

export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }
    addVehicle(vehicle: Vehicle): Boolean {
        var beforeLength: number = this.vehicles.length;
        this.vehicles.push(vehicle);
        var afterLength: number = this.vehicles.length;

        return (afterLength === beforeLength + 1);
    }
    setVehicles(vehicles: Vehicle[]): Boolean {
        this.vehicles = vehicles;
        return this.vehicles === vehicles;
    }
    getVehicles(): Vehicle[] {
        return this.vehicles;
    }
}