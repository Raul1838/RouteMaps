import { useState, useEffect } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import Vehicle from '../../interfaces/Vehicle';
import EmptyVehiclesException from '../../exceptions/EmptyVehiclesException';
import {MainLayout} from "../../layouts/MainLayout.tsx";
import { Link } from "react-router-dom";
import FavoriteStar from '../../components/FavoriteStar.tsx';



interface ListVehiclesComponentProps {
    vehiclesViewModel: VehiclesViewModel;
}

export const ListVehiclesComponent = ({ vehiclesViewModel }: ListVehiclesComponentProps) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const loadedVehicles = await vehiclesViewModel.getVehicles();
                setVehicles(loadedVehicles);
            } catch (e) {
                if (e instanceof EmptyVehiclesException) {
                    setError("No hay vehículos disponibles");
                } else {
                    setError("Error al cargar los vehículos");
                }

            }
        };

        fetchVehicles();
    }, [vehiclesViewModel]);

    const toggleVehicleFavorite = async (vehiclePlate: string) => {
        try {
            await vehiclesViewModel.toggleFavourite(vehiclePlate);

            const updatedVehicles = vehiclesViewModel.getVehicles();
            setVehicles(updatedVehicles);
    
        } catch (error) {
            console.error('Error al cambiar el estado de favorito', error);
        }
    };
    

    return (
        <MainLayout>
            <div>
                <h1>Vehículos disponibles</h1>
                {error && <div>{error}</div>}
                {vehicles.length === 0 ? (
                    <div>No hay vehículos añadidos</div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Matrícula</th>
                                    <th>Nombre</th>
                                    <th>Propulsión</th>
                                    <th>Consumo</th>
                                    <th>Favorito</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map(vehicle => (
                                    <tr key={vehicle.plate}>
                                        <td>{vehicle.plate}</td>
                                        <td>{vehicle.name}</td>
                                        <td>{vehicle.propulsion}</td>
                                        <td>{vehicle.consumption}</td>
                                        <td>
                                            <FavoriteStar
                                                isFavorite={vehicle.favorite || false}
                                                onToggle={() => toggleVehicleFavorite(vehicle.plate)}
                                            />
                                        </td>
                                        <td>
                                            <Link to={`/vehicles/modifyVehicle/${vehicle.plate}`} className="btn btn-primary btn-sm mx-1">Edit</Link>
                                            <Link to={`/vehicles/deleteVehicle/${vehicle.plate}`} className="btn btn-danger btn-sm mx-1">Delete</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </MainLayout>
    );
    
};
