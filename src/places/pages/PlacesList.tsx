import {useContext} from "react";
import {MainLayout} from "../../layouts/MainLayout.tsx";
import {Link} from "react-router-dom";
import {PlacesContext, PlacesContextInterface} from "../../context/PlacesContext.tsx";

export const PlacesList = () => {

    const { places }: PlacesContextInterface = useContext(PlacesContext);


    return (
        <MainLayout>
            <h1>Lugares guardados</h1>
            <hr />
            {
                places.length === 0
                ? <p>No hay lugares guardados</p>
                :   <>
                        <ul className="list-group">
                            {
                                places.map((place, index) => (
                                    <li className="list-group-item" key={index}>{place.Nombre}</li>
                                ))
                            }
                        </ul>
                    </>
            }
            <Link
                to={'/places/addPlaceByToponym'}
                className="btn btn-outline-primary mt-3"
            >Añadir lugar</Link>
        </MainLayout>
    );

}
