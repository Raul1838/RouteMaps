import {UserModel} from "../interfaces/UserModel.ts";
import {FirebaseService} from "../firebase/FirebaseService.ts";

export class AuthController {
    constructor( private firebaseService: FirebaseService) { }

    async deleteUser() {
        return await this.firebaseService.startDeletingUser();
    }

    loginWithEmailAndPassword( email: string, password: string ): UserModel {
        throw new Error('Not implemented');
    }
}

let _instance: AuthController;
export function getAuthController(firebaseService?: FirebaseService): AuthController {
    if (!_instance) {
        _instance = new AuthController((!firebaseService ? new FirebaseService() : firebaseService));
    }
    return _instance;
}