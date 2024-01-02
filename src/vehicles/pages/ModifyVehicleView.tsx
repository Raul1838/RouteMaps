import { useState } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import Combustible from '../../enums/Combustible';
import { FormState } from '../../hooks/useForm';
import { Link } from "react-router-dom";
import {SmartForm} from "../../components/SmartForm.tsx";


interface ModifyVehicleViewProps {
    vehiclesViewModel: VehiclesViewModel;
}

const ModifyVehicleView = ({ vehiclesViewModel }: ModifyVehicleViewProps) => {
    const [resultado, setResultado] = useState('');

    const formFields = [
        { id: 'plate', label: 'Matrícula del Vehículo', type: 'string', placeholder: 'Matrícula del Vehículo' },
        { id: 'name', label: 'Nombre del Vehículo', type: 'text', placeholder: 'Nombre del Vehículo' },
        { id: 'propulsion', label: 'Propulsión', type: 'select', options: Object.values(Combustible) },
        { id: 'consumption', label: 'Consumo', type: 'number', placeholder: 'Consumo' },
        { id: 'favorite', label: 'Favorito', type: 'checkbox' }
    ];

    const validations = {
        plate: (value: string) => !value ? 'La matrícula del vehículo es requerida' : null,
        name: (value: string) => value.trim() === '' ? 'Nombre requerido' : null,
        consumption: (value: string) => isNaN(parseFloat(value)) ? 'Consumo inválido' : null
    };

    const initialFormData = {
        plate: '',
        name: '',
        propulsion: '',
        consumption: '',
        favorite: false
    };

    const handleSubmit = async (formState: FormState) => {
        const vehicleToUpdate = {
            plate: formState.plate,
            name: formState.name,
            propulsion: formState.propulsion,
            consumption: parseFloat(formState.consumption),
            favorite: formState.favorite
        };

        (async () => {
            try {
                const result = await vehiclesViewModel.modifyVehicle(vehicleToUpdate);
                setResultado(result ? 'Vehículo modificado con éxito' : 'Error al modificar vehículo');
            } catch (error) {
                setResultado('Error al procesar la solicitud');
            }
        })();
    };

    return (
        <div>
            <h1>Modificar Vehículo</h1>
            <SmartForm 
                formData={initialFormData}
                formFields={formFields}
                onSubmit={handleSubmit}
                submitButtonLabel="Modificar Vehículo"
                validations={validations}
            />
            <div className="alert alert-info">{resultado}</div>
            <Link to={'/vehicles/getVehicles'}>Ver vehículos</Link>
        </div>
    );
};

export default ModifyVehicleView;
