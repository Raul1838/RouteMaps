import { useState, useEffect } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import Vehicle from '../../interfaces/Vehicle';
import EmptyVehiclesException from '../../exceptions/EmptyVehiclesException';
import {MainLayout} from "../../layouts/MainLayout.tsx";


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
                            <i className={vehicle.favorite ? 'fas fa-star' : 'far fa-star'}></i>
                        </li>
                    ))}
                </ul>
            </div>
        </MainLayout>
    );
    
};
