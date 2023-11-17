
export class AuthException extends Error {

    constructor( authExceptionMessage: AuthExceptionMessages ) {
        super(authExceptionMessage);
    }

}

export enum AuthExceptionMessages {
    InvalidRegister = 'Bad register: Invalid email or password format',
    InvalidLogin = 'Bad login: Invalid email or password'
}
