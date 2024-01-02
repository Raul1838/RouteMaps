import VehiclesController from "../../controller/VehiclesController";
import Vehicle from "../../interfaces/Vehicle";

export default class VehiclesViewModel {
    private vehiclesController: VehiclesController;

    constructor(vehiclesController: VehiclesController) {
        this.vehiclesController = vehiclesController;
    }

    async addVehicle(vehicle: Vehicle): Promise<Boolean> {
        return await this.vehiclesController.addVehicle(vehicle);
    }    
    
    deleteVehicle(plate: string): Boolean {
        return this.vehiclesController.deleteVehicle(plate);
    }
    
    modifyVehicle(vehicle: Vehicle): Boolean {
        return this.vehiclesController.modifyVehicle(vehicle);
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehiclesController.setVehicles(vehicles);
    }

    getVehicles(): Vehicle[] {
        return this.vehiclesController.getVehicles();
    }

    getVehicle(plate: string): Vehicle {
        return this.vehiclesController.getVehicle(plate);
    }

}
