import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    addVehicle(vehicle : Vehicle): Promise<Boolean>;
    getVehicles(): Vehicle[];
    deleteVehicle(plate: string): Boolean;
    setVehicles(vehicles: Vehicle[]): void;
    modifyVehicle(vehicle: Vehicle): Boolean;
    toggleFavourite({ plate }: { plate: string }): Boolean;
}