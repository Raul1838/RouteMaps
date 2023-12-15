import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    addVehicle(vehicle : Vehicle): Boolean;
    getVehicles(): Vehicle[];
    setVehicles(vehicles: Vehicle[]): void;
    deleteVehicle(id: number): Boolean;
}