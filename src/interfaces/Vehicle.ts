import Combustible from "../enums/Combustible";

export default interface Vehicle {
    plate: string,
    name: string;
    propulsion: Combustible;
    consumption: number;
    favorite?: boolean;
}