import {UserModel} from "../interfaces/UserModel.ts";

export class AuthController {
    public registerUserWithEmailAndPassword( email: string, password: string, displayName: string ): UserModel {
        throw new Error('Not implemented');
    }

    public loginWithEmailAndPassword( email: string, password: string ): UserModel {
        throw new Error('Not implemented');
    }

}

let _instance: AuthController;
export function getAuthController(): AuthController {
    if (!_instance) {
        _instance = new AuthController();
    }
    return _instance;
}
