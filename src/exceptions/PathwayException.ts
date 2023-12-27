
export class PathwayException extends Error {

    constructor( pathWayExceptionMessages: PathWayExceptionMessages ) {
        super(pathWayExceptionMessages);
    }

}

export enum PathWayExceptionMessages {
    InvalidPathway = 'Bad pathway: From and to too far away',
    OpenRouteApiNotResponding = 'Api offline: OpenRouteApi is not responding',
}
