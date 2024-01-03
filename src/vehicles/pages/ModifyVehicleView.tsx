import { useState, useEffect } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import Combustible from '../../enums/Combustible';
import { FormState } from '../../hooks/useForm';
import { Link } from "react-router-dom";
import { SmartForm } from "../../components/SmartForm.tsx";
import { useParams, useNavigate } from 'react-router-dom';

interface ModifyVehicleViewProps {
    vehiclesViewModel: VehiclesViewModel;
}

const ModifyVehicleView = ({ vehiclesViewModel }: ModifyVehicleViewProps) => {
    const { plate } = useParams();
    const navigate = useNavigate();
    const [resultado, setResultado] = useState('');

    const [formState, setFormState] = useState({
        plate: '',
        name: '',
        propulsion: Combustible.Gasolina,
        consumption: '0',
        favorite: false
    });

    useEffect(() => {
        if (!plate) {
            navigate('/vehicles/getVehicles');
            return;
        }
        const loadVehicleData = async () => {
            try {
                const vehicleData = await vehiclesViewModel.getVehicle(plate);
                setFormState({
                    plate: vehicleData.plate,
                    name: vehicleData.name,
                    propulsion: vehicleData.propulsion,
                    consumption: vehicleData.consumption.toString(),
                    favorite: vehicleData.favorite || false
                });
            } catch (error) {
                setResultado('Error al obtener la matrícula del vehículo');
            }
        };

        loadVehicleData();
    }, [vehiclesViewModel, plate, navigate]);

    const formFields = [
        { id: 'plate', label: 'Matrícula del Vehículo', type: 'string', placeholder: 'Matrícula del Vehículo', disabled: true},
        { id: 'name', label: 'Nombre del Vehículo', type: 'text', placeholder: 'Nombre del Vehículo' },
        { id: 'propulsion', label: 'Propulsión', type: 'select', options: Object.values(Combustible) },
        { id: 'consumption', label: 'Consumo', type: 'number', placeholder: 'Consumo' },
    ];

    const validations = {
        name: (value: string) => !value || value.trim() === '' ? 'Nombre requerido' : null,
        propulsion: (value: Combustible) => Object.values(Combustible).includes(value) ? null : 'Tipo de propulsión inválido. Tipos válidos: ' + Object.values(Combustible).join(', '),
        consumption: (value: string) => isNaN(parseFloat(value)) ? 'Consumo inválido' : null
    };

    const handleSubmit = async (currentFormState: FormState) => {
        try {
            const result = await vehiclesViewModel.modifyVehicle({
                plate: currentFormState.plate,
                name: currentFormState.name,
                propulsion: currentFormState.propulsion,
                consumption: parseFloat(currentFormState.consumption),
                favorite: currentFormState.favorite
            });
            setResultado(result ? 'Vehículo modificado con éxito' : 'Error al modificar vehículo');
            setTimeout(() => {
                navigate('/vehicles/getVehicles');
            }, 2000);
        } catch (error) {
            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Modificar Vehículo</h1>
            <SmartForm 
                formData={formState}
                formFields={formFields}
                onSubmit={handleSubmit}
                submitButtonLabel="Modificar Vehículo"
                validations={validations}
            />
            {resultado && <div className="alert alert-info">{resultado}</div>}
            <Link to={'/vehicles/getVehicles'}>Ver vehículos</Link>
        </div>
    );
};

export default ModifyVehicleView;
