import {MainLayout} from "../../layouts/MainLayout.tsx";
import {PathwaysList} from "../components/PathwaysList.tsx";

export const PathwaysPage = () => {
    return (
        <MainLayout>
            <h1>Rutas guardadas</h1>
            <hr />
            <PathwaysList />
        </MainLayout>
    )
}
