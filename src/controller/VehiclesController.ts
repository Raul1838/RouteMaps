import VehicleAlreadyExistException from "../exceptions/VehicleAlreadyExistException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";
import Combustible from "../enums/combustible";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException";
import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";

export default class VehiclesController implements VehiclesInterface {
    private vehicles: Array<Vehicle>;
    constructor() {
        this.vehicles = new Array();
    }
    setDefault({ id }: { id: number; }): Boolean {
        const idExists = this.vehicles.some((vehicle) => vehicle.id === id);

        if (idExists) {
            this.vehicles = this.vehicles.map((vehicle) => ({
                ...vehicle,
                Defecto: vehicle.id === id,
            }));
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
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
    setVehicles(vehicles: Vehicle[]): Boolean {
        this.vehicles = vehicles;
        return this.vehicles === vehicles;
    }
    getVehicles(): Vehicle[] {
        return this.vehicles;
    }
}