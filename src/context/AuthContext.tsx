import {createContext, useState} from "react";
import {UserModel} from "../interfaces/UserModel.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";

export interface AuthContextInterface {
    user: UserModel,
    setUser(user: UserModel): void,
    isLogged: boolean,
    setIsLogged(isLogged: boolean): void,
    wantDetails: boolean,
    setWantDetails(wantDetails: boolean): void
    defaultVehiclePlate: string,
    setDefaultVehiclePlate(defaultVehicleId: string): void,
    defaultPathwayType: PathwayTypes
    setDefaultPathwayType(defaultPathwayType: PathwayTypes): void,
    wantPreferences: boolean,
    setWantPreferences(wantPreferences: boolean): void
}

export const AuthContext = createContext<AuthContextInterface>({
    user: {
        uid: '',
        email: '',
        displayName: ''
    },
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    wantDetails: false,
    setWantDetails: () => {},
    defaultVehiclePlate: '',
    setDefaultVehiclePlate: () => {},
    defaultPathwayType: PathwayTypes.RECOMMENDED,
    setDefaultPathwayType: () => {},
    wantPreferences: false,
    setWantPreferences: () => {},
});

export const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState<UserModel>({
        uid: '',
        email: '',
        displayName: ''
    });

    const [isLogged, setIsLogged] = useState<boolean>(false);

    const [wantDetails, setWantDetails] = useState<boolean>(false);

    const [defaultVehiclePlate, setDefaultVehiclePlate] = useState<string>('');

    const [defaultPathwayType, setDefaultPathwayType] = useState<PathwayTypes>(PathwayTypes.RECOMMENDED);

    const [wantPreferences, setWantPreferences] = useState<boolean>(false);

    const value: AuthContextInterface = {
        user,
        setUser,
        isLogged,
        setIsLogged,
        wantDetails,
        setWantDetails,
        defaultVehiclePlate,
        setDefaultVehiclePlate,
        defaultPathwayType,
        setDefaultPathwayType,
        wantPreferences,
        setWantPreferences
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                { children }
            </AuthContext.Provider>
        </>
    );

}
