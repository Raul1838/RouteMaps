import {UserModel} from "../interfaces/UserModel.ts";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {FirebaseAuth} from "./config.ts";
import {AuthException, AuthExceptionMessages} from "../exceptions/AuthException.ts";

export class FirebaseService {

    async createUserWithEmailAndPassword(email: string, password: string, displayName: string): Promise<UserModel> {
        let resp;
        try {
            resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        } catch ( error ) {
            throw new AuthException(AuthExceptionMessages.InvalidRegister);
        }
        const { uid } = resp.user;
        if (FirebaseAuth.currentUser) {
            await updateProfile(FirebaseAuth.currentUser, {displayName});
        }
        return {
            uid,
            email,
            displayName
        }
    }

}
