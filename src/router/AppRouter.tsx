import {Route, Routes} from "react-router-dom";
import {DetailsPage} from "../auth/pages/DetailsPage.tsx";
import {PreferencesPage} from "../auth/pages/PreferencesPage.tsx";
import {MapPage} from "../map/pages/MapPage.tsx";


export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/account/details' element={ <DetailsPage /> } />
                <Route path='/account/preferences' element={ <PreferencesPage /> } />
                <Route path='/*' element={ <MapPage /> } />
            </Routes>
        </>
    )
}
