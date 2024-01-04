import {UserModel} from "../interfaces/UserModel.ts";
import {FirebaseService} from "../services/FirebaseService.ts";
import {AuthException, AuthExceptionMessages} from "../exceptions/AuthException.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";

export class AuthController {

    constructor( private firebaseService: FirebaseService ) { }

    async registerUserWithEmailAndPassword(email: string, password: string, displayName: string): Promise<UserModel> {
        if (email.includes('@') && password.length > 5) {
            const user: UserModel = await this.firebaseService.createUserWithEmailAndPassword(email, password, displayName);
            await this.firebaseService.setDefaultPathwayType(PathwayTypes.RECOMMENDED, user.uid);
            localStorage.setItem('uuid', user.uid);
            localStorage.setItem('displayName', user.displayName);
            localStorage.setItem('email', user.email);
            return user;
        } else {
            throw new AuthException(AuthExceptionMessages.InvalidRegister);
        }
    }

    async loginWithEmailAndPassword(email: string, password: string): Promise<UserModel> {
        if (email.includes('@') && password.length > 5) {
            const user = await this.firebaseService.startLoginWithEmailAndPassword(email, password);
            localStorage.setItem('uuid', user.uid);
            localStorage.setItem('displayName', user.displayName);
            localStorage.setItem('email', user.email);
            return user;
        } else {
            throw new AuthException(AuthExceptionMessages.InvalidLogin);
        }
    }

    async logout() {
        await this.firebaseService.startLogout();
        localStorage.clear();
    }

    async deleteUser() {
        await this.firebaseService.startDeletingUser();
        localStorage.clear();
    }

}

let _instance: AuthController;
export function getAuthController(firebaseService?: FirebaseService): AuthController {
    if (!_instance) {
        _instance = new AuthController((!firebaseService ? new FirebaseService() : firebaseService));
    }
    return _instance;
}
