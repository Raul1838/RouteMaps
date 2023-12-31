import {openRouteApi} from "../api/openRouteApi.ts";
import {getEnvVariables} from "../helpers/getEnvVariables.ts";
import {Coords} from "../interfaces/Coords.ts";
import {OpenRoutingPathway} from "../interfaces/OpenRoutingPathway.ts";
import {Pathway} from "../interfaces/Pathway.ts";
import {PathwayException, PathWayExceptionMessages} from "../exceptions/PathwayException.ts";

const { VITE_PRICES_API_KEY } = getEnvVariables();

export class CombustiblePriceService {

}