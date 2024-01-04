import  { useState, useContext, useEffect } from 'react';
import { PathwayTypes } from '../../enums/PathwayTypes';
import { PathwayTransportMeans } from '../../enums/PathwayTransportMeans';
import { FormState } from '../../hooks/useForm';
import { Link, useNavigate } from 'react-router-dom';
import { SmartForm } from '../../components/SmartForm';
import { MainLayout } from '../../layouts/MainLayout';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';
import { getPathwayController, PathwayController } from '../../controller/PathwayController';
import { PlacesController, getPlacesController } from '../../controller/PlacesController';
import Place from '../../interfaces/Place';
import VehiclesController, { getVehiclesController } from '../../controller/VehiclesController';
import Vehicle from '../../interfaces/Vehicle';

const AddPathwayView = () => {
    const { user }: AuthContextInterface = useContext(AuthContext);
    const pathwayController: PathwayController = getPathwayController();
    const placesController: PlacesController = getPlacesController();
    const vehiclesController: VehiclesController = getVehiclesController();
    const [places, setPlaces] = useState<Place[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        type: PathwayTypes.SHORTEST,
        start: '',
        end: '',
        transportMean: PathwayTransportMeans.VEHICLE,
        codifiedPath: '',
        duration: 0,
        distance: 0,
        favourite: false,
        vehicle: ''
    });

    useEffect(() => {
        placesController.getPlaces(user.uid).then(places => setPlaces([...places]) );
        vehiclesController.getVehicles(user.uid).then(vehicles => setVehicles([...vehicles]) )
    }, [user.uid, placesController, vehiclesController]);

    const formFields = [
        { id: 'type', label: 'Tipo de Ruta', type: 'select', options: Object.values(PathwayTypes) },
        { id: 'start', label: 'Inicio', type: 'select', options: places.map(place => place.Nombre)  },
        { id: 'end', label: 'Destino', type: 'select', options: places.map(place => place.Nombre) },
        { id: 'transportMean', label: 'Medio de Transporte', type: 'select', options: Object.values(PathwayTransportMeans) },
        { id: 'vehicle', label: 'Vehículo', type: 'select', options: vehicles.map(vehicle => vehicle.plate) }
    ];

    const validations = {
    };

    const handleSubmit = async (currentFormState: FormState) => {
        try {
            const pathwayData = {
                type: currentFormState.type,
                start: currentFormState.start,
                end: currentFormState.end,
                transportMean: currentFormState.transporteMean,
                codifiedPath: '',
                duration: 0,
                distance: 0,
                favourite: false,
                vehicle: currentFormState.vehicle
    
            };
             await pathwayController.addPathway(pathwayData, user.uid);
            navigate("/pathways/getPathway");
            
        } catch (error) {
            throw(error);
        }
    };

    return (
        <MainLayout>
            <div>
                <h1>Añadir Ruta</h1>
                <SmartForm 
                    formData={formState}
                    formFields={formFields}
                    onSubmit={handleSubmit}
                    submitButtonLabel="Añadir Ruta"
                    validations={validations}
                />
                <Link className="btn btn-outline-primary mt-3" to={'/pathways/getPathways'}>Ver rutas</Link>
            </div>
        </MainLayout>
    );
};

export default AddPathwayView;
