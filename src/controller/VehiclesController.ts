import VehicleAlreadyExistException from "../exceptions/VehicleAlreadyExistException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";
import Combustible from "../enums/Combustible";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";
import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException";
import {FirebaseService} from "../services/FirebaseService.ts";


export default class VehiclesController implements VehiclesInterface {

    private vehicles: Map<number, Vehicle> = new Map<number, Vehicle>();

    constructor( private firebaseService: FirebaseService ) {
        // firebaseService.getVehicles().then(vehicles => {
        //     setVehicles(vehicles);
        // });
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

        if (!this.vehicles.has(paramVehicle.id)) {
            this.vehicles.set(paramVehicle.id, paramVehicle);
            console.log('Vehicle inserted:', paramVehicle);
            return true;
        } else {
            throw new VehicleAlreadyExistException();
        }
    }

    getVehicles(): Vehicle[] {
        return Array.from(this.vehicles.values());
    }

    deleteVehicle(paramId: number): Boolean {
        if (this.vehicles.size === 0) {
            throw new EmptyVehiclesException();
        }

        if (this.vehicles.has(paramId)) {
            this.vehicles.delete(paramId);
            console.log('Vehicle deleted:', paramId);
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
    }

    modifyVehicle(paramVehicle: Vehicle): Boolean {
        if (this.vehicles.size === 0) {
            throw new EmptyVehiclesException();
        }

        if (this.vehicles.has(paramVehicle.id)) {
            this.vehicles.set(paramVehicle.id, { ...this.vehicles.get(paramVehicle.id), ...paramVehicle });
            console.log('Vehicle updated:', this.vehicles.get(paramVehicle.id));
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehicles = new Map(vehicles.map(vehicle => [vehicle.id, vehicle]));
    }

    setDefaultVehicle( vehicleId: number ): void {
        if (this.vehicles.has(vehicleId)) {
            // this.firebaseService.setDefaultVehicle(vehicleId);
        } else {
            throw new VehicleNotFoundException('El vehículo no existe');
        }
    }
}

let _instance: VehiclesController;
export function getVehiclesController(firebaseService?: FirebaseService): VehiclesController {
    if (!_instance) {
        _instance = new VehiclesController((!firebaseService ? new FirebaseService() : firebaseService));
    }
    return _instance;
}
