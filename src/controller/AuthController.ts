import {UserModel} from "../interfaces/UserModel.ts";

export class AuthController {
    private static _authController: AuthController | undefined;

    private constructor() { }

    public static get authController(): AuthController {
        if (!this._authController) {
            this._authController = new AuthController();
        }
        return this._authController;
    }


    public deleteUser() {
        throw new Error('Not implemented');
    }

    loginWithEmailAndPassword( email: string, password: string ): UserModel {
        throw new Error('Not implemented');
    }
}
