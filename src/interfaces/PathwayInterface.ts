import { Coords } from "./Coords";
import { Pathway } from "./Pathway";
import Vehicle from "./Vehicle";
import PathwayVehicleEnum from "../enums/PathwayVehicleEnum";

export default interface PathwayInterface {
    calculatePathway(from: Coords, to: Coords): Promise<Pathway>;
    calculatePrice(pathway: Pathway, vehicle: Vehicle): Promise<number>;
    calculateCalories(pathway: Pathway, vehicle: PathwayVehicleEnum): Promise<number>;
}