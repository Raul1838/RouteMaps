import { useState } from "react";
import PlacesViewModel from "../viewModel/PlacesViewModel";
import { FormState } from '../../hooks/useForm';
import { Link } from "react-router-dom";
import {SmartForm} from "../../components/SmartForm.tsx";

interface AddPlaceByCoordsComponentProps {
    placesViewModel: PlacesViewModel;
}

const AddPlaceByCoordsComponent = ({ placesViewModel }: AddPlaceByCoordsComponentProps) => {
    const [resultado, setResultado] = useState('');

    const formFields = [
        { id: 'latitud', label: 'Latitud', type: 'number', placeholder: 'Latitud' },
        { id: 'longitud', label: 'Longitud', type: 'number', placeholder: 'Longitud' }
    ];

    const validations = {
        latitud: (value: string) => isNaN(parseFloat(value)) ? 'Latitud inválida' : null,
        longitud: (value: string) => isNaN(parseFloat(value)) ? 'Longitud inválida' : null
    };

    const initialFormData = {
        latitud: '',
        longitud: ''
    };

    const handleSubmit = async (formState: FormState) => {
        try {
            const coordenadas = { Latitud: parseFloat(formState.latitud), Longitud: parseFloat(formState.longitud) };
            const result = await placesViewModel.addPlaceByCoords(coordenadas);
            setResultado(result ? 'Lugar añadido con éxito' : 'Error al añadir lugar');
        } catch (error) {
            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Añadir un nuevo lugar por coordenadas</h1>
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

export default AddPlaceByCoordsComponent;
