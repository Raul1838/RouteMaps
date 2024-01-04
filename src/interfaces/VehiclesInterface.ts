import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    addVehicle(paramVehicle: Vehicle, userId?: string): Promise<boolean>;
    getVehicles(userId: string): Promise<Vehicle[]>;
    deleteVehicle(vehicle: Vehicle, userId?: string): Promise<void>;
    setVehicles(vehicles: Vehicle[], userId: string): Promise<void>;
    modifyVehicle(paramVehicle: Vehicle, userId?: string): Promise<boolean>;
    toggleFavourite(plate: string , userId?: string): Promise<boolean>;
    setVehicle(vehicle: Vehicle, userId: string): Promise<Vehicle[]>;
}