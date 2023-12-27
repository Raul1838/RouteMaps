import {UserModel} from "../interfaces/UserModel.ts";
import {FirebaseService} from "../services/FirebaseService.ts";
import {AuthException, AuthExceptionMessages} from "../exceptions/AuthException.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";

export class AuthController {

    constructor( private firebaseService: FirebaseService ) { }

    public async registerUserWithEmailAndPassword(email: string, password: string, displayName: string): Promise<UserModel> {
        if (email.includes('@') && password.length > 5) {
            const user: UserModel = await this.firebaseService.createUserWithEmailAndPassword(email, password, displayName);
            this.firebaseService.setDefaultPathwayType(PathwayTypes.RECOMMENDED, user.uid);
            return user;
        } else {
            throw new AuthException(AuthExceptionMessages.InvalidRegister);
        }
    }

    async loginWithEmailAndPassword(email: string, password: string): Promise<UserModel> {
        if (email.includes('@') && password.length > 5) {
            return await this.firebaseService.startLoginWithEmailAndPassword(email, password);
        } else {
            throw new AuthException(AuthExceptionMessages.InvalidLogin);
        }
    }

    async logout() {
        await this.firebaseService.startLogout();
    }

    async deleteUser() {
        return await this.firebaseService.startDeletingUser();
    }

}

let _instance: AuthController;
export function getAuthController(firebaseService?: FirebaseService): AuthController {
    if (!_instance) {
        _instance = new AuthController((!firebaseService ? new FirebaseService() : firebaseService));
    }
    return _instance;
}
