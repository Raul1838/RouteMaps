import { ListaEESSPrecio } from "../../model/Geoportalgasolineras/Geoportalgasolineras";

export interface GeoportalgasolinerasControllerInterface {
    getFuelPrice(req: any): Promise<ListaEESSPrecio[] | any>;
}