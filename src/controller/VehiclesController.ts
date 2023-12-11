import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";

export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }
    modifyVehicle(paramVehicle: Vehicle): Boolean {
        if (this.vehicles.length === 0) {
            throw new EmptyVehiclesException();
        }
        const index = this.vehicles.findIndex(vehicle => vehicle.id === paramVehicle.id);

        if (index !== -1) {
            this.vehicles[index] = { ...this.vehicles[index], ...paramVehicle };
            console.log('Vehicle updated:', this.vehicles[index]);
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehicles = vehicles;
    }
}