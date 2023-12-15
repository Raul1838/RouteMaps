import VehiclesController from "../controller/VehiclesController";
import Vehicle from "../interfaces/Vehicle";

export default class VehiclesViewModel {
    private vehiclesController: VehiclesController;

    constructor(vehiclesController: VehiclesController) {
        this.vehiclesController = vehiclesController;
    }

    addVehicle(vehicle: Vehicle): Boolean {
        return this.vehiclesController.addVehicle(vehicle);
    }
    
    deleteVehicle(id: number): Boolean {
        return this.vehiclesController.deleteVehicle(id);
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehiclesController.setVehicles(vehicles);
    }

    getVehicles(): Vehicle[] {
        return this.vehiclesController.getVehicles();
    }

}
