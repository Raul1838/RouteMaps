import React, { useState } from 'react';
import VehiclesViewModel from '../../viewModel/VehiclesViewModel';

interface DeleteVehicleViewProps {
    vehiclesViewModel: VehiclesViewModel;
}

const DeleteVehicleView = ({ vehiclesViewModel }: DeleteVehicleViewProps) => {
    const [id, setId] = useState('');
    const [resultado, setResultado] = useState('');

    const handleDeleteVehicle = async () => {
        try {
            const result = await vehiclesViewModel.deleteVehicle(parseInt(id));
            setResultado(result ? 'Vehículo eliminado con éxito' : 'Error al eliminar vehículo');
        } catch (error) {

            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Eliminar vehículo</h1>
            <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="ID del Vehículo"
            />
            <button onClick={handleDeleteVehicle}>Eliminar Vehículo</button>
            <div>{resultado}</div>
        </div>
    );
};

export default DeleteVehicleView;
