import { useState } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import Combustible from '../../enums/Combustible';
import { FormState } from '../../hooks/useForm';
import { Link, useNavigate } from "react-router-dom";
import { SmartForm } from "../../components/SmartForm.tsx";

interface AddVehicleComponentProps {
    vehiclesViewModel: VehiclesViewModel;
}

const AddVehicleComponent = ({ vehiclesViewModel }: AddVehicleComponentProps) => {
    const [resultado, setResultado] = useState('');
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        plate: '',
        name: '',
        propulsion: Combustible.Gasolina,
        consumption: 0,
        favorite: false
    });

    const formFields = [
        { id: 'plate', label: 'Matrícula del Vehículo', type: 'string', placeholder: 'Matrícula del Vehículo' },
        { id: 'name', label: 'Nombre del Vehículo', type: 'text', placeholder: 'Nombre del Vehículo' },
        { id: 'propulsion', label: 'Propulsión', type: 'select', options: Object.values(Combustible) },
        { id: 'consumption', label: 'Consumo', type: 'number', placeholder: 'Consumo' }
    ];

    const validations = {
        propulsion: (value: Combustible) => Object.values(Combustible).includes(value) ? null : 'Tipo de propulsión inválido. Tipos válidos: ' + Object.values(Combustible).join(', '),
        consumption: (value: string) => isNaN(parseFloat(value)) ? 'Consumo inválido' : null
    };

    const resetFormState = () => {
        setFormState({
            plate: '',
            name: '',
            propulsion: Combustible.Gasolina, 
            consumption: 0,
            favorite: false
        });
    };

    const handleSubmit = async (currentFormState: FormState) => {

        try {
            const vehicleData = {
                plate: currentFormState.plate,
                name: currentFormState.name,
                propulsion: currentFormState.propulsion,
                consumption: parseFloat(currentFormState.consumption),
                favorite: currentFormState.favorite
            };
    
            const result = await vehiclesViewModel.addVehicle(vehicleData);
            if (result) {
                setResultado('Vehículo añadido con éxito');
                resetFormState();
                setTimeout(() => {
                    navigate('/vehicles/getVehicles');
                }, 2000);
            } else {
                setResultado('Error al añadir vehículo');
            }
        } catch (error) {
            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Añadir Vehículo</h1>
            {!resultado && <div className="alert alert-info">{resultado}</div>}
            <SmartForm 
                formData={formState}
                formFields={formFields}
                onSubmit={handleSubmit}
                submitButtonLabel="Añadir Vehículo"
                validations={validations}
            />
            <Link to={'/vehicles/getVehicles'}>Ver vehículos</Link>
        </div>
    );
};

export default AddVehicleComponent;

