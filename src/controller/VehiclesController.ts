import PlaceNotFoundException from "../exceptions/PlaceNotFoundException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";

export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }
    deleteVehicle(paramId: number): Boolean {
        const index = this.vehicles.findIndex(vehicle => vehicle.id === paramId);

        if (index !== -1) {
            this.vehicles.splice(index, 1);
            console.log('Vehicle deleted:', paramId);
            return true;
        } else {
            throw new PlaceNotFoundException();
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