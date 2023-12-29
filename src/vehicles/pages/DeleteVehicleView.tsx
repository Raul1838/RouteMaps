import React, {useState} from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import { SmartForm } from '../../auth/components/SmartForm';
import { FormState } from '../../hooks/useForm';

interface DeleteVehicleViewProps {
    vehiclesViewModel: VehiclesViewModel;
}

const DeleteVehicleView = ({ vehiclesViewModel }: DeleteVehicleViewProps) => {
    const [resultado, setResultado] = useState('');

    const formFields = [
        { id: 'id', label: 'ID del Vehículo', type: 'number', placeholder: 'ID del Vehículo' },
    ];

    const validations = {
        id: (value: string) => isNaN(parseInt(value)) || parseInt(value) <= 0 ? 'ID inválido' : null,
    };

    const initialFormData = {
        id: ''
    };

    const handleSubmit = (formState: FormState) => {
        (async () => {
            try {
                const result = await vehiclesViewModel.deleteVehicle(parseInt(formState.id));
                setResultado(result ? 'Vehículo eliminado con éxito' : 'Error al eliminar vehículo');
            } catch (error) {
                setResultado('Error al procesar la solicitud');
            }
        })();
    };

    return (
        <div>
            <h1>Eliminar Vehículo</h1>
            <SmartForm 
                formData={initialFormData}
                formFields={formFields}
                onSubmit={handleSubmit}
                submitButtonLabel="Eliminar Vehículo"
                validations={validations}
            />
            <div className="alert alert-info">{resultado}</div>
        </div>
    );
};

export default DeleteVehicleView;
