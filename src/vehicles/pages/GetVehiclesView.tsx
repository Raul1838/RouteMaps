import React, { useState, useEffect } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import Vehicle from '../../interfaces/Vehicle';
import EmptyVehiclesException from '../../exceptions/EmptyVehiclesException';
import { Link } from "react-router-dom";


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
                    <li key={vehicle.plate}>
                        {vehicle.name} - Propulsión: {vehicle.propulsion},
                        Consumo: {vehicle.consumption},
                        Favorito: {vehicle.favorite ? 'Sí' : 'No'},
                        Defecto: {vehicle.Defecto ? 'Sí' : 'No'}
                    </li>
                ))}
            </ul>
            <Link to={'/vehicles/addVehicles'}>Añadir vehículo</Link>
        </div>
    );
};

export default GetVehiclesComponent;
