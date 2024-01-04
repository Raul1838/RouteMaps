import { Navigate, Route, Routes } from "react-router-dom";
import AddPathwayView from "../pages/AddPathwayView";


export const PathwayRouter = () => {
    return (
        <Routes>
            <Route path='/addRoute' element={ <AddPathwayView /> } />
            <Route path='/*' element={<Navigate to={'/pathway/getPathways'} />} />
        </Routes>
    )
}
