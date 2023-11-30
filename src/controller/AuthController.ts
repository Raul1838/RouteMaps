import {UserModel} from "../interfaces/UserModel.ts";
import {FirebaseService} from "../firebase/firebaseService.ts";

export class AuthController {

    constructor( private firebaseService: FirebaseService ) { }

    public async registerUserWithEmailAndPassword(email: string, password: string, displayName: string): Promise<UserModel> {
        return await this.firebaseService.createUserWithEmailAndPassword(email, password, displayName);
    }

}

let _instance: AuthController;
export function getAuthController(): AuthController {
    if(!_instance) {
       _instance = new AuthController( new FirebaseService() );
    }
    return _instance;
}
