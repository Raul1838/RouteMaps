import {getPlacesController, PlacesController} from "../../controller/PlacesController.ts";
import React, {useContext, useState} from "react";
import {MainLayout} from "../../layouts/MainLayout.tsx";
import {Link} from "react-router-dom";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {PlacesContext, PlacesContextInterface} from "../../context/PlacesContext.tsx";

export const AddPlaceByPlaceName = () => {

    const { user }: AuthContextInterface = useContext(AuthContext);
    const placesContext: PlacesContextInterface = useContext(PlacesContext);

    const placeController: PlacesController = getPlacesController();

    const [placeName, setPlaceName] = useState<string>('');

    const handlePlaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaceName(event.target.value);
    }

    const handleAddPlaceByPlaceName = () => {
        try {
            placeController.addPlaceByToponym(placeName, user.uid).then(places => {
                placesContext.setPlaces([...places]);
            });
        } catch (e) {
            console.log('Error al añadir el lugar');
        }
    }

    return (
        <MainLayout>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Añadir lugar usando topónimo</h1>
                <Link
                    to={'/places/addPlaceByCoords'}
                    className="btn btn-outline-info"
                >
                    <i className={'fas fa-exchange-alt'}></i>
                </Link>
            </div>
            <hr/>
            <div className="form-group">
                <label htmlFor="placeName">Nombre del lugar</label>
                <input
                    type="text"
                    id="placeName"
                    className="form-control"
                    value={placeName}
                    onChange={ handlePlaceNameChange }
                />
            </div>
            <Link
                to={'/places/getPlaces'}
                className="btn btn-outline-primary mt-3"
                onClick={ handleAddPlaceByPlaceName }
            >Añadir lugar</Link>
        </MainLayout>
    );

}
