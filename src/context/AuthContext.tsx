import { createContext, useState } from "react";
import { UserModel } from "../interfaces/UserModel.ts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage.tsx";

export interface AuthContextInterface {
    user: UserModel,
    setUser(user: UserModel): void
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

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
                {children}
            </AuthContext.Provider>
        </>
    );

}
