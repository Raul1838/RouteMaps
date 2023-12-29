import { Navigate, Route, Routes } from "react-router-dom"
import AddPlaceByCoordsComponent from "../pages/AddPlaceByCoordsView"
import GetPlacesView from "../pages/GetPlacesView"
import PlacesViewModel from "../viewModel/PlacesViewModel"
import PlacesController from "../../controller/PlacesController"
import APIPlacesService from "../../api/APIPlacesService"



const aPIPlacesService = new APIPlacesService();
const placesController = new PlacesController(aPIPlacesService);
const placesViewModel = new PlacesViewModel(placesController);


export const PlacesRouter = () => {
    return (
        <Routes>
            <Route path='/getPlacesByToponym' element={<AddPlaceByCoordsComponent placesViewModel={placesViewModel}></AddPlaceByCoordsComponent>} />
            <Route path='/getPlaces' element={<GetPlacesView placesViewModel={placesViewModel}></GetPlacesView>} />
            <Route path='/*' element={<Navigate to={'/getPlacesByToponym'} />} />
        </Routes>
    )
}
