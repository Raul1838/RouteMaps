import {useNavigate, useParams} from "react-router-dom";
import {MainLayout} from "../../layouts/MainLayout.tsx";
import {useContext, useEffect, useState} from "react";
import {PlacesContext, PlacesContextInterface} from "../../context/PlacesContext.tsx";
import Place from "../../interfaces/Place.ts";
import {SmartForm} from "../../components/SmartForm.tsx";
import {FormValidations} from "../../interfaces/FormValidations.ts";
import {FormField} from "../../interfaces/FormField.ts";
import {Button} from "react-bootstrap";
import {getPlacesController, PlacesController} from "../../controller/PlacesController.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";

export const EditPlacePage = () => {

    const { placeName } = useParams<{ placeName: string }>();
    const navigate = useNavigate()

    const { user }: AuthContextInterface = useContext(AuthContext);
    const { places, setPlaces }: PlacesContextInterface = useContext(PlacesContext);
    const placesController: PlacesController = getPlacesController();

    const [place, setPlace] = useState<Place>({
        Nombre: '',
        Longitud: 0,
        Latitud: 0,
        Favorito: false,
    });

    useEffect(() => {
        const detailedPlace: Place | undefined = places.find((place) => place.Nombre === placeName);
        if( detailedPlace ) setPlace(detailedPlace);
    }, [ placeName ]);

    const formData = {
        Nombre: place.Nombre,
        Longitud: place.Longitud,
        Latitud: place.Latitud,
    };

    const formFields: FormField[] = [
        {
            id: 'Nombre',
            label: 'Nombre',
            type: 'text',
            placeholder: 'Nombre del lugar',
        },
        {
            id: 'Longitud',
            label: 'Longitud',
            type: 'number',
            placeholder: 'Longitud del lugar',
        },
        {
            id: 'Latitud',
            label: 'Latitud',
            type: 'number',
            placeholder: 'Latitud del lugar',
        },
    ];

    const validations: FormValidations = {
        Nombre: (value: string) => {
            if(!value) return 'El nombre es requerido';
            return null;
        },
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

    const handleSaveDetails = async (formData: any) => {
        const modifiedPlace: Place = {
            ...formData,
            Favorito: place.Favorito,
        };
        setPlaces(places.map((place) => {
            if(place.Nombre === placeName) return modifiedPlace;
            return place;
        }));
        await placesController.setPlace(modifiedPlace, user.uid);
        navigate('/places');
    }

    const toggleFavorite = () => {
        setPlace({
            ...place,
            Favorito: !place.Favorito
        });
    }

    return (
        <MainLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Editar lugar</h1>
                <Button variant={place.Favorito ? "warning" : "outline-warning"} onClick={toggleFavorite}>
                    <i className={'fas fa-star'}></i>
                </Button>
            </div>
            <hr />
            <SmartForm formData={ formData } formFields={ formFields } onSubmit={ handleSaveDetails }
                       submitButtonLabel="Guardar" validations={ validations } />
        </MainLayout>
    );

}
