import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    addVehicle(paramVehicle: Vehicle, userId?: string): Promise<boolean>;
    getVehicles(): Vehicle[];
    deleteVehicle(plate: string, userId?: string): Promise<boolean>;
    setVehicles(vehicles: Vehicle[]): void;
    modifyVehicle(paramVehicle: Vehicle, userId?: string): Promise<boolean>;
    toggleFavourite({ plate }: { plate: string }, userId?: string): boolean;
}