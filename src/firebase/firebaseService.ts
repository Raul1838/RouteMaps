import {FirebaseAuth} from "./config.ts";
import {AuthException, AuthExceptionMessages} from "../exceptions/AuthException.ts";

export class FirebaseService {

    async startLogout(): Promise<void> {
        try {
            await FirebaseAuth.signOut();
        } catch (error) {
            throw new AuthException(AuthExceptionMessages.InvalidLogout);
        }
    }

}
