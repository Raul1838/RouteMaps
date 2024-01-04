
export class PlaceException extends Error {

    constructor(placeExceptionMessages: PlaceExceptionMessages) {
        super(placeExceptionMessages);
    }

}

export enum PlaceExceptionMessages {
    IllegalArgument = 'One of the params has an invalid type.',
    OpenRouteApiNotResponding = 'Api offline: OpenRouteApi is not responding',
    InvalidCoordinates = 'Bad coordinates: The coordinates are not correct.',
    InvalidToponym = 'Bad toponym: The toponym is not correct.',
    EmptyPlaces = 'The place list is empty.',
    PlaceNotFound = 'The place does not exists.',
}
