
export class AuthException extends Error {

    constructor( authExceptionMessages: AuthExceptionMessages ) {
        super(authExceptionMessages);
    }

}

export enum AuthExceptionMessages {
    InvalidRegister = 'Bad register: Invalid email or password format',
    InvalidLogin = 'Bad login: Invalid email or password',
    InvalidLogout = 'Bad logout: There\'s no user to logout'
}
