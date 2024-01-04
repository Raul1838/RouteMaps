import { Navigate, Route, Routes } from "react-router-dom"
import AddVehicleView from '../pages/AddVehicleView'
import GetVehiclesView from '../pages/GetVehiclesView'
import ModifyVehicleView from "../pages/ModifyVehicleView"



export const VehiclesRouter = () => {
    return (
        <Routes>
            <Route path='/addVehicle' element={<AddVehicleView></AddVehicleView>} />
            <Route path='/modifyVehicle/:plate' element={<ModifyVehicleView></ModifyVehicleView>} />
            <Route path='/getVehicles' element={<GetVehiclesView></GetVehiclesView>} />
            <Route path='/*' element={<Navigate to={'/vehicles/getVehicles'} />} />
        </Routes>
    )
}