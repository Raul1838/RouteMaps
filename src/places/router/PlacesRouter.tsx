import {Navigate, Route, Routes} from "react-router-dom"
import AddPlaceByCoordsComponent from "../pages/AddPlaceByCoordsView"
import DeletePlacesView from "../pages/DeletePlaceView"
import PlacesViewModel from "../viewModel/PlacesViewModel"
import PlacesController from "../../controller/PlacesController"
import APIPlacesService from "../../api/APIPlacesService"
import {PlacesList} from "../pages/PlacesList.tsx";
import {AddPlaceByPlaceName} from "../pages/AddPlaceByPlaceName.tsx";


const aPIPlacesService = new APIPlacesService();
const placesController = new PlacesController(aPIPlacesService);
const placesViewModel = new PlacesViewModel(placesController);


export const PlacesRouter = () => {
    return (
        <Routes>
            <Route path='/addPlaceByToponym' element={ <AddPlaceByPlaceName /> } />
            <Route path='/addPlaceByCoords' element={<AddPlaceByCoordsComponent placesViewModel={placesViewModel}></AddPlaceByCoordsComponent>} />
            <Route path='/deletePlace' element={<DeletePlacesView placesViewModel={placesViewModel}></DeletePlacesView>} />
            <Route path='/getPlaces' element={ <PlacesList /> } />
            <Route path='/*' element={<Navigate to={'/places/getPlaces'} />} />
        </Routes>
    )
}
