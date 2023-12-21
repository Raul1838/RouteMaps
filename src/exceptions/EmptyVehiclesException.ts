export default class EmptyVehiclesException extends Error {
    constructor(message? : string) {
        super(message);
        this.name = 'EmptyVehiclesException';
      }
}