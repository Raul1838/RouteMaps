import { openRouteApi } from "../api/openRouteApi.ts";
import { getEnvVariables } from "../helpers/getEnvVariables.ts";
import { Coords } from "../interfaces/Coords.ts";
import { OpenRoutingPathway } from "../interfaces/OpenRoutingPathway.ts";
import { Pathway } from "../interfaces/Pathway.ts";
import { PathwayException, PathWayExceptionMessages } from "../exceptions/PathwayException.ts";
import { PathwayTypes } from "../enums/PathwayTypes.ts";
import { PathwayTransportMeans } from "../enums/PathwayTransportMeans.ts";
import { AxiosRequestConfig } from "axios";
import { OpenRoutingPostCall } from "../interfaces/OpenRoutingPostCall.ts";

const { VITE_ROUTES_API_KEY } = getEnvVariables();

export class OpenRouteService {

    async getCoordinatesFromPlaceName(placeName: string): Promise<Coords> {
        const { data } = await openRouteApi.get('/geocode/search', {
            params: {
                api_key: VITE_ROUTES_API_KEY,
                text: placeName,
            }
        });
        return {
            name: placeName,
            lat: data.features[0].geometry.coordinates[1],
            lon: data.features[0].geometry.coordinates[0]
        }
    }

    async calculatePathway(from: Coords, to: Coords, pathwayTransportMean?: PathwayTransportMeans, pathwayType?: PathwayTypes): Promise<Pathway> {

        if (pathwayType === undefined) {
            pathwayType = PathwayTypes.RECOMMENDED;
        }
        if (pathwayTransportMean === undefined) {
            pathwayTransportMean = PathwayTransportMeans.VEHICLE;
        }


        const { data }: { data: OpenRoutingPostCall } = await openRouteApi.post<OpenRoutingPostCall>(`/v2/directions/${pathwayTransportMean}`, {
            "coordinates": [[from.lon, from.lat], [to.lon, to.lat]],
            "preference": `${pathwayType}`
        },
            {
                headers: {
                    'Authorization': VITE_ROUTES_API_KEY,
                    'Content-Type': 'application/json'
                },
                maxBodyLength: Infinity
            }).catch(e => {
                if (e.response?.status! === 400) throw new PathwayException(PathWayExceptionMessages.FarPathway);
                throw new PathwayException(PathWayExceptionMessages.OpenRouteApiNotResponding);
            });


        const pathway: Pathway = {
            distance: data.routes[0].summary.distance,
            duration: data.routes[0].summary.duration,
            end: to,
            start: from,
            favourite: false,
            path: data,
            type: pathwayType,
            transportMean: pathwayTransportMean
        }

        return pathway;
    }

}
