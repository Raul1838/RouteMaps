import {deleteUser} from "firebase/auth";
import {FirebaseAuth} from "./config.ts";
import {AuthException, AuthExceptionMessages} from "../exceptions/AuthException.ts";

export class FirebaseService {
    async startDeletingUser() {
        if (FirebaseAuth.currentUser) {
            await deleteUser(FirebaseAuth.currentUser).catch(() => {
                throw new AuthException(AuthExceptionMessages.InvalidDelete);
            });
        }
    }
}
