import React, { useState } from 'react';
import VehiclesViewModel from '../../viewModel/VehiclesViewModel';
import Vehicle from '../../interfaces/Vehicle';
import Combustible from '../../enums/Combustible';

interface AddVehicleComponentProps {
    vehiclesViewModel: VehiclesViewModel;
}

const AddVehicleComponent = ({ vehiclesViewModel }: AddVehicleComponentProps) => {
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [propulsion, setPropulsion] = useState('');
    const [consumo, setConsumo] = useState('');
    const [favorito, setFavorito] = useState(false);
    const [defecto, setDefecto] = useState(false);
    const [resultado, setResultado] = useState('');

    const isValidVehicle = () => {
        if (isNaN(parseInt(id)) || nombre.trim() === '' || isNaN(parseFloat(consumo))) {
            setResultado('Error: Entrada inválida');
            return false;
        }
        return true;
    };

    const handleAddVehicle = async () => {
        if (!isValidVehicle()) {
            return;
        }

        try {
            const newVehicle: Vehicle = {
                id: parseInt(id),
                Nombre: nombre,
                propulsion: propulsion as Combustible,
                consumo: parseFloat(consumo),
                Favorito: favorito,
                Defecto: defecto
            };
            const result = await vehiclesViewModel.addVehicle(newVehicle);
            setResultado(result ? 'Vehículo añadido con éxito' : 'Error al añadir vehículo');
        } catch (error) {

            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Añadir Vehículo</h1>
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
            <select
                value={propulsion}
                onChange={(e) => setPropulsion(e.target.value)}
            >
                {Object.values(Combustible).map((tipo, index) => (
                    <option key={index} value={tipo}>{tipo}</option>
                ))}
            </select>
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
            <button onClick={handleAddVehicle}>Añadir Vehículo</button>
            <div>{resultado}</div>
        </div>
    );
};

export default AddVehicleComponent;
