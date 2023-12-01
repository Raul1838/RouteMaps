import {signInWithEmailAndPassword} from "firebase/auth";
import {FirebaseAuth} from "./config";
import {UserModel} from "../interfaces/UserModel.ts";
import {AuthException, AuthExceptionMessages} from "../exceptions/AuthException.ts";

export class FirebaseService {

    async startLoginWithEmailAndPassword(email: string, password: string): Promise<UserModel> {
        let resp;
        try {
            resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        } catch (error) {
            throw new AuthException(AuthExceptionMessages.InvalidLogin);
        }
        const { uid, displayName } = resp.user;
        return {
            uid,
            email,
            displayName: displayName || ''
        }
    }

    async startLogout(): Promise<void> {
        if( FirebaseAuth.currentUser === null ) {
            throw new AuthException(AuthExceptionMessages.InvalidLogout);
        }
        await FirebaseAuth.signOut().catch(() => {
            throw new AuthException(AuthExceptionMessages.InvalidLogout);
        });
    }

}
