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
    
    async modifyVehicle(vehicle: Vehicle): Promise<Boolean> {
        return this.vehiclesController.modifyVehicle(vehicle);
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehiclesController.updateVehicles(vehicles);
    }

    getVehicles(): Vehicle[] {
        return this.vehiclesController.getVehicles();
    }

    async getVehicle(plate: string): Promise<Vehicle> {
        return this.vehiclesController.getVehicle(plate);
    }

    toggleFavourite(plate: string): Boolean {
        return this.vehiclesController.toggleFavourite(plate);
    }

}
