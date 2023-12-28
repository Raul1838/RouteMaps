import { combustiblePriceServiceApi, lightPriceServiceApi } from "../api/PricesServiceApi";
import Combustible from "../enums/Combustible";
import { getEnvVariables } from "../helpers/getEnvVariables";
import { CombustiblePriceInterface } from "../interfaces/combustiblePriceInterface";
import { LightPriceInterface } from "../interfaces/lightPriceInterface";
import { CombustiblePriceService } from "./CombustiblePriceService";


export class PriceService {
    async getPrice(combustible: Combustible): Promise<number> {
        if (combustible === Combustible.Electrico) {
            return await this.getLightPrice();
        } else {
            return await this.getCombustiblePrice(combustible);
        }
    }

    private async getCombustiblePrice(combustible: Combustible) {
        const { data }: { data: CombustiblePriceInterface; } = await combustiblePriceServiceApi.get('');
        var arrayCombustibles: number[];


        // Cogemos todos los valores que nos interesan
        if (combustible === Combustible.Gasolina) {
            arrayCombustibles = data.ListaEESSPrecio
                .map(precioIndividual => parseFloat(precioIndividual["Precio Gasolina 95 E5"].replace(",", ".")))
                .filter(value => !isNaN(value));
        } else {
            arrayCombustibles = data.ListaEESSPrecio
                .map(precioIndividual => parseFloat(precioIndividual["Precio Gasoleo A"].replace(",", ".")))
                .filter(value => !isNaN(value));
        }

        // Y calculamos la media
        const media = arrayCombustibles.reduce((sum, value) => sum + value, 0) /
            arrayCombustibles.length;

        return media;
    }

    private async getLightPrice() {
        const { data }: { data: LightPriceInterface; } = await lightPriceServiceApi.get('');
        return data.price;
    }
}