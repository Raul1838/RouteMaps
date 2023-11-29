import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    addVehicle(vehicle: Vehicle): Boolean;
    setVehicles(vehicles: Vehicle[]): Boolean;
    getVehicles(): Vehicle[];
    setDefault({ id }: { id: number }): Boolean;
}