import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "../firebase/config.ts";
import { UserModel } from "../interfaces/UserModel.ts";
import { AuthException, AuthExceptionMessages } from "../exceptions/AuthException.ts";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import { Pathway } from "../interfaces/Pathway.ts";
import Combustible from "../enums/Combustible.ts";
import { PathwayTypes } from "../enums/PathwayTypes.ts";
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
        const placeData = await this.getPlaces(userId);
        const currentPlaces: Place[] = placeData.places || [];
        const existingPlaceIndex = currentPlaces.findIndex(element =>
            (place.Nombre === element.Nombre) || (place.Latitud === element.Latitud && place.Longitud === element.Longitud)
        );

        if (existingPlaceIndex !== -1) {
            // Update the existing pathway
            currentPlaces[existingPlaceIndex] = place;
        } else {
            // Add the new pathway if not a duplicate
            currentPlaces.push(place);
        }
        await setDoc(docRef, { places: currentPlaces }, { merge: true });
        return currentPlaces;

    }

    async deletePlace(place: Place, userId: string) {
        const docRef = doc(FirebaseDB, userId, 'pathways');
        const placeData = await this.getPlaces(userId);
        var currentPlaces: Pathway[] = placeData.pathways || [];
        const existingPlaceIndex = currentPlaces.findIndex(element =>
        (place.Nombre === place.Nombre &&
            place.Latitud === place.Latitud &&
            place.Longitud === place.Longitud));
        if (existingPlaceIndex !== -1) {
            currentPlaces = currentPlaces.splice(existingPlaceIndex, 1);
        }

        await setDoc(docRef, { places: currentPlaces }, { merge: true });
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

    async setPlaces(newPlaces: Place[], userId: string) {
        const docRef = doc(FirebaseDB, `${userId}`, 'places');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const currentPlaces: Place[] = docSnap.data().places;

            const modifiedPlaces: Place[] = currentPlaces.map(currentPlace => {
                const modifiedPlace = newPlaces.find(place => place.Nombre === currentPlace.Nombre);
                if (modifiedPlace) {
                    return { ...currentPlace, Favorito: modifiedPlace.Favorito};
                } else {
                    return currentPlace;
                }
            });
            await updateDoc(docRef, { places: modifiedPlaces });
        } else {
            await setDoc(docRef, { places: newPlaces }, { merge: true });
        }
    }


    async storeVehicle(vehicle: Vehicle, userId: string): Promise<void> {
        const _ = require('lodash');
        const docRef = doc(FirebaseDB, userId, 'vehicles');
        const vehicleData = await this.getVehicles(userId);
        const currentVehicles: Vehicle[] = vehicleData.vehicles || [];
        const currentVehiclesIndex = currentVehicles.findIndex(element =>
            vehicle.plate === element.plate &&
            vehicle.name === element.name &&
            vehicle.propulsion === element.propulsion &&
            vehicle.consumption === element.consumption
        );

        if (currentVehiclesIndex !== -1) {
            // Update the existing pathway
            currentVehicles[currentVehiclesIndex] = vehicle;
        } else {
            // Add the new pathway if not a duplicate
            currentVehicles.push(vehicle);
        }

        // Save the updated pathways to Firestore
        await setDoc(docRef, { vehicles: currentVehicles }, { merge: true });
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

    async deleteVehicle(vehicle: Vehicle, userId: string) {

        const _ = require('lodash');
        const docRef = doc(FirebaseDB, userId, 'vehicles');
        const vehicleData = await this.getVehicles(userId);
        var currentVehicles: Vehicle[] = vehicleData.vehicles || [];
        const existingVehicleIndex = currentVehicles.findIndex(element =>
            element.plate === vehicle.plate
        );

        if (existingVehicleIndex !== -1) {
            currentVehicles = currentVehicles.splice(existingVehicleIndex, 1);
        }

        await setDoc(docRef, { vehicles: currentVehicles }, { merge: true });

    }

    async storePathway(pathway: Pathway, userId: string): Promise<void> {
        const _ = require('lodash');
        const docRef = doc(FirebaseDB, userId, 'pathways');
        const pathwayData = await this.getPathways(userId);
        const currentPathways: Pathway[] = pathwayData.pathways || [];
        const existingPathwayIndex = currentPathways.findIndex(element =>
            _.isEqual(pathway.start, element.start) &&
            _.isEqual(pathway.end, element.end) &&
            pathway.type === element.type &&
            pathway.vehicle === element.vehicle
        );

        if (existingPathwayIndex !== -1) {
            // Update the existing pathway
            currentPathways[existingPathwayIndex] = pathway;
        } else {
            // Add the new pathway if not a duplicate
            currentPathways.push(pathway);
        }

        // Save the updated pathways to Firestore
        await setDoc(docRef, { pathways: currentPathways }, { merge: true });

    }

    async deletePathway(paramPathway: Pathway, userId: string) {
        const _ = require('lodash');
        const docRef = doc(FirebaseDB, userId, 'pathways');
        const pathwayData = await this.getPathways(userId);
        var currentPathways: Pathway[] = pathwayData.pathways || [];
        const existingPathwayIndex = currentPathways.findIndex(element =>
            _.isEqual(paramPathway.start, element.start) &&
            _.isEqual(paramPathway.end, element.end) &&
            paramPathway.type === element.type &&
            paramPathway.vehicle === element.vehicle
        );
        if (existingPathwayIndex !== -1) {
            currentPathways = currentPathways.splice(existingPathwayIndex, 1);
        }

        await setDoc(docRef, { pathways: currentPathways }, { merge: true });
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
