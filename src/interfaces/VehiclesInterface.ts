import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    setVehicles(vehicles: Vehicle[]): void;
    getVehicles(): Vehicle[];
}