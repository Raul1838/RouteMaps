import { useState, useContext } from 'react';
import Combustible from '../../enums/Combustible';
import { FormState } from '../../hooks/useForm';
import { Link, useNavigate } from "react-router-dom";
import { SmartForm } from "../../components/SmartForm.tsx";
import { MainLayout } from '../../layouts/MainLayout.tsx';
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import VehiclesController, { getVehiclesController } from '../../controller/VehiclesController.ts';



const AddVehicleComponent = () => {
    const { user }: AuthContextInterface = useContext(AuthContext);

    const vehiclesController: VehiclesController = getVehiclesController();

    const [resultado, setResultado] = useState('');
    const navigate = useNavigate();
    const [operationStatus, setOperationStatus] = useState(false);
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
    
            const result = await vehiclesController.addVehicle(vehicleData, user.uid);
            if (result) {
                setResultado('Vehículo añadido con éxito');
                setOperationStatus(true);
                resetFormState();
                navigate('/vehicles/getVehicles');
                
            } else {
                setResultado('Error al añadir vehículo');
            }
        } catch (error) {
            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <MainLayout>
            <div>
                <h1>Añadir Vehículo</h1>
                <SmartForm 
                    formData={formState}
                    formFields={formFields}
                    onSubmit={handleSubmit}
                    submitButtonLabel="Añadir Vehículo"
                    validations={validations}
                />
                {resultado && (<div className={`alert ${operationStatus ? 'alert-info' : 'alert-danger'}`}>{resultado}</div>)}

                <Link className="btn btn-outline-primary mt-3" to={'/vehicles/getVehicles'}>Ver vehículos</Link>
            </div>
        </MainLayout>
    );
};

export default AddVehicleComponent;

