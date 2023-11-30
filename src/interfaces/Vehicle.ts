import Combustible from "../enums/Combustible";


export default interface Vehicle {
    id: number,
    Nombre: string;
    propulsion: Combustible;
    consumo: number;
    Favorito?: boolean;
    Defecto?: boolean;
}