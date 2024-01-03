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
                {error && <div>Error: {error}</div>}
                <ul>
                    {vehicles.map(vehicle => (
                        <li key={vehicle.plate}>
                            {vehicle.name} - Propulsión: {vehicle.propulsion},
                            Consumo: {vehicle.consumption},
                            <FavoriteStar
                                isFavorite={vehicle.favorite || false}
                                onToggle={() => toggleVehicleFavorite(vehicle.plate)}
                            />
                            <Link to={`/vehicles/modifyVehicle/${vehicle.plate}`}>Edit</Link>
                            <Link to={`/vehicles/deleteVehicle/${vehicle.plate}`}>Delete</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    );
    
};
