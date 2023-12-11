import React, { useState } from 'react';
import VehiclesViewModel from '../viewModel/VehiclesViewModel';
import Vehicle from '../interfaces/Vehicle';
import Combustible from '../enums/Combustible';

interface ModifyVehicleViewProps {
    vehiclesViewModel: VehiclesViewModel;
}

const ModifyVehicleView = ({ vehiclesViewModel }: ModifyVehicleViewProps) => {
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [propulsion, setPropulsion] = useState('');
    const [consumo, setConsumo] = useState('');
    const [favorito, setFavorito] = useState(false);
    const [defecto, setDefecto] = useState(false);
    const [resultado, setResultado] = useState('');

    const handleModifyVehicle = async () => {
        try {
            const vehicleToUpdate: Vehicle = {
                id: parseInt(id),
                Nombre: nombre,
                propulsion: propulsion as Combustible,
                consumo: parseFloat(consumo),
                Favorito: favorito,
                Defecto: defecto
            };
            const result = await vehiclesViewModel.modifyVehicle(vehicleToUpdate);
            setResultado(result ? 'Vehículo modificado con éxito' : 'Error al modificar vehículo');
        } catch (error) {
            console.error('Error:', error);
            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Modificar vehículo</h1>
            <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="ID del Vehículo"
            />
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del Vehículo"
            />
            <input
                type="text"
                value={propulsion}
                onChange={(e) => setPropulsion(e.target.value)}
                placeholder="Tipo de Propulsión"
            />
            <input
                type="number"
                value={consumo}
                onChange={(e) => setConsumo(e.target.value)}
                placeholder="Consumo"
            />
            <label>
                Favorito
                <input
                    type="checkbox"
                    checked={favorito}
                    onChange={(e) => setFavorito(e.target.checked)}
                />
            </label>
            <label>
                Defecto
                <input
                    type="checkbox"
                    checked={defecto}
                    onChange={(e) => setDefecto(e.target.checked)}
                />
            </label>
            <button onClick={handleModifyVehicle}>Modificar vehículo</button>
            <div>{resultado}</div>
        </div>
    );
};

export default ModifyVehicleView;
