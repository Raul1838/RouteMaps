import {Route, Routes} from "react-router-dom";
import {LoginPage} from "../auth/pages/LoginPage.tsx";
import {RegisterPage} from "../auth/pages/RegisterPage.tsx";
import {DetailsPage} from "../auth/pages/DetailsPage.tsx";
import {PreferencesPage} from "../auth/pages/PreferencesPage.tsx";
import {MapPage} from "../map/pages/MapPage.tsx";


export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/register' element={ <RegisterPage /> } />
                <Route path='/login' element={ <LoginPage /> } />
                <Route path='/account/details' element={ <DetailsPage /> } />
                <Route path='/account/preferences' element={ <PreferencesPage /> } />
                <Route path='/*' element={ <MapPage /> } />
            </Routes>
        </>
    )
}
