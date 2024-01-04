import {Navigate, Route, Routes} from "react-router-dom";
import {PathwaysPage} from "../pages/PathwaysPage.tsx";

export const PathwaysRouter = () => {
    return (
        <Routes>
            <Route path='/list' element={ <PathwaysPage /> } />
            // Ruta parar redireccionar a la pagina PathwaysPage
            <Route path='/*' element={<Navigate to={'/pathways/list'} />} />
        </Routes>
    )
}
