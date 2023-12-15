import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    addVehicle(vehicle : Vehicle): Boolean;
    getVehicles(): Vehicle[];
    deleteVehicle(id: number): Boolean;
    setVehicles(vehicles: Vehicle[]): void;
    modifyVehicle(vehicle: Vehicle): Boolean;
}