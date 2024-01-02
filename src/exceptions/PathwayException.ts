
export class PathwayException extends Error {

    constructor(pathWayExceptionMessages: PathWayExceptionMessages) {
        super(pathWayExceptionMessages);
    }

}

export enum PathWayExceptionMessages {
    FarPathway = 'Bad pathway: From and to too far away',
    OpenRouteApiNotResponding = 'Api offline: OpenRouteApi is not responding',
    AlreadyExists = 'The pathway already exists.',
    InvalidPathway = 'Bad pathway: The pathway does not have the correct attributes.',
    EmptyPathwayList = 'The pathway list is empty',
    PathwayNotFound = 'The pathway does not exists',
}
