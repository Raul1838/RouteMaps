import VehiclesController from "../controller/VehiclesController";
import Vehicle from "../interfaces/Vehicle";

export default class VehiclesViewModel {
    private vehiclesController: VehiclesController;

    constructor(vehiclesController: VehiclesController) {
        this.vehiclesController = vehiclesController;
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehiclesController.setVehicles(vehicles);
    }

    getVehicles(): Vehicle[] {
        return this.vehiclesController.getVehicles();
    }

}
