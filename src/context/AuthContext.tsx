import {createContext, useState} from "react";
import {UserModel} from "../interfaces/UserModel.ts";

export interface AuthContextInterface {
    user: UserModel,
    setUser(user: UserModel): void,
    isLogged: boolean,
    setIsLogged(isLogged: boolean): void
}

export const AuthContext = createContext<AuthContextInterface>({
    user: {
        uid: "",
        email: "",
        displayName: ""
    },
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {}
});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<UserModel>({
        uid: "",
        email: "",
        displayName: ""
    });

    const [isLogged, setIsLogged] = useState<boolean>(false);

    const value: AuthContextInterface = {
        user,
        setUser,
        isLogged,
        setIsLogged
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                { children }
            </AuthContext.Provider>
        </>
    );

}
