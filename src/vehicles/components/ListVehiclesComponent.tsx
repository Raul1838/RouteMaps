import React, {useContext, useEffect, useState} from 'react';
import Vehicle from '../../interfaces/Vehicle';
import {useNavigate} from "react-router-dom";
import {Button, Form, Table} from "react-bootstrap";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import VehiclesController, {getVehiclesController} from '../../controller/VehiclesController.ts';
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";


interface VehiclesListProps {
    showCrudOptions?: boolean;
}

export const ListVehiclesComponent: React.FC<VehiclesListProps> = ({ showCrudOptions = true }) => {

    const navigate = useNavigate();
    const { user, defaultVehiclePlate, setDefaultVehiclePlate }: AuthContextInterface = useContext(AuthContext);
    const { setShowVehicles, setVehicle }: NavigationContextInterface = useContext(NavigationContext);

    const vehiclesController: VehiclesController = getVehiclesController();

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [filterFavorites, setFilterFavorites] = useState(false);


    useEffect(() => {
        if( vehicles.length === 0 ) {
            vehiclesController.getVehicles(user.uid).then(vehicles => setVehicles([...vehicles]) );
        }

        return () => {
            saveVehiclesOnExit();
        }
    }, []);

    const saveVehiclesOnExit = async() => {
        await vehiclesController.updateVehicles(vehicles, user.uid);
    }

    const toggleFavorite = (vehicle: Vehicle) => {
        vehiclesController.toggleFavourite(vehicle.plate, user.uid);
        vehicle.favorite = !vehicle.favorite;
        setVehicles([...vehicles]);
    };

    const toggleDefault = (vehicle: Vehicle) => {
        vehiclesController.setDefaultVehicle(vehicle.plate, user.uid).then(() => {
            setDefaultVehiclePlate(vehicle.plate);
        });
    };

    const goToDetails = (selectedVehicle: Vehicle) => {
        if( !showCrudOptions ) {
            setVehicle(selectedVehicle);
            setShowVehicles(false);
            return;
        }
        navigate(`/vehicles/modifyVehicle/${selectedVehicle.plate}`);
    };

    const deleteVehicle = (vehicle: Vehicle) => {
        vehiclesController.deleteVehicle(vehicle, user.uid).then(() => {
            setVehicles(vehicles.filter(v => v.plate !== vehicle.plate));
        });
    }

    return (
        <>
        <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Filtrar por favoritos"
                    checked={filterFavorites}
                    onChange={() => setFilterFavorites(!filterFavorites)}
                />
            </Form>
            {
                vehicles.length === 0
                    ? <p>No hay lugares guardados</p>
                    :   <>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                {
                                    showCrudOptions
                                    ?   <>
                                            <th className="col-9"></th>
                                            <th className="col-1"></th>
                                            <th className="col-1"></th>
                                            <th className="col-1"></th>
                                        </>
                                    :   <>
                                            <th className="col-10"></th>
                                            <th className="col-2"></th>
                                        </>
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                vehicles
                                    .filter(vehicle => !filterFavorites || vehicle.favorite)
                                    .map((vehicle, index) => (
                                        <tr key={index} onClick={() => goToDetails(vehicle)}>
                                            <td>{vehicle.plate}</td>
                                            <td className="text-center">
                                                <Button disabled={ !showCrudOptions } variant={vehicle.favorite ? "warning" : "outline-warning"} onClick={(e) => {e.stopPropagation(); toggleFavorite(vehicle);}}>
                                                    <i className={'fas fa-star'}></i>
                                                </Button>
                                            </td>
                                            {
                                                showCrudOptions &&
                                                <>
                                                    <td className="text-center">
                                                        <Button variant={ vehicle.plate === defaultVehiclePlate ? "info" : 'outline-info'} onClick={(e) => {e.stopPropagation(); toggleDefault(vehicle);}}>
                                                            <i className={'fas fa-check'}></i>
                                                        </Button>
                                                    </td>
                                                    <td className="text-center">
                                                        <Button variant={'outline-danger'} onClick={(e) => {e.stopPropagation(); deleteVehicle(vehicle);}}>
                                                            <i className={'fas fa-trash'}></i>
                                                        </Button>
                                                    </td>
                                                </>
                                            }
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </>
            }
        </>
    );
};
