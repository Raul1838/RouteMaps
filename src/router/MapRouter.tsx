import {Navigate, Route, Routes} from "react-router-dom";
import {PreferencesPage} from "../auth/pages/PreferencesPage.tsx";
import {MapPage} from "../map/pages/MapPage.tsx";

export const MapRouter = () => {
    return (
        <Routes>
            <Route path='/account/preferences' element={ <PreferencesPage /> } />
            <Route path='/main' element={ <MapPage /> } />
            <Route path='/*' element={ <Navigate to={ '/main' } /> } />
        </Routes>
    )
}
