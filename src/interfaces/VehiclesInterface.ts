import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    setVehicles(vehicles: Vehicle[]): Boolean;
    getVehicles(): Vehicle[];
    modifyVehicle(vehicle: Vehicle): Boolean;
}