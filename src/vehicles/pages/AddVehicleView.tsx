import React, { useState } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import { SmartForm } from '../../auth/components/SmartForm';
import Combustible from '../../enums/Combustible';
import { FormState } from '../../hooks/useForm';

interface AddVehicleComponentProps {
    vehiclesViewModel: VehiclesViewModel;
}

const AddVehicleComponent = ({ vehiclesViewModel }: AddVehicleComponentProps) => {
    const [resultado, setResultado] = useState('');

    
    const formFields = [
        { id: 'id', label: 'ID del Vehículo', type: 'number', placeholder: 'ID del Vehículo' },
        { id: 'nombre', label: 'Nombre del Vehículo', type: 'text', placeholder: 'Nombre del Vehículo' },
        { id: 'propulsion', label: 'Propulsión', type: 'select', options: Object.values(Combustible) },
        { id: 'consumo', label: 'Consumo', type: 'number', placeholder: 'Consumo' },
        { id: 'favorito', label: 'Favorito', type: 'checkbox' },
        { id: 'defecto', label: 'Defecto', type: 'checkbox' },
    ];
    

    const validations = {
        id: (value: string) => isNaN(parseInt(value)) ? 'ID inválido' : null,
        nombre: (value: string) => value.trim() === '' ? 'Nombre requerido' : null,
        consumo: (value: string) => isNaN(parseFloat(value)) ? 'Consumo inválido' : null,
    };

    const initialFormData = {
        id: '',
        nombre: '',
        propulsion: '',
        consumo: '',
        favorito: false,
        defecto: false
    };

    const handleSubmit = (formState: FormState) => {
        const vehicleData = {
            id: parseInt(formState.id),
            Nombre: formState.nombre,
            propulsion: formState.propulsion,
            consumo: parseFloat(formState.consumo),
            Favorito: formState.favorito,
            Defecto: formState.defecto
        };
    
        (async () => {
            try {
                const result = await vehiclesViewModel.addVehicle(vehicleData);
                setResultado(result ? 'Vehículo añadido con éxito' : 'Error al añadir vehículo');
            } catch (error) {
                setResultado('Error al procesar la solicitud');
            }
        })();
    };
    

    return (
        <div>
            <h1>Añadir Vehículo</h1>
            <SmartForm 
                formData={initialFormData}
                formFields={formFields}
                onSubmit={handleSubmit}
                submitButtonLabel="Añadir Vehículo"
                validations={validations}
            />
            <div className="alert alert-info">{resultado}</div>
        </div>
    );
};

export default AddVehicleComponent;
