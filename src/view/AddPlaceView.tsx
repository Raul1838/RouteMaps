import React, { useState } from "react";
import PlacesViewModel from "../viewModel/PlacesViewModel";
import { Coords } from "../interfaces/Coords";

interface AddPlaceComponentProps {
    placesViewModel: PlacesViewModel;
}

const AddPlaceComponent = ({ placesViewModel }: AddPlaceComponentProps) => {
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [resultado, setResultado] = useState('');

    const handleAddPlace = async () => {
        try {
            const coordenadas = { Latitud: parseFloat(latitud), Longitud: parseFloat(longitud) };
            const result = await placesViewModel.addPlaceByCoords(coordenadas);
            setResultado(result ? 'Lugar añadido con éxito' : 'Error al añadir lugar');
        } catch (error) {
            console.error('Error:', error);
            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Añadir un Nuevo Lugar</h1>
            <input
                type="number"
                value={latitud}
                onChange={(e) => setLatitud(e.target.value)}
                placeholder="Latitud"
            />
            <input
                type="number"
                value={longitud}
                onChange={(e) => setLongitud(e.target.value)}
                placeholder="Longitud"
            />
            <button onClick={handleAddPlace}>Añadir Lugar</button>
            <div>{resultado}</div>
        </div>
    );
};

export default AddPlaceComponent;
