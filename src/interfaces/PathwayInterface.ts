import { Coords } from "./Coords";
import { Pathway } from "./Pathway";
import Vehicle from "./Vehicle";

export default interface PathwayInterface {
    calculatePathway(from: Coords, to: Coords): Promise<Pathway>;
    calculatePrice(pathway: Pathway, vehicle: Vehicle): Promise<number>;
}