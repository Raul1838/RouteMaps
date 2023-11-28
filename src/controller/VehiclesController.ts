import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";

export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }
    modifyVehicle(paramVehicle: Vehicle): Boolean {
        const index = this.vehicles.findIndex(vehicle => vehicle.id === paramVehicle.id);

        if (index !== -1) {
            // Use the spread operator to create a new object with the updated values
            this.vehicles[index] = { ...this.vehicles[index], ...paramVehicle };
            console.log('Vehicle updated:', this.vehicles[index]);
            return true;
        } else {
            return false;
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