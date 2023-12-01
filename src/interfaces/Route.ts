import RouteTypeEnum from "../enums/RuteTypeEnum";
import { Coords } from "./Coords";
import Ubicacion from "./Ubicacion";

export default interface Route {
    Id?: number,
    Inicio: Coords,
    Fin: Coords,
    Trayecto: Ubicacion[],
    Duracion: number,
    Distancia: number,
    Tipo?: RouteTypeEnum,
    Favorito?: boolean,
    Vehiculo?: number
}