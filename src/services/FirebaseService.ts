import {createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {FirebaseAuth, FirebaseDB} from "../firebase/config.ts";
import {UserModel} from "../interfaces/UserModel.ts";
import {AuthException, AuthExceptionMessages} from "../exceptions/AuthException.ts";
import {doc, getDoc, setDoc} from "firebase/firestore/lite";
import {Pathway} from "../interfaces/Pathway.ts";
import Combustible from "../enums/Combustible.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";
import Vehicle from "../interfaces/Vehicle.ts";
import Place from "../interfaces/Place.ts";

export class FirebaseService {

    async createUserWithEmailAndPassword(email: string, password: string, displayName: string): Promise<UserModel> {
        let resp;
        try {
            resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        } catch (error) {
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
        if (FirebaseAuth.currentUser === null) {
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

    async setDefaultVehicle(vehiclePlate: string, userId: string): Promise<void> {
        const docRef = doc(FirebaseDB, `${userId}`, 'defaultVehicle');
        await setDoc(docRef, { id: vehiclePlate });
    }

    async getDefaultVehicle(userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'defaultVehicle');
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists())
            throw new Error('No such document!');
        return docSnap.data();
    }


    async storePlace(place: Place, userId: string): Promise<Place[]> {
        const docRef = doc(FirebaseDB, userId, 'places');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            userData.places.push(place);
            await setDoc(docRef, userData);
            return userData.places;
        } else {
            await setDoc(docRef, { places: [place] });
            return [place];
        }
    }

    async getPlaces(userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'places');
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            // Crea el documento si no existe
            await setDoc(docRef, { places: [] });
            return { places: [] };
        }

        return docSnap.data();
    }

    async storeVehicle(vehicle: Vehicle, userId: string): Promise<void> {
        const _ = require('lodash');
        const docRef = doc(FirebaseDB, userId, 'vehicles'); 
        const vehicleData = await this.getVehicles(userId);
        const currentVehicles: Vehicle[] = vehicleData.vehicles || [];
        const isDuplicate = currentVehicles.some(element =>
            vehicle.plate === element.plate &&
            vehicle.name === element.name &&
            vehicle.propulsion === element.propulsion &&
            vehicle.consumption === element.consumption
        );

        if (!isDuplicate) {
            currentVehicles.push(vehicle);
            await setDoc(docRef, { vehicles: currentVehicles }, { merge: true });
        }
    }

    async getVehicles(userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'vehicles');
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            // Crea el documento si no existe
            await setDoc(docRef, { vehicles: [] });
            return { vehicles: [] };
        }

        return docSnap.data();
    }

    async storePathway(pathway: Pathway, userId: string): Promise<void> {
        const _ = require('lodash');
        const docRef = doc(FirebaseDB, userId, 'pathways');
        const pathwayData = await this.getPathways(userId);
        const currentPathways: Pathway[] = pathwayData.pathways || [];
        const isDuplicate = currentPathways.some(element => (_.isEqual(pathway.start, element.start) && _.isEqual(pathway.end, element.end) && pathway.type === element.type && pathway.vehicle === element.vehicle));

        if (!isDuplicate) {
            currentPathways.push(pathway);
            await setDoc(docRef, { pathways: currentPathways }, { merge: true });
        }
    }

    async getPathways(userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'pathways');
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            // Crea el documento si no existe
            await setDoc(docRef, { pathways: [] });
            return { pathways: [] };
        }

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
