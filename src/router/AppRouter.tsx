import { Route, Routes } from "react-router-dom";
import { AuthContext, AuthContextInterface } from "../context/AuthContext.tsx";
import { useContext } from "react";
import { AuthRouter } from "../auth/router/AuthRouter.tsx";
import { MapRouter } from "./MapRouter.tsx";
import AddPlaceByCoordsComponent from "../places/pages/AddPlaceByCoordsView.tsx";
import PlacesViewModel from "../viewModel/PlacesViewModel.ts";
import PlacesController from "../controller/PlacesController.ts";
import APIPlacesService from "../api/APIPlacesService.ts";
import PlacesComponent from "../places/pages/GetPlacesView.tsx";
import GetPlacesView from "../places/pages/GetPlacesView.tsx";


export const AppRouter = () => {

    const { isLogged }: AuthContextInterface = useContext(AuthContext);


    return (
        <Routes>
            {
                isLogged
                    ? <Route path='/*' element={<MapRouter />} />
                    : <Route path='/*' element={<AuthRouter />} />
            }
        </Routes>
    )
}
