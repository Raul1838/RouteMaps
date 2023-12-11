import VehiclesController from "../controller/VehiclesController";
import Vehicle from "../interfaces/Vehicle";

export default class VehiclesViewModel {
    private vehiclesController: VehiclesController;

    constructor(vehiclesController: VehiclesController) {
        this.vehiclesController = vehiclesController;
    }

    modifyVehicle(vehicle: Vehicle): Boolean {
        return this.vehiclesController.modifyVehicle(vehicle);
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehiclesController.setVehicles(vehicles);
    }

}