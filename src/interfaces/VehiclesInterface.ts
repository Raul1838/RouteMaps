import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    setVehicles(vehicles: Vehicle[]): void;
    modifyVehicle(vehicle: Vehicle): Boolean;
}