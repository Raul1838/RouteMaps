import Vehicle from "./Vehicle";

export default interface VehiclesInterface {
    setVehicles(vehicles: Vehicle[]): void;
    deleteVehicle(id: number): Boolean;
}