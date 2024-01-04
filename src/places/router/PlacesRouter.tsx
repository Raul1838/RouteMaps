import {Navigate, Route, Routes} from "react-router-dom"
import {PlacesPage} from "../pages/PlacesPage.tsx";
import {AddPlaceByPlaceName} from "../pages/AddPlaceByPlaceName.tsx";
import {EditPlacePage} from "../pages/EditPlacePage.tsx";
import {AddPlaceByCoords} from "../pages/AddPlaceByCoords.tsx";


export const PlacesRouter = () => {
    return (
        <Routes>
            <Route path='/addPlaceByToponym' element={ <AddPlaceByPlaceName /> } />
            <Route path='/addPlaceByCoords' element={ <AddPlaceByCoords /> } />
            <Route path='/getPlaces' element={ <PlacesPage /> } />
            <Route path='/editPlace/:placeName' element={ <EditPlacePage /> } />
            <Route path='/*' element={<Navigate to={'/places/getPlaces'} />} />
        </Routes>
    )
}
