import React, { useState, useEffect } from 'react';
import VehiclesViewModel from '../../viewModel/VehiclesViewModel';
import Vehicle from '../../interfaces/Vehicle';
import EmptyVehiclesException from '../../exceptions/EmptyVehiclesException';

interface GetVehiclesComponentProps {
    vehiclesViewModel: VehiclesViewModel;
}

const GetVehiclesComponent = ({ vehiclesViewModel }: GetVehiclesComponentProps) => {
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
        <div>
            <h1>Vehículos disponibles</h1>
            {error && <div>Error: {error}</div>}
            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle.id}>
                        {vehicle.Nombre} - Propulsión: {vehicle.propulsion},
                        Consumo: {vehicle.consumo},
                        Favorito: {vehicle.Favorito ? 'Sí' : 'No'},
                        Defecto: {vehicle.Defecto ? 'Sí' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetVehiclesComponent;
