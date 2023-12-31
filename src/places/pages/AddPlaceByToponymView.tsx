import React, { useState } from 'react';
import PlacesViewModel from '../viewModel/PlacesViewModel';
import { SmartForm } from '../../auth/components/SmartForm';
import { FormState } from '../../hooks/useForm';
import { Link } from "react-router-dom";

interface AddPlaceByToponymComponentProps {
    placesViewModel: PlacesViewModel;
}

const AddPlaceByToponymComponent = ({ placesViewModel }: AddPlaceByToponymComponentProps) => {
    const [resultado, setResultado] = useState('');

    const formFields = [
        { id: 'toponym', label: 'Nombre del Lugar', type: 'text', placeholder: 'Nombre del Lugar' }
    ];

    const validations = {
        toponym: (value: string) => value.trim() === '' ? 'El nombre del lugar es requerido' : null
    };

    const initialFormData = {
        toponym: ''
    };

    const handleSubmit = async (formState: FormState) => {
        try {
            const result = await placesViewModel.addPlaceByToponym(formState.toponym);
            setResultado(result ? 'Lugar añadido con éxito' : 'Error al añadir lugar');
        } catch (error) {
            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Añadir un lugar por topónimo</h1>
            <SmartForm 
                formData={initialFormData}
                formFields={formFields}
                onSubmit={handleSubmit}
                submitButtonLabel="Añadir Lugar"
                validations={validations}
            />
            <div className="alert alert-info">{resultado}</div>
            <Link to={'/places/getPlaces'}>Ver lugares</Link>
        </div>
    );
};

export default AddPlaceByToponymComponent;
