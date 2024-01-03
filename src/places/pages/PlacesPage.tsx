import {MainLayout} from "../../layouts/MainLayout.tsx";
import {Link} from "react-router-dom";
import {PlacesList} from "../components/PlacesList.tsx";

export const PlacesPage = () => {

    return (
        <MainLayout>
            <h1>Lugares guardados</h1>
            <hr />
            <PlacesList />
            <Link
                to={'/places/addPlaceByToponym'}
                className="btn btn-outline-primary mt-3"
            >Añadir lugar</Link>
        </MainLayout>
    );

}
