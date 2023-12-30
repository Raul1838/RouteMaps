import VehicleAlreadyExistException from "../exceptions/VehicleAlreadyExistException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";
import Combustible from "../enums/Combustible";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";
import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException";
import {FirebaseService} from "../services/FirebaseService.ts";


export default class VehiclesController implements VehiclesInterface {

    private vehicles: Map<string, Vehicle> = new Map<string, Vehicle>();

    constructor( private firebaseService: FirebaseService ) {
        // firebaseService.getVehicles().then(vehicles => {
        //     setVehicles(vehicles);
        // });
    }

    addVehicle(paramVehicle: Vehicle): Boolean {
        if (typeof paramVehicle.plate !== 'string'
            || typeof paramVehicle.name !== 'string'
            || !Object.values(Combustible).includes(paramVehicle.propulsion)
            || typeof paramVehicle.consumption !== 'number'
            || typeof paramVehicle.favorite !== 'boolean') {
            throw new InvalidVehicleException();
        }

        if (!this.vehicles.has(paramVehicle.plate)) {
            this.vehicles.set(paramVehicle.plate, paramVehicle);
            return true;
        } else {
            throw new VehicleAlreadyExistException();
        }
    }

    getVehicle(plate: string): Vehicle{
        return this.vehicles.get(plate) || {
            plate: '',
            name: '',
            propulsion: Combustible.Gasolina,
            consumption: 0,
            favorite: false
        };
    }

    getVehicles(): Vehicle[] {
        return Array.from(this.vehicles.values());
    }

    deleteVehicle(plate: string): Boolean {
        if (this.vehicles.size === 0) {
            throw new EmptyVehiclesException();
        }

        if (this.vehicles.has(plate)) {
            this.vehicles.delete(plate);
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
    }

    modifyVehicle(paramVehicle: Vehicle): Boolean {
        if (this.vehicles.size === 0) {
            throw new EmptyVehiclesException();
        }

        if (this.vehicles.has(paramVehicle.plate)) {
            this.vehicles.set(paramVehicle.plate, { ...this.vehicles.get(paramVehicle.plate), ...paramVehicle });
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
    }

    setVehicles(vehicles: Vehicle[]): void {
        this.vehicles = new Map(vehicles.map(vehicle => [vehicle.plate, vehicle]));
    }

    async setDefaultVehicle(plate: string, userId: string): Promise<void> {
        if (this.vehicles.has(plate)) {
            await this.firebaseService.setDefaultVehicle(plate, userId);
        } else {
            throw new VehicleNotFoundException('El vehículo no existe');
        }
    }

    async getDefaultVehicle(userId: string): Promise<string> {
        let data: string = '';
        await this.firebaseService.getDefaultVehicle(userId).then((data) => {
            data = data.vehiclePlate;
        }).catch(() => {
            throw new VehicleNotFoundException('El usuario no tiene vehículo por defecto');
        });
        return data;
    }
}

let _instance: VehiclesController;
export function getVehiclesController(firebaseService?: FirebaseService): VehiclesController {
    if (!_instance) {
        _instance = new VehiclesController((!firebaseService ? new FirebaseService() : firebaseService));
    }
    return _instance;
}
