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
        const { data }: { data: LightPriceInterface; } = await lightPriceServiceApi.get(`/precios-mercados-tiempo-real?start_date=${this.getCurrentDate()}T00:00&end_date=${this.getTomorrowDate()}T00:00&time_trunc=hour`);
        return this.getAvgPrice(data);
    }
    

    private getAvgPrice(data: LightPriceInterface): number {
        const values = data.included[0].attributes.values.map(precioIndividual => precioIndividual.value);
        return values.reduce((sum, entry) => sum + entry, 0) / values.length;
    }

    private getCurrentDate(): string {
        const today = new Date();

        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = today.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    private getTomorrowDate(): string {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const year = tomorrow.getFullYear();
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
        const day = tomorrow.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
}