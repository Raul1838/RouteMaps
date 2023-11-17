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

    public registerUserWithEmailAndPassword({ email, password, displayName }): UserModel {
        return {
            uid: '',
            email: '',
            displayName: ''
        }
    }

    public loginWithEmailAndPassword({ email, password }): UserModel {
        return {
            uid: '',
            email: '',
            displayName: ''
        }
    }

}
