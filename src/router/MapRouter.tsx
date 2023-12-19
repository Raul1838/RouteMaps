import { Navigate, Route, Routes } from "react-router-dom";
import { PreferencesPage } from "../auth/pages/PreferencesPage.tsx";
import { MapPage } from "../map/pages/MapPage.tsx";
import { PlacesRouter } from "../places/router/PlacesRouter.tsx";

export const MapRouter = () => {
    return (
        <Routes>
            <Route path='/account/preferences' element={<PreferencesPage />} />
            <Route path='/' element={<MapPage />} />
            <Route path='/places/*' element={<PlacesRouter />} />
            <Route path='/*' element={<Navigate to={'/'} />} />
        </Routes>
    )
}
