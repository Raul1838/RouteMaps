import {useState} from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import { FormState } from '../../hooks/useForm';
import { Link } from "react-router-dom";
import {SmartForm} from "../../components/SmartForm.tsx";


interface DeleteVehicleViewProps {
    vehiclesViewModel: VehiclesViewModel;
}

const DeleteVehicleView = ({ vehiclesViewModel }: DeleteVehicleViewProps) => {
    const [resultado, setResultado] = useState('');

    const formFields = [
        { id: 'plate', label: 'Matrícula del Vehículo', type: 'string', placeholder: 'Matrícula del Vehículo' }
    ];

    const validations = {
        plate: (value: string) => !value ? 'La matrícula del vehículo es requerida' : null,
    };
    

    const initialFormData = {
        plate: ''
    };

    const handleSubmit = (formState: FormState) => {
        (async () => {
            try {
                const result = await vehiclesViewModel.deleteVehicle(formState.plate);
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
            <Link to={'/vehicles/getVehicles'}>Ver vehículos</Link>

        </div>
    );
};

export default DeleteVehicleView;
