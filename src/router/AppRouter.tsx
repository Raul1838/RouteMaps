import {Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "../Auth/pages/LoginPage.tsx";
import {RegisterPage} from "../Auth/pages/RegisterPage.tsx";

export const AppRouter = () => {
    return(
        <Routes>
            <Route path='/register' element={ <RegisterPage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/*' element={ <Navigate to='/login' /> } />
        </Routes>
    )
}
