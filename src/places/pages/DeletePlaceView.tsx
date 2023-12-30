import React, { useState } from 'react';
import PlacesViewModel from '../viewModel/PlacesViewModel';
import Place from '../../interfaces/Place';

interface DeletePlacesViewProps {
    placesViewModel: PlacesViewModel;
}

const DeletePlacesView = ({ placesViewModel }: DeletePlacesViewProps) => {
    const [nombre, setNombre] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [resultado, setResultado] = useState('');

    const isValidCoordinate = (value: string, min: number, max: number) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    };

    const handleDeletePlace = async () => {
        if (!isValidCoordinate(latitud, -90, 90) || !isValidCoordinate(longitud, -180, 180)) {
            setResultado('Error: Latitud o Longitud inválida.');
            return;
        }

        try {
            const placeToDelete: Place = {
                Nombre: nombre,
                Latitud: parseFloat(latitud),
                Longitud: parseFloat(longitud),
                Favorito: false
            };
            const result = await placesViewModel.deletePlace(placeToDelete);
            setResultado(result ? 'Lugar eliminado con éxito.' : 'Error al eliminar lugar.');
        } catch (error) {

            if (error instanceof Error) {
                setResultado('Error al procesar la solicitud: ' + error.message);
            } else {
                setResultado('Error al procesar la solicitud.');
            }
        }
    };

    return (
        <div>
            <h1>Eliminar Lugar</h1>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del Lugar"
            />
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
            <button onClick={handleDeletePlace}>Eliminar Lugar</button>
            <div>{resultado}</div>
        </div>
    );
};

export default DeletePlacesView;
