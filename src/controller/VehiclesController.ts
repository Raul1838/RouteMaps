import VehicleAlreadyExistException from "../exceptions/VehicleAlreadyExistException";
import Vehicle from "../interfaces/Vehicle";
import VehiclesInterface from "../interfaces/VehiclesInterface";
import Combustible from "../enums/Combustible";
import InvalidVehicleException from "../exceptions/InvalidVehicleException";
import EmptyVehiclesException from "../exceptions/EmptyVehiclesException";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException";
import { FirebaseService } from "../services/FirebaseService.ts";


export default class VehiclesController implements VehiclesInterface {

    constructor( private firebaseService: FirebaseService ) {
        // firebaseService.getVehicles().then(vehicles => {
        //     setVehicles(vehicles);
        // });
    }

    async toggleFavourite(plate: string , userId: string): Promise<boolean> {
        const data: any = await this.firebaseService.getVehicles(userId);
        const vehiclesLength: number = data.vehicles.length;
        if (vehiclesLength === 0) {
            throw new EmptyVehiclesException();
        }

        const index = data.vehicles.findIndex((vehicle: Vehicle) => (vehicle.plate === plate));

        if (index !== -1) {
            data.vehicles[index].favorite = !data.vehicles[index].favorite;
            await this.firebaseService.storeVehicle(data.vehicles[index], userId);
            return true;
        } else {
            throw new VehicleNotFoundException();
        }
    }


    async addVehicle(paramVehicle: Vehicle, userId: string): Promise<boolean> {
        try {
            await this.firebaseService.storeVehicle(paramVehicle, userId!);
            return true;
        } catch (error) {
            throw error;
        }
    }



    async getVehicle(plate: string, userId: string): Promise<Vehicle>{
        return this.firebaseService.getVehicle(userId, plate);
    }

    async setVehicle(vehicle: Vehicle, userId: string): Promise<Vehicle[]> {
        return await this.firebaseService.storeVehicle(vehicle, userId);
    }


    async getVehicles(userId: string): Promise<Vehicle[]> {
        const data = await this.firebaseService.getVehicles(userId);
        return data?.vehicles || [];
    }


    async deleteVehicle(vehicle: Vehicle, userId: string): Promise<void> {
        await this.firebaseService.deleteVehicle(vehicle, userId)
    }

    async modifyVehicle(paramVehicle: Vehicle, userId: string): Promise<boolean> {
        try {
            await this.firebaseService.storeVehicle(paramVehicle, userId);
            return true;
        } catch (error) {
            throw error;
        }
    }

 

    async setVehicles(vehicles: Vehicle[], userId: string): Promise<void> {
        await this.firebaseService.setVehicles(vehicles, userId);
    }


    async setDefaultVehicle(plate: string, userId: string): Promise<void> {
            await this.firebaseService.setDefaultVehicle(plate, userId);
            localStorage.setItem('defaultVehicle', plate);
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
