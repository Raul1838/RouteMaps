export default class APINotAvailableExeption extends Error {
    constructor(message? : string) {
        super(message);
        this.name = 'MyError';
      }
}