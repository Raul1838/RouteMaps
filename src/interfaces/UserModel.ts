import {PathwayTypes} from "../enums/PathwayTypes.ts";
import Vehicle from "./Vehicle.ts";

export interface UserModel {
    uid: string;
    email: string;
    displayName: string;
    defaultPathwayType?: PathwayTypes;
    defaultVehicle?: Vehicle;
}
