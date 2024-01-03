import {MainLayout} from "../../layouts/MainLayout.tsx";
import {Link} from "react-router-dom";
import {SmartForm} from "../../components/SmartForm.tsx";
import {FormField} from "../../interfaces/FormField.ts";
import {FormValidations} from "../../interfaces/FormValidations.ts";
import React, {useContext, useState} from "react";
import {Coords} from "../../interfaces/Coords.ts";
import {getPlacesController, PlacesController} from "../../controller/PlacesController.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {PlacesContext, PlacesContextInterface} from "../../context/PlacesContext.tsx";

export const AddPlaceByCoords = () => {

    const { user }: AuthContextInterface = useContext(AuthContext);
    const placesContext: PlacesContextInterface = useContext(PlacesContext);
    const placesController: PlacesController = getPlacesController();

    const [coords, setCoords] = useState<Coords>({
        lon: 0,
        lat: 0,
    });
    const [coordsSetted, setCoordsSetted] = useState<boolean>(false);

    const [placeName, setPlaceName] = useState<string>('');

    const formData = {
        Longitud: coords.lon,
        Latitud: coords.lat,
    };

    const formFields: FormField[] = [
        {
            id: 'Longitud',
            label: 'Longitud',
            type: 'number',
            placeholder: 'Entre -180 y 180',
        },
        {
            id: 'Latitud',
            label: 'Latitud',
            type: 'number',
            placeholder: 'Entre -90 y 90',
        },
    ];

    const validations: FormValidations = {
        Longitud: (value: string) => {
            if(!value) return 'La longitud es requerida';
            if(isNaN(Number(value))) return 'La longitud debe ser un número';
            if(Number(value) < -180 || Number(value) > 180) return 'La longitud debe estar entre -180 y 180';
            return null;
        },
        Latitud: (value: string) => {
            if(!value) return 'La latitud es requerida';
            if(isNaN(Number(value))) return 'La latitud debe ser un número';
            if(Number(value) < -90 || Number(value) > 90) return 'La latitud debe estar entre -90 y 90';
            return null;
        }
    }

    const handleSetCoords = async (formData: any) => {
        setCoords({
            lon: formData.Longitud,
            lat: formData.Latitud,
        });
        const name: string = await placesController.getPlaceNameByCoords(coords);
        setPlaceName(name);
        setCoordsSetted(true);
    }

    const handlePlaceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaceName(event.target.value);
    }

    const handleAddPlace = () => {
        setCoords({
            lon: 0,
            lat: 0,
            name: placeName,
        });
        placesController.setPlace({
            Nombre: placeName,
            Longitud: coords.lon || 0,
            Latitud: coords.lat || 0,
            Favorito: false,
        }, user.uid).then(places => {
            placesContext.setPlaces([...places]);
        });
    }

    return (
        <MainLayout>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Añadir lugar usando coordenadas</h1>
                <Link
                    to={'/places/addPlaceByToponym'}
                    className="btn btn-outline-info"
                >
                    <i className={'fas fa-exchange-alt'}></i>
                </Link>
            </div>
            <hr/>
            <SmartForm  formData={ formData } formFields={ formFields } onSubmit={ handleSetCoords }
                        submitButtonLabel="Establecer coordenadas" validations={ validations } />

            {
                coordsSetted && (
                    <form>
                        <div className="form-group">
                            <label htmlFor="placeName">Nombre del lugar</label>
                            <input
                                type="text"
                                id="placeName"
                                className="form-control"
                                value={placeName}
                                onChange={handlePlaceNameChange}
                            />
                        </div>
                        <Link
                            to={'/places/getPlaces'}
                            className="btn btn-outline-primary mt-3"
                            onClick={handleAddPlace}
                        >Añadir lugar</Link>
                    </form>
                )
            }

        </MainLayout>
    )

}
