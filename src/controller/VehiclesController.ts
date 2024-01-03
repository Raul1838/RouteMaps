import VehicleAlreadyExistException from "../exceptions/VehicleAlreadyExistException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";
import Combustible from "../enums/Combustible";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";
import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException";
import { FirebaseService } from "../services/FirebaseService.ts";


export default class VehiclesController implements VehiclesInterface {

    private vehicles: Map<string, Vehicle> = new Map<string, Vehicle>();

    constructor( private firebaseService: FirebaseService ) {
        // firebaseService.getVehicles().then(vehicles => {
        //     setVehicles(vehicles);
        // });
    }

    toggleFavourite({ plate }: { plate: string }, userId?: string): boolean {
        try {
            this.toggleFavouriteLocally({ plate });
            const vehiclePuppet: Vehicle = { plate: plate, consumption: 0, name: '', propulsion: Combustible.Diesel };

            this.firebaseService.storeVehicle(vehiclePuppet, userId!);
            return true;
        } catch (error) {
            throw error;
        }
    }

    private toggleFavouriteLocally({ plate }: { plate: string }): boolean {
        if (this.vehicles.size === 0) {
            throw new EmptyVehiclesException();
        }

        if (this.vehicles.has(plate)) {
            const vehicle = this.vehicles.get(plate);
            if (vehicle) {
                vehicle.favorite = !vehicle.favorite;
                return true;
            } else {
                // Handle the case where the vehicle is not found (this should not happen)
                throw new VehicleNotFoundException();
            }
        } else {
            throw new VehicleNotFoundException();
        }
    }

    async addVehicle(paramVehicle: Vehicle, userId?: string): Promise<boolean> {
        try {
            this.addVehicleLocally(paramVehicle);
            await this.firebaseService.storeVehicle(paramVehicle, userId!);
            return true;
        } catch (error) {
            throw error;
        }
    }

    addVehicleLocally(paramVehicle: Vehicle): Boolean {
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

    async getVehicle(plate: string): Promise<Vehicle>{
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

    async deleteVehicle(plate: string, userId?: string): Promise<boolean> {
        try {
            this.deleteVehicleLocally(plate);
            const vehiclePuppet: Vehicle = { plate: plate, consumption: 0, name: '', propulsion: Combustible.Diesel };
            await this.firebaseService.deleteVehicle(vehiclePuppet, userId!)
            return true;
        } catch (error) {
            throw error;
        }
    }

    private deleteVehicleLocally(plate: string): Boolean {
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

    async modifyVehicle(paramVehicle: Vehicle, userId?: string): Promise<boolean> {
        try {
            this.modifyVehicleLocally(paramVehicle);
            await this.firebaseService.storeVehicle(paramVehicle, userId!);
            return true;
        } catch (error) {
            throw error;
        }
    }

    private modifyVehicleLocally(paramVehicle: Vehicle): Boolean {
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
            localStorage.setItem('defaultVehicle', plate);
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
        localStorage.setItem('defaultVehicle', data);
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
