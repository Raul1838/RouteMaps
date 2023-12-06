import {createContext, useState} from "react";
import {UserModel} from "../interfaces/UserModel.ts";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

export interface AuthContextInterface {
    user: UserModel,
    setUser(user: UserModel): void
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const Auth = () => {
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
            <AuthContext.Provider value={ value }>
                <Router>
                    <Routes>
                        <Route path="/" element={<></>} />
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </>
    );

}
