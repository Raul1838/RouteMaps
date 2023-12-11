import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "../auth/pages/LoginPage.tsx";
import {RegisterPage} from "../auth/pages/RegisterPage.tsx";

export const AppRouter = () => {
    return(
        <Routes>
            <Route path='/register' element={ <RegisterPage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/*' element={ <Navigate to='/login' /> } />
        </Routes>
    )
}
