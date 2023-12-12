import {UserModel} from "../interfaces/UserModel.ts";
import {FirebaseService} from "../firebase/FirebaseService.ts";

export class AuthController {

    constructor( private firebaseService: FirebaseService ) { }

    public async registerUserWithEmailAndPassword(email: string, password: string, displayName: string): Promise<UserModel> {
        return await this.firebaseService.createUserWithEmailAndPassword(email, password, displayName);
    }

    async loginWithEmailAndPassword(email: string, password: string): Promise<UserModel> {
        return await this.firebaseService.startLoginWithEmailAndPassword(email, password);
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
