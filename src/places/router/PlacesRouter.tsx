import { Navigate, Route, Routes } from "react-router-dom"
import AddPlaceByCoordsComponent from "../pages/AddPlaceByCoordsView"
import AddPlaceByToponymComponent from "../pages/AddPlaceByToponymView"
import GetPlacesView from "../pages/GetPlacesView"
import DeletePlacesView from "../pages/DeletePlaceView"
import PlacesViewModel from "../viewModel/PlacesViewModel"
import PlacesController from "../../controller/PlacesController"
import APIPlacesService from "../../api/APIPlacesService"



const aPIPlacesService = new APIPlacesService();
const placesController = new PlacesController(aPIPlacesService);
const placesViewModel = new PlacesViewModel(placesController);


export const PlacesRouter = () => {
    return (
        <Routes>
            <Route path='/addPlaceByToponym' element={<AddPlaceByToponymComponent placesViewModel={placesViewModel}></AddPlaceByToponymComponent>} />
            <Route path='/addPlaceByCoords' element={<AddPlaceByCoordsComponent placesViewModel={placesViewModel}></AddPlaceByCoordsComponent>} />
            <Route path='/deletePlace' element={<DeletePlacesView placesViewModel={placesViewModel}></DeletePlacesView>} />
            <Route path='/getPlaces' element={<GetPlacesView placesViewModel={placesViewModel}></GetPlacesView>} />
            <Route path='/*' element={<Navigate to={'/places/getPlaces'} />} />
        </Routes>
    )
}
