import { Navigate, Route, Routes } from "react-router-dom";
import { ListPathwaysView } from "../pages/ListPathwaysView";


export const PathwayRouter = () => {
    return (
        <Routes>
            <Route path='/getPathways' element={<ListPathwaysView/>} />
            <Route path='/*' element={<Navigate to={'/pathway/getPathways'} />} />
        </Routes>
    )
}