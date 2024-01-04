import { Navigate, Route, Routes } from "react-router-dom"
import VehiclesController from '../../controller/VehiclesController'
import VehiclesViewModel from '../viewModel/VehiclesViewModel'
import AddVehicleView from '../pages/AddVehicleView'
import GetVehiclesView from '../pages/GetVehiclesView'
import ModifyVehicleView from "../pages/ModifyVehicleView"
import DeleteVehicleView from "../pages/DeleteVehicleView"
import { FirebaseService } from "../../services/FirebaseService"


const vehiclesController = new VehiclesController(new FirebaseService);
const vehiclesViewModel = new VehiclesViewModel(vehiclesController);

export const VehiclesRouter = () => {
    return (
        <Routes>
            <Route path='/addVehicle' element={<AddVehicleView></AddVehicleView>} />
            <Route path='/modifyVehicle/:plate' element={<ModifyVehicleView></ModifyVehicleView>} />
            <Route path='/deleteVehicle/:plate' element={<DeleteVehicleView vehiclesViewModel={vehiclesViewModel}></DeleteVehicleView>} />
            <Route path='/getVehicles' element={<GetVehiclesView></GetVehiclesView>} />
            <Route path='/*' element={<Navigate to={'/vehicles/getVehicles'} />} />
        </Routes>
    )
}