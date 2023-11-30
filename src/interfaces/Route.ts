import { Coords } from "./Coords";
import Ubicacion from "./Ubicacion";

export default interface Route {
    Inicio : Coords,
    Fin: Coords,
    Trayecto: [Ubicacion],
    Duracion: number,
    Distancia: number
}