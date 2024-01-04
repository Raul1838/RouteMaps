import React, { useState, useEffect, useContext } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import Vehicle from '../../interfaces/Vehicle';
import EmptyVehiclesException from '../../exceptions/EmptyVehiclesException';
import { MainLayout } from "../../layouts/MainLayout.tsx";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import {AuthContext, AuthContextInterface} from "../../context/AuthContext.tsx";
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import VehiclesController, { getVehiclesController } from '../../controller/VehiclesController.ts';



interface VehiclesListProps {
    showCrudOptions?: boolean;
}

export const ListVehiclesComponent: React.FC<VehiclesListProps> = ({ showCrudOptions = true }) => {

    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const { user }: AuthContextInterface = useContext(AuthContext);

    const vehiclesController: VehiclesController = getVehiclesController();

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
        await vehiclesController.setVehicles(vehicles, user.uid);
    }

    const toggleFavorite = (vehicle: Vehicle) => {
        vehiclesController.toggleFavourite(vehicle.plate, user.uid);
        vehicle.favorite = !vehicle.favorite;
        setVehicles([...vehicles]);
    };

    const goToDetails = (vehiclePlate: string) => {
        navigate(`/vehicles/modifyVehicle/${vehiclePlate}`);
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
                                <th className="col-10"></th>
                                {
                                    showCrudOptions
                                    ?   <>
                                            <th className="col-1"></th>
                                            <th className="col-1"></th>
                                        </>
                                    :   <th className="col-2"></th>
                                }
                                <th className="col-1"></th>
                                <th className="col-1"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                vehicles
                                    .filter(vehicle => !filterFavorites || vehicle.favorite)
                                    .map((vehicle, index) => (
                                        <tr key={index} onClick={() => goToDetails(vehicle.plate)}>
                                            <td>{vehicle.plate}</td>
                                            <td className="text-center">
                                                <Button disabled={ !showCrudOptions } variant={vehicle.favorite ? "warning" : "outline-warning"} onClick={(e) => {e.stopPropagation(); toggleFavorite(vehicle);}}>
                                                    <i className={'fas fa-star'}></i>
                                                </Button>
                                            </td>
                                            {
                                                showCrudOptions &&
                                                <td className="text-center">
                                                    <Button variant={'outline-danger'} onClick={(e) => {e.stopPropagation(); deleteVehicle(vehicle);}}>
                                                        <i className={'fas fa-trash'}></i>
                                                    </Button>
                                                </td>
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
