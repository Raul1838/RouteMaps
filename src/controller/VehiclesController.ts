import VehicleAlreadyExistException from "../exceptions/VehicleAlreadyExistException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";
import Combustible from "../enums/Combustible";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";
import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException";


export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }

    toggleFavourite({ id }: { id: number; }): Boolean {
        throw new Error("Method not implemented.");
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
            return true;
        } else {
            throw new VehicleAlreadyExistException();
        }
    }


    getVehicles(): Vehicle[] {
        return this.vehicles;
    }

    deleteVehicle(paramId: number): Boolean {
        if (this.vehicles.length === 0) {
            throw new EmptyVehiclesException();
        }
        const index = this.vehicles.findIndex(vehicle => vehicle.id === paramId);

        if (index !== -1) {
            this.vehicles.splice(index, 1);
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
    }

    modifyVehicle(paramVehicle: Vehicle): Boolean {
        if (this.vehicles.length === 0) {
            throw new EmptyVehiclesException();
        }
        const index = this.vehicles.findIndex(vehicle => vehicle.id === paramVehicle.id);

        if (index !== -1) {
            this.vehicles[index] = { ...this.vehicles[index], ...paramVehicle };
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehicles = vehicles;
    }
}