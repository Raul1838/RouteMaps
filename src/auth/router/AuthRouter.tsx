import {Navigate, Route, Routes} from "react-router-dom";
import {RegisterPage} from "../pages/RegisterPage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";

export const AuthRouter = () => {
    return (
        <Routes>
            <Route path='/register' element={ <RegisterPage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/*' element={ <Navigate to={ '/login' } /> } />
        </Routes>
    )
}
