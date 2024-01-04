import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import {PathwayTransportMeans} from "../../enums/PathwayTransportMeans.ts";
import {PathwayTypes} from "../../enums/PathwayTypes.ts";
import {useContext, useEffect, useState} from "react";
import Vehicle from "../../interfaces/Vehicle.ts";
import Combustible from "../../enums/Combustible.ts";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import VehiclesController, {getVehiclesController} from "../../controller/VehiclesController.ts";
import {PathwayContext, PathwayContextInterface} from "../../context/PathwayContext.tsx";
import PathwayController, {getPathwayController} from "../../controller/PathwayController.ts";

const options: PathwayTypes[] = Object.values(PathwayTypes).filter((value) => value !== PathwayTypes.UNDEFINED);

export const PathwayDetails = () => {

    const authContext: AuthContextInterface = useContext(AuthContext);
    const { user, defaultPathwayType, defaultVehiclePlate } = authContext;

    const navigationContext : NavigationContextInterface = useContext(NavigationContext);
    const { distance, duration, pathwayTransportMean, vehicle, showVehicles} = navigationContext;

    const { loadedPathway }: PathwayContextInterface = useContext(PathwayContext);

    const pathwayController: PathwayController = getPathwayController();
    const vehiclesController: VehiclesController = getVehiclesController();

    const [selectedPathwayType, setSelectedPathwayType] = useState<PathwayTypes>(defaultPathwayType);
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
            vehiclesController.getVehicle(defaultVehiclePlate, user.uid).then((vehicle) => {
                setSelectedVehicle(vehicle);
            });
        }
        if( loadedPathway.type !== PathwayTypes.UNDEFINED ) setSelectedPathwayType(loadedPathway.type);
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
        navigationContext.setCost(pathwayCost);
    }

    const handleTransportChange = (transportMean: PathwayTransportMeans) => {
        navigationContext.setPathwayTransportMean(transportMean);
    }

    const handleSelectPathwayType = ( eventKey: string | null ) => {
        if( eventKey ) {
            setSelectedPathwayType(eventKey as PathwayTypes);
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
        <>
            <ButtonGroup aria-label="Transport means">
                {Object.values(PathwayTransportMeans).map((transportMean) => (
                    <Button
                        key={transportMean}
                        variant={pathwayTransportMean === transportMean ? "info" : "white"}
                        onClick={() => handleTransportChange(transportMean)}
                    >
                        <i className={transportMeanIcons[transportMean]}></i>
                    </Button>
                ))}
            </ButtonGroup>

            <Dropdown onSelect={handleSelectPathwayType} className="mt-3">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    {selectedPathwayType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {options.map((option, index) =>
                        <Dropdown.Item eventKey={option} key={index}>{option}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>

            {
                pathwayTransportMean === PathwayTransportMeans.VEHICLE
                    ? <>
                        <div className="input-group mt-2 mb-2">
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
                                    {/*<i className="fas fa-car"></i>*/}
                                    <i className={ showVehicles ? 'fas fa-chevron-left' : 'fas fa-chevron-right' }></i>
                                </button>
                            </div>
                        </div>
                    </>
                    : <></>
            }

            <h3>Costes de la ruta</h3>
            <hr/>
            <ul className="list-group">
                <li className="list-group-item">Distancia: {(distance / 1000).toFixed(4)} km</li>
                <li className="list-group-item">Duración: {Math.floor(duration / 3600)} horas
                    y {Math.round((duration % 3600) / 60)} minutos
                </li>
                <li className="list-group-item">Coste: {
                    pathwayCost.toFixed(2)
                } {
                    pathwayTransportMean === PathwayTransportMeans.VEHICLE ? '€' : 'cal'
                }</li>
            </ul>
        </>
    )
}