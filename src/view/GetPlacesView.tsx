import React, { useState, useEffect } from "react";
import PlacesViewModel from "../viewModel/PlacesViewModel";
import Place from "../interfaces/Place";

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
            console.error(e);
        }
    }, [placesViewModel]);

    return (
        <div>
            <h1>Lugares Disponibles</h1>
            {error && <div>Error: {error}</div>}
            <ul>
                {places.map((place, index) => (
                    <li key={index}>{place.Nombre}</li>
                ))}
            </ul>
        </div>
    );
};

export default PlacesComponent;
