import VehicleAlreadyExistException from "../exceptions/VehicleAlreadyExistException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";
import Combustible from "../enums/Combustible";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";
import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException";
import {FirebaseService} from "../services/FirebaseService.ts";
import {DocumentData} from "firebase/firestore/lite";


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
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehicles = new Map(vehicles.map(vehicle => [vehicle.id, vehicle]));
    }

    async setDefaultVehicle(vehicleId: number, userId: string): Promise<void> {
        // if (this.vehicles.has(vehicleId)) {
        //     this.firebaseService.setDefaultVehicle(vehicleId, userId);
        // } else {
        //     throw new VehicleNotFoundException('El vehículo no existe');
        // }
        await this.firebaseService.setDefaultVehicle(vehicleId, userId);
    }

    async getDefaultVehicle(userId: string): Promise<DocumentData> {
        return await this.firebaseService.getDefaultVehicle(userId);
    }
}

let _instance: VehiclesController;
export function getVehiclesController(firebaseService?: FirebaseService): VehiclesController {
    if (!_instance) {
        _instance = new VehiclesController((!firebaseService ? new FirebaseService() : firebaseService));
    }
    return _instance;
}
