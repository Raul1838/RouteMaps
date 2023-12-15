import VehicleAlreadyExistException from "../exceptions/VehicleAlreadyExistException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";
import Combustible from "../enums/Combustible";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";

export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }
    addVehicle(paramVehicle: Vehicle): Boolean {
        if (typeof paramVehicle.id !== 'number'
            || typeof paramVehicle.Nombre !== 'string'
            || !Object.values(Combustible).includes(paramVehicle.propulsion)
            || typeof paramVehicle.consumo !== 'number'
            || typeof paramVehicle.Favorito !== 'boolean'
            || typeof paramVehicle.Defecto !== 'boolean') {
            throw new InvalidVehicleException();
        }

        const index = this.vehicles.findIndex(vehicle => vehicle.id === paramVehicle.id);

        if (index === -1) {
            this.vehicles.push(paramVehicle);
            console.log('Vehicle inserted:', paramVehicle);
            return true;
        } else {
            throw new VehicleAlreadyExistException();
        }
    }
    
    setVehicles(vehicles: Vehicle[]): void {
        this.vehicles = vehicles;
    }
}