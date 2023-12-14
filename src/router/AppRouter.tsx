import {Route, Routes} from "react-router-dom";
import {AuthContext, AuthContextInterface} from "../context/AuthContext.tsx";
import {useContext} from "react";
import {AuthRouter} from "../auth/router/AuthRouter.tsx";
import {MapRouter} from "./MapRouter.tsx";


export const AppRouter = () => {

    const { isLogged }: AuthContextInterface = useContext(AuthContext);

    return (
        <Routes>
            {
                isLogged
                    ? <Route path='/*' element={ <MapRouter /> } />
                    : <Route path='/*' element={ <AuthRouter /> } />
            }
        </Routes>
    )
}
