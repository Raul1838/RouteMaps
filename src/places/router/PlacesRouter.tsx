import {Navigate, Route, Routes} from "react-router-dom"
import {PlacesList} from "../pages/PlacesList.tsx";
import {AddPlaceByPlaceName} from "../pages/AddPlaceByPlaceName.tsx";
import {EditPlacePage} from "../pages/EditPlacePage.tsx";


export const PlacesRouter = () => {
    return (
        <Routes>
            <Route path='/addPlaceByToponym' element={ <AddPlaceByPlaceName /> } />
            <Route path='/addPlaceByCoords' element={<h1>Añadir por coordenadas</h1>} />
            <Route path='/getPlaces' element={ <PlacesList /> } />
            <Route path='/editPlace/:placeName' element={ <EditPlacePage /> } />
            <Route path='/*' element={<Navigate to={'/places/getPlaces'} />} />
        </Routes>
    )
}
