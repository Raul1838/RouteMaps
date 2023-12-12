import {createContext, useState} from "react";
import {UserModel} from "../interfaces/UserModel.ts";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

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
