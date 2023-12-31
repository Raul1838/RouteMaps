import { useState } from 'react';
import PlacesViewModel from '../viewModel/PlacesViewModel';
import { FormState } from '../../hooks/useForm';
import { Link } from "react-router-dom";
import {SmartForm} from "../../components/SmartForm.tsx";

interface DeletePlacesViewProps {
    placesViewModel: PlacesViewModel;
}

const DeletePlacesView = ({ placesViewModel }: DeletePlacesViewProps) => {
    const [resultado, setResultado] = useState('');

    const formFields = [
        { id: 'nombre', label: 'Nombre del Lugar', type: 'text', placeholder: 'Nombre del Lugar' },
        { id: 'latitud', label: 'Latitud', type: 'number', placeholder: 'Latitud' },
        { id: 'longitud', label: 'Longitud', type: 'number', placeholder: 'Longitud' },
    ];

    const validations = {
        nombre: (value: string) => value.trim() === '' ? 'El nombre es requerido' : null,
        latitud: (value: string) => !isValidCoordinate(value, -90, 90) ? 'Latitud inválida' : null,
        longitud: (value: string) => !isValidCoordinate(value, -180, 180) ? 'Longitud inválida' : null,
    };

    const initialFormData = {
        nombre: '',
        latitud: '',
        longitud: '',
    };

    const isValidCoordinate = (value: string, min: number, max: number) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    };

    const handleSubmit = async (formState: FormState) => {
        try {
            const placeToDelete = {
                Nombre: formState.nombre,
                Latitud: parseFloat(formState.latitud),
                Longitud: parseFloat(formState.longitud),
                Favorito: false
            };
            const result = await placesViewModel.deletePlace(placeToDelete);
            setResultado(result ? 'Lugar eliminado con éxito.' : 'Error al eliminar lugar.');
        } catch (error) {
            setResultado('Error al procesar la solicitud: ' + (error instanceof Error ? error.message : ''));
        }
    };

    return (
        <div>
            <h1>Eliminar Lugar</h1>
            <SmartForm 
                formData={initialFormData}
                formFields={formFields}
                onSubmit={handleSubmit}
                submitButtonLabel="Eliminar Lugar"
                validations={validations}
            />
            <div className="alert alert-info">{resultado}</div>
            <Link to={'/places/getPlaces'}>Ver</Link>
        </div>
    );
};

export default DeletePlacesView;
