import { Step } from "../../model/Openroutingservice/DirectionsResponse";

export interface OpenrouteserviceControllerInterface {
    getGeocode(req: any): Promise<Number[]>;
    getDirections(req: any): Promise<Step[]>;
}