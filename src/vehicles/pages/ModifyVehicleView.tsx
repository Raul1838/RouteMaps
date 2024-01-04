import { useState, useEffect, useContext } from 'react';
import Combustible from '../../enums/Combustible';
import { FormState } from '../../hooks/useForm';
import { Link } from "react-router-dom";
import { SmartForm } from "../../components/SmartForm.tsx";
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../layouts/MainLayout.tsx';
import VehiclesController, { getVehiclesController } from '../../controller/VehiclesController.ts';
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";




const ModifyVehicleView = () => {
    const { plate } = useParams<{plate: string}>();
    const navigate = useNavigate();
    const [resultado, setResultado] = useState('');
    const { user }: AuthContextInterface = useContext(AuthContext);


    const vehiclesController: VehiclesController = getVehiclesController();

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
                const vehicleData = await vehiclesController.getVehicle(plate, user.uid);
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
    }, [plate]);

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
            const result = await vehiclesController.modifyVehicle({
                plate: currentFormState.plate,
                name: currentFormState.name,
                propulsion: currentFormState.propulsion,
                consumption: parseFloat(currentFormState.consumption),
                favorite: currentFormState.favorite
            }, user.uid);
            setResultado(result ? 'Vehículo modificado con éxito' : 'Error al modificar vehículo');
            navigate('/vehicles/getVehicles');
        } catch (error) {
            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <MainLayout>
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
                <Link className="btn btn-outline-primary mt-3" to={'/vehicles/getVehicles'}>Ver vehículos</Link>
            </div>
        </MainLayout>
    );
};

export default ModifyVehicleView;
