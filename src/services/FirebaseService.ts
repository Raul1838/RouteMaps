import {createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {FirebaseAuth, FirebaseDB} from "../firebase/config.ts";
import {UserModel} from "../interfaces/UserModel.ts";
import {AuthException, AuthExceptionMessages} from "../exceptions/AuthException.ts";
import {doc, getDoc, setDoc} from "firebase/firestore/lite";

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

    async startDeletingUser() {
        if (FirebaseAuth.currentUser) {
            await deleteUser(FirebaseAuth.currentUser).catch(() => {
                throw new AuthException(AuthExceptionMessages.InvalidDelete);
            });
        } else {
            throw new AuthException(AuthExceptionMessages.InvalidDelete);
        }
    }

    async storeValue(path: string, value : any) {
        
    }

    async setDefaultVehicle(vehicleId: string, userId: string): Promise<void> {
        const docRef = doc(FirebaseDB, `${userId}`, 'defaultVehicle');
        await setDoc(docRef, { vehiclePlate: vehicleId });
    }

    async getDefaultVehicle(userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'defaultVehicle');
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists())
            throw new Error('No such document!');
        return docSnap.data();
    }

}
