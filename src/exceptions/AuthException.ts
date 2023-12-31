
export class AuthException extends Error {

    constructor( authExceptionMessage: AuthExceptionMessages ) {
        super(authExceptionMessage);
    }

}

export enum AuthExceptionMessages {
    InvalidRegister = 'Bad register: Invalid email or password format',
    InvalidLogin = 'Bad login: Invalid email or password',
    InvalidLogout = 'Bad logout: There\'s no user to logout',
    InvalidDelete = 'Bad delete user: No recent logged user',
    InvalidUuid = 'Bad uuid: No user found with given uuid',
}
