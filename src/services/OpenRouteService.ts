import {openRouteApi} from "../api/openRouteApi.ts";
import {getEnvVariables} from "../helpers/getEnvVariables.ts";
import {Coords} from "../interfaces/Coords.ts";
import {Pathway} from "../interfaces/Pathway.ts";
import {PathwayException, PathWayExceptionMessages} from "../exceptions/PathwayException.ts";
import {OpenRoutingPathway} from "../interfaces/OpenRoutingPathway.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";
import {PathwayTransportMeans} from "../enums/PathwayTransportMeans.ts";

const { VITE_ROUTES_API_KEY } = getEnvVariables();

export class OpenRouteService {

    async getCoordinatesFromPlaceName( placeName: string ): Promise<Coords> {
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

    async calculatePathway( from: Coords, to: Coords, pathwayTransportMean: PathwayTransportMeans, pathwayType: PathwayTypes = PathwayTypes.RECOMMENDED ): Promise<Pathway> {
        const { data } = await openRouteApi.post<OpenRoutingPathway>(`/v2/directions/${ pathwayTransportMean }`, {
            api_key: VITE_ROUTES_API_KEY,
            start: `${from.lon},${from.lat}`,
            end: `${to.lon},${to.lat}`,
            profile: pathwayType,
        }).catch( e => {
            if( e.response.status === 400 ) throw new PathwayException(PathWayExceptionMessages.InvalidPathway);
            throw new PathwayException(PathWayExceptionMessages.OpenRouteApiNotResponding);
        });
        return {
            type: PathwayTypes.RECOMMENDED,
            start: from,
            end: to,
            path: data,
            distance: data.features[0].properties.segments[0].distance,
            duration: data.features[0].properties.segments[0].duration,
            favourite: false,
            transportMean: pathwayTransportMean,
        };
    }

}
