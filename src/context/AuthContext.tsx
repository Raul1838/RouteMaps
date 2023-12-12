import {createContext, useState} from "react";
import {UserModel} from "../interfaces/UserModel.ts";

export interface AuthContextInterface {
    user: UserModel,
    setUser(user: UserModel): void
}

export const AuthContext = createContext<AuthContextInterface>({
    user: {
        uid: "",
        email: "",
        displayName: ""
    },
    setUser: () => {}
});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<UserModel>({
        uid: "",
        email: "",
        displayName: ""
    });

    const value: AuthContextInterface = {
        user,
        setUser
    }

    return (
        <>
            <AuthContext.Provider value={value}>
                { children }
            </AuthContext.Provider>
        </>
    );

}
