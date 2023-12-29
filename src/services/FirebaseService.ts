import {createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {FirebaseAuth} from "../firebase/config.ts";
import {UserModel} from "../interfaces/UserModel.ts";
import {AuthException, AuthExceptionMessages} from "../exceptions/AuthException.ts";
import {doc, getDoc, setDoc} from "firebase/firestore/lite";
import {Pathway} from "../interfaces/Pathway.ts";
import {arrayUnion} from "firebase/firestore";
import Combustible from "../enums/Combustible.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";

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
            await updateProfile(FirebaseAuth.currentUser, { displayName });
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

    async storeValue(path: string, value: any) {

    }

    async setDefaultVehicle(vehicleId: number, userId: string): Promise<void> {
        const docRef = doc(FirebaseDB, `${userId}`, 'defaultVehicle');
        await setDoc(docRef, { id: vehicleId });
    }

    async getDefaultVehicle(userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'defaultVehicle');
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists())
            throw new Error('No such document!');
        return docSnap.data();
    }

    async storePathway(pathway: Pathway, userId: string): Promise<void> {
        const docRef = doc(FirebaseDB, userId, 'pathways');
        await setDoc(docRef, { pathways: arrayUnion(pathway) }, { merge: true })
    }

    async getPathways(userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'pathways');
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists())
            throw new Error('No such document!');
        return docSnap.data();
    }

    async storeFuelPrice(fuel: Combustible, fuelPrice: number) {
        const docRef = doc(FirebaseDB, 'fuel', `${fuel}`);
        const updateData = {
            price: fuelPrice,
            date: new Date()
        };
        await setDoc(docRef, updateData, { merge: true });
    }

    async getFuelPriceAndDate(fuel: Combustible) {
        const docRef = doc(FirebaseDB, 'fuel', `${fuel}`);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists())
            throw new Error('No such document!');
        return docSnap.data();
    }

    async setDefaultPathwayType(pathwayType: PathwayTypes, userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'defaultPathwayType');
        await setDoc(docRef, { pathwayType: pathwayType });
    }

    async getDefaultPathwayType(userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'defaultPathwayType');
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists())
            throw new Error('No such document!');
        return docSnap.data();
    }
}
