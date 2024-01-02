import {Navigate, Route, Routes} from "react-router-dom"
import {PlacesList} from "../pages/PlacesList.tsx";
import {AddPlaceByPlaceName} from "../pages/AddPlaceByPlaceName.tsx";


export const PlacesRouter = () => {
    return (
        <Routes>
            <Route path='/addPlaceByToponym' element={ <AddPlaceByPlaceName /> } />
            <Route path='/addPlaceByCoords' element={<h1>Añadir por coordenadas</h1>} />
            <Route path='/deletePlace' element={<h1>Delete</h1>} />
            <Route path='/getPlaces' element={ <PlacesList /> } />
            <Route path='/*' element={<Navigate to={'/places/getPlaces'} />} />
        </Routes>
    )
}
