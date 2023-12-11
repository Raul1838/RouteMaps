import VehiclesController from "../controller/VehiclesController";
import Vehicle from "../interfaces/Vehicle";

export default class VehiclesViewModel {
    private vehiclesController: VehiclesController;

    constructor(vehiclesController: VehiclesController) {
        this.vehiclesController = vehiclesController;
    }

    deleteVehicle(id: number): Boolean {
        return this.vehiclesController.deleteVehicle(id);
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehiclesController.setVehicles(vehicles);
    }
}
