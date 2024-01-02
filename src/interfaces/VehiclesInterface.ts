import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    addVehicle(paramVehicle: Vehicle, userId?: string): void;
    getVehicles(): Vehicle[];
    deleteVehicle(plate: string, userId?: string): void;
    setVehicles(vehicles: Vehicle[]): void;
    modifyVehicle(paramVehicle: Vehicle, userId?: string): void;
    toggleFavourite({ plate }: { plate: string }): Boolean;
}