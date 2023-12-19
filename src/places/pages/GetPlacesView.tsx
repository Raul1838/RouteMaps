import React, { useState, useEffect } from "react";
import PlacesViewModel from "../../viewModel/PlacesViewModel";
import Place from "../../interfaces/Place";
import { Link } from "react-router-dom";

interface PlacesComponentProps {
    placesViewModel: PlacesViewModel;
}

const PlacesComponent = ({ placesViewModel }: PlacesComponentProps) => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        try {
            const loadedPlaces = placesViewModel.getPlaces();
            setPlaces(loadedPlaces);
        } catch (e) {
            setError("Error al cargar los lugares");

        }
    }, [placesViewModel]);

    return (
        <div>
            <h1>Lugares disponibles</h1>
            {error && <div>Error: {error}</div>}
            <ul>
                {places.map((place, index) => (
                    <li key={index}>{place.Nombre}</li>
                ))}
            </ul>
            <Link to={'/places/getPlacesByToponym'}>Añadir lugar por topónimo</Link>
        </div>
    );
};

export default PlacesComponent;