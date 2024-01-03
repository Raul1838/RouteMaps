import { useState, useEffect } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import Vehicle from '../../interfaces/Vehicle';
import { SmartForm } from '../../components/SmartForm.tsx';




interface DeleteVehicleViewProps {
    vehiclesViewModel: VehiclesViewModel;
}

const DeleteVehicleView = ({ vehiclesViewModel }: DeleteVehicleViewProps) => {
    const { plate } = useParams(); 
    const navigate = useNavigate();
    const [resultado, setResultado] = useState('');
    const [vehicleData, setVehicleData] = useState<Vehicle | null>(null);

    useEffect(() => {
        if (!plate) {
            navigate('/vehicles/getVehicles');
            return;
        }

        const loadVehicleData = async () => {
            try {
                const data = await vehiclesViewModel.getVehicle(plate);
                setVehicleData(data);
            } catch (error) {
                setResultado('Error al cargar los datos del vehículo');
            }
        };

        loadVehicleData();
    }, [plate, vehiclesViewModel, navigate]);

    const formFields = [
        { id: 'plate', label: 'Matrícula del Vehículo', type: 'text', placeholder: '', disabled: true },
        { id: 'name', label: 'Nombre del Vehículo', type: 'text', placeholder: '', disabled: true },
        { id: 'propulsion', label: 'Propulsión', type: 'text', placeholder: '', disabled: true },
        { id: 'consumption', label: 'Consumo', type: 'text', placeholder: '', disabled: true },
    ];

    const initialFormData = vehicleData ? {
        plate: vehicleData.plate,
        name: vehicleData.name,
        propulsion: vehicleData.propulsion,
        consumption: vehicleData.consumption.toString(),
    } : {};

    const handleSubmit = async () => {
        if (!plate) {
            navigate('/vehicles/getVehicles');
            return;
        }       
        try {
            const result = await vehiclesViewModel.deleteVehicle(plate);
            setResultado(result ? 'Vehículo eliminado con éxito' : 'Error al eliminar vehículo');
        } catch (error) {
            setResultado('Error al procesar la solicitud');
        }
        
        setTimeout(() => {
            navigate('/vehicles/getVehicles');
        }, 2000);
    };

    return (
        <div>
            <h1>Eliminar Vehículo</h1>
            <SmartForm 
                formData={initialFormData}
                formFields={formFields}
                onSubmit={handleSubmit}
                submitButtonLabel="Eliminar Vehículo"
                validations={{}}
            />
            {resultado && <div className="alert alert-info">{resultado}</div>}
            <Link to={'/vehicles/getVehicles'}>Ver vehículos</Link>
        </div>
    );
};

export default DeleteVehicleView;
