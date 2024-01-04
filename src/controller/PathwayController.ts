import { Coords } from "../interfaces/Coords.ts";
import { OpenRouteService } from "../services/OpenRouteService.ts";
import { Pathway } from "../interfaces/Pathway.ts";
import Vehicle from "../interfaces/Vehicle.ts";
import { PriceService } from "../services/PriceService.ts";
import VehicleNotFoundException from "../exceptions/VehicleNotFoundException.ts";
import { PathwayException, PathWayExceptionMessages } from "../exceptions/PathwayException.ts";
import { FirebaseService } from "../services/FirebaseService.ts";
import { PathwayTypes } from "../enums/PathwayTypes.ts";
import { PathwayTransportMeans } from "../enums/PathwayTransportMeans.ts";

export class PathwayController {

    private pathways: Pathway[];
    constructor(
        private openRouteService: OpenRouteService,
        private firebaseService: FirebaseService,
        private priceService: PriceService,
    ) {
        this.pathways = [];
    }

    getOpenRouteService() {
        return this.openRouteService;
    }

    getFirebaseService() {
        return this.firebaseService;
    }


    async toggleFavourite(paramPathway: Pathway, userId: string) {
        try {
            paramPathway = { ...paramPathway, favourite: !paramPathway.favourite };
            // this.toggleFavouriteLocally(paramPathway);
            await this.firebaseService.toggleFavouritePathway(paramPathway, userId!);
        } catch (error) {
            throw error;
        }
    }

    async calculatePathway(from: Coords, to: Coords, pathwayTransportMean?: PathwayTransportMeans, pathwayType?: PathwayTypes): Promise<Pathway> {
        if ((!from.lat || !from.lon) && from.name) {
            from = await this.openRouteService.getCoordinatesFromPlaceName(from.name);
        }
        if ((!to.lat || !to.lon) && to.name) {
            to = await this.openRouteService.getCoordinatesFromPlaceName(to.name);
        }
        return await this.openRouteService.calculatePathway(from, to, pathwayTransportMean, pathwayType);
    }

    async deletePathway(paramPathway: Pathway, userId: string) {
        try {
            // this.deletePathwayLocally(paramPathway);
            await this.firebaseService.deletePathway(paramPathway, userId!);
        } catch (error) {
            throw error;
        }
    }

    async getPathways(userId: string) {
        try {
            const pathways = await this.firebaseService.getPathways(userId);
            return pathways;
        } catch (error) {
            throw error;
        }
    }

    async replacePathways(pathways: Pathway[], userId: string): Promise<void> {
        await this.firebaseService.replacePathways(pathways, userId);
    }


    async addPathway(pathway: Pathway, userId: string) {
        try {
            await this.firebaseService.storePathway(pathway, userId);
        } catch (error) {
            throw error;
        }
    }

    calculateCalories(pathway: Pathway, vehicle: PathwayTransportMeans): number {
        if (!pathway || pathway.distance === 0) {
            throw new PathwayException(PathWayExceptionMessages.FarPathway);
        }
        if (vehicle === PathwayTransportMeans.WALKING) {
            return (pathway.distance * 12 / 250);
        } else if (vehicle === PathwayTransportMeans.BIKE) {
            return (pathway.distance * 6 / 250);
        } else {
            throw new VehicleNotFoundException('No se ha seleccionado un vehículo de tipo Bicicleta o Andando');
        }
    }


    async setDefaultPathwayType(pathwayType: PathwayTypes, userId: string) {
        await this.firebaseService.setDefaultPathwayType(pathwayType, userId);
    }

    async getDefaultPathwayType(userId: string): Promise<PathwayTypes> {
        let data: PathwayTypes = PathwayTypes.UNDEFINED;
        await this.firebaseService.getDefaultPathwayType(userId).then((value) => {
            data = value.pathwayType;
        });
        return data;
    }

    async calculatePrice(pathway: Pathway, vehicle: Vehicle): Promise<number> {
        if (vehicle.consumption === undefined) {
            throw new VehicleNotFoundException('El vehículo no existe');
        }
        if (pathway.distance === undefined) {
            throw new PathwayException(PathWayExceptionMessages.FarPathway);
        }
        const price = await this.priceService.getPrice(vehicle.propulsion);
        let priceConsumido = ((price * vehicle.consumption * pathway.distance) / 10000);
        return parseFloat(priceConsumido.toFixed(2));
    }
}

let _instance: PathwayController;
export function getPathwayController(openRouteService?: OpenRouteService, firebaseService?: FirebaseService, priceService?: PriceService): PathwayController {
    if (!_instance) {
        if (!openRouteService) openRouteService = new OpenRouteService();
        if (!firebaseService) firebaseService = new FirebaseService();
        if (!priceService) priceService = new PriceService();
        _instance = new PathwayController(openRouteService, firebaseService, priceService);
    }
    return _instance;
}
