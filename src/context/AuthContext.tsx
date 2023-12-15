import {createContext, useState} from "react";
import {UserModel} from "../interfaces/UserModel.ts";

export interface AuthContextInterface {
    user: UserModel,
    setUser(user: UserModel): void,
    isLogged: boolean,
    setIsLogged(isLogged: boolean): void,
    wantDetails: boolean,
    setWantDetails(wantDetails: boolean): void
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
    setWantDetails: () => {}
});

export const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState<UserModel>({
        uid: '',
        email: '',
        displayName: ''
    });

    const [isLogged, setIsLogged] = useState<boolean>(false);

    const [wantDetails, setWantDetails] = useState(false);

    const value: AuthContextInterface = {
        user,
        setUser,
        isLogged,
        setIsLogged,
        wantDetails,
        setWantDetails
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                { children }
            </AuthContext.Provider>
        </>
    );

}
