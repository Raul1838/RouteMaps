import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    addVehicle(vehicle : Vehicle): Boolean;
    setVehicles(vehicles: Vehicle[]): void;
}