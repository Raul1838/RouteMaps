import {openRouteApi} from "../api/openRouteApi.ts";
import {getEnvVariables} from "../helpers/getEnvVariables.ts";
import {Coords} from "../interfaces/Coords.ts";
import {Pathway} from "../interfaces/Pathway.ts";
import {PathwayException, PathWayExceptionMessages} from "../exceptions/PathwayException.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";
import {PathwayTransportMeans} from "../enums/PathwayTransportMeans.ts";
import {OpenRoutePostResponse} from "../interfaces/OpenRoutePostResponse.ts";

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

    async calculatePathway( from: Coords, to: Coords, pathwayTransportMean: PathwayTransportMeans = PathwayTransportMeans.VEHICLE, pathwayType: PathwayTypes = PathwayTypes.RECOMMENDED ): Promise<Pathway> {
        const { data } = await openRouteApi.post<OpenRoutePostResponse>(`/v2/directions/${ pathwayTransportMean }`, {
            coordinates: [
                [from.lon, from.lat],
                [to.lon, to.lat],
            ],
            preference: pathwayType,
        }, {
            headers: {
                'Authorization': VITE_ROUTES_API_KEY,
                'Content-Type': 'application/json',
            }
        }).catch( e => {
            if( e.response.status === 400 ) throw new PathwayException(PathWayExceptionMessages.InvalidPathway);
            throw new PathwayException(PathWayExceptionMessages.OpenRouteApiNotResponding);
        });
        const { routes } = data;
        return {
            type: PathwayTypes.RECOMMENDED,
            start: from,
            end: to,
            codifiedPath: routes[0].geometry,
            distance: routes[0].summary.distance,
            duration: routes[0].summary.duration,
            favourite: false,
            transportMean: pathwayTransportMean,
        };
    }

}
