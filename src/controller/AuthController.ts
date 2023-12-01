import {UserModel} from "../interfaces/UserModel.ts";
import {FirebaseService} from "../firebase/firebaseService.ts";

export class AuthController {

    constructor( private firebaseService: FirebaseService ) { }

    async loginWithEmailAndPassword(email: string, password: string): Promise<UserModel> {
        return await this.firebaseService.startLoginWithEmailAndPassword(email, password);
    }

    async logout() {
        await this.firebaseService.startLogout();
    }
}

let _instance: AuthController;
export function getAuthController(firebaseService?: FirebaseService): AuthController {
    if (!_instance) {
        _instance = new AuthController((!firebaseService ? new FirebaseService() : firebaseService));
    }
    return _instance;
}
