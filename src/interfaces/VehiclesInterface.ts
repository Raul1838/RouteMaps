import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    addVehicle(paramVehicle: Vehicle, userId: string): Promise<boolean>;
    getVehicles(userId: string): Vehicle[];
    deleteVehicle(plate: string, userId: string): Promise<boolean>;
    setVehicles(vehicles: Vehicle[], userId: string): void;
    modifyVehicle(paramVehicle: Vehicle, userId: string): Promise<boolean>;
    toggleFavourite({ plate }: { plate: string }, userId: string): boolean;
}