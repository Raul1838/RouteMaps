import {useContext, useEffect, useState} from "react";
import {FormField} from "../../interfaces/FormField.ts";
import {FormState} from "../../hooks/useForm.ts";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import {SmartForm} from "../../components/SmartForm.tsx";
import {getPlacesController, PlacesController} from "../../controller/PlacesController.ts";
import {FormValidations} from "../../interfaces/FormValidations.ts";
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import {PathwayTransportMeans} from "../../enums/PathwayTransportMeans.ts";
import {PathwayTypes} from "../../enums/PathwayTypes.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {InputButtonSpecification} from "../../interfaces/InputButtonSpecification.ts";
import PathwayController, {getPathwayController} from "../../controller/PathwayController.ts";
import Vehicle from "../../interfaces/Vehicle.ts";
import Combustible from "../../enums/Combustible.ts";
import VehiclesController, {getVehiclesController} from "../../controller/VehiclesController.ts";

const options: PathwayTypes[] = Object.values(PathwayTypes).filter((value) => value !== PathwayTypes.UNDEFINED);

export const Buscador = () => {

    const authContext: AuthContextInterface = useContext(AuthContext);
    const { defaultPathwayType, defaultVehiclePlate } = authContext;

    const navigationContext : NavigationContextInterface = useContext(NavigationContext);
    const { distance, duration, pathwayTransportMean, vehicle} = navigationContext;

    const pathwayController: PathwayController = getPathwayController();
    const vehiclesController: VehiclesController = getVehiclesController();

    const [selection, setSelection] = useState<PathwayTypes>(defaultPathwayType);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>({
        consumption: 0,
        favorite: false,
        name: "",
        plate: "",
        propulsion: Combustible.Gasolina
    });
    const [pathwayCost, setPathwayCost] = useState<number>(0);

    useEffect(() => {
        if( defaultVehiclePlate ) {
           vehiclesController.getVehicle(defaultVehiclePlate).then((vehicle) => {
                setSelectedVehicle(vehicle);
            });
        }
    }, []);

    useEffect(() => {
        if( vehicle.plate === '' || vehicle.plate === selectedVehicle.plate ) return;
        setSelectedVehicle(vehicle);
    }, [vehicle]);

    useEffect(() => {
        calculatePathwayCost();
    }, [pathwayTransportMean, selectedVehicle, distance, duration]);

    const calculatePathwayCost = async () => {
        try {
            if( pathwayTransportMean === PathwayTransportMeans.VEHICLE )
                setPathwayCost( await pathwayController.calculatePrice(distance, selectedVehicle) );
            else
                setPathwayCost( pathwayController.calculateCalories(distance, pathwayTransportMean) );
        } catch (e) {
            console.log('Fallo al calcular el coste de la ruta');
            setPathwayCost(0);
        }
    }

    const formData = {
        from: navigationContext.from.name,
        to: navigationContext.to.name
    }

    const formFields: FormField[] = [
        { id: 'from', label: 'Desde', type: 'text' },
        { id: 'to', label: 'Hasta', type: 'text' }
    ];

    const validations: FormValidations = {
        from: (value: string) => {
            if (value.length < 3) {
                return 'Debe tener al menos 3 carácteres';
            }
            return null;
        },
        to: (value: string) => {
            if (value.length < 3) {
                return 'Debe tener al menos 3 carácteres';
            }
            return null;
        }
    }

    const handleNavigate = async ( formState: FormState ) => {
        const placesController: PlacesController = getPlacesController();
        let fromCoords = navigationContext.from;
        if( navigationContext.from.name !== formState.from ) fromCoords = await placesController.transformToValidCoords(formState.from);
        let toCoords = navigationContext.to;
        if( navigationContext.to.name !== formState.to ) toCoords = await placesController.transformToValidCoords(formState.to);
        navigationContext.setFrom({...fromCoords});
        navigationContext.setTo({...toCoords});
        navigationContext.setPathwayType(selection as PathwayTypes);
    }

    const inputButtonSpecification: InputButtonSpecification = {
        icon: 'fas fa-map-marker-alt',
        onClick: (id: string) => {
            navigationContext.setShowSavedPlaces(!navigationContext.showSavedPlaces);
            navigationContext.setFieldInSelection(id);
        }
    }

    const handleTransportChange = (transportMean: PathwayTransportMeans) => {
        navigationContext.setPathwayTransportMean(transportMean);
    }

    const handleSelectPathwayType = ( eventKey: string | null ) => {
        if( eventKey ) {
            setSelection(eventKey as PathwayTypes);
            navigationContext.setPathwayType(eventKey as PathwayTypes);
        }
    }

    const transportMeanIcons: { [key: string]: string } = {
        [PathwayTransportMeans.BIKE]: 'fas fa-bicycle',
        [PathwayTransportMeans.VEHICLE]: 'fas fa-car',
        [PathwayTransportMeans.WALKING]: 'fas fa-walking',
    }

    const handleShowVehicles = () => {
        navigationContext.setShowVehicles(!navigationContext.showVehicles);
    }

    return (
        <div className="card" style={{
            position: 'fixed',
            top: '55px',
            left: '50px',
            height: 'calc(100% - 60px)',
            width: '300px',
            zIndex: 1,
        }}>
            <div className="card-body">
                <h3 className="card-title">Ruta</h3>
                <hr />
                <SmartForm formData={ formData } formFields={ formFields } onSubmit={ handleNavigate }
                           submitButtonLabel={ 'Navegar' } validations={ validations } inputButtonsSpecification={ inputButtonSpecification } />

                <ButtonGroup aria-label="Transport means">
                    {Object.values(PathwayTransportMeans).map((transportMean) => (
                        <Button
                            key={transportMean}
                            variant={pathwayTransportMean === transportMean ? "info" : "white"}
                            onClick={() => handleTransportChange(transportMean)}
                        >
                            <i className={ transportMeanIcons[transportMean] }></i>
                        </Button>
                    ))}
                </ButtonGroup>

                <Dropdown onSelect={ handleSelectPathwayType } className="mt-3">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        { selection }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {options.map((option, index) =>
                            <Dropdown.Item eventKey={option} key={index}>{option}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>

                {
                    pathwayTransportMean === PathwayTransportMeans.VEHICLE
                    ?   <>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    id="selectedVehicle"
                                    type="text"
                                    name="selectedVehicle"
                                    value={selectedVehicle.name || 'No vehículo seleccionado'}
                                    readOnly={true}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-info"
                                            onClick={handleShowVehicles}>
                                        <i className="fa fa-info-circle"></i>
                                    </button>
                                </div>
                            </div>
                        </>
                        : <></>
                }

                {
                    (distance > 0 && duration > 0)
                        ? <>
                            <h3>Costes de la ruta</h3>
                            <hr/>
                            <ul className="list-group">
                                <li className="list-group-item">Distancia: {(distance / 1000).toFixed(4)} km</li>
                                <li className="list-group-item">Duración: {Math.floor(duration / 3600) } horas y { Math.round((duration % 3600) / 60) } minutos</li>
                                <li className="list-group-item">Coste: {
                                    pathwayCost.toFixed(2)
                                } {
                                    pathwayTransportMean === PathwayTransportMeans.VEHICLE ? '€' : 'cal'
                                }</li>
                            </ul>
                        </>
                        : <></>
                }

            </div>
        </div>
    )

}
