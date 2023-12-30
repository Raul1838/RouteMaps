import React, { useState } from "react";
import PlacesViewModel from "../viewModel/PlacesViewModel";
import { Coords } from "../../interfaces/Coords";
import { Link } from "react-router-dom";

interface AddPlaceByCoordsComponentProps {
    placesViewModel: PlacesViewModel;
}

const AddPlaceByCoordsComponent = ({ placesViewModel }: AddPlaceByCoordsComponentProps) => {
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [resultado, setResultado] = useState('');

    const handleAddPlace = async () => {
        try {
            const coordenadas = { Latitud: parseFloat(latitud), Longitud: parseFloat(longitud) };
            const result = await placesViewModel.addPlaceByCoords(coordenadas);
            setResultado(result ? 'Lugar añadido con éxito' : 'Error al añadir lugar');
        } catch (error) {
            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Añadir un nuevo lugar por coordenadas</h1>
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


            <Link to={'/places/getPlaces'}>Ver</Link>
        </div>
    );
};

export default AddPlaceByCoordsComponent;
