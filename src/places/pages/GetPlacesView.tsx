import React, { useState, useEffect } from "react";
import PlacesViewModel from "../viewModel/PlacesViewModel";
import Place from "../../interfaces/Place";
import { Link } from "react-router-dom";
import {MainLayout} from "../../layouts/MainLayout.tsx";

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
        <MainLayout>
            <div>
                <h1>Lugares disponibles</h1>
                {error && <div>Error: {error}</div>}
                <ul>
                    {places.map((place, index) => (
                        <li key={index}>{place.Nombre}</li>
                    ))}
                </ul>
                <Link to={'/places/addPlaceByToponym'}>Añadir lugar por topónimo</Link>
                <Link to={'/places/addPlaceByCoords'}>Añadir lugar por coordenadas</Link>
            </div>
        </MainLayout>
    );
};

export default PlacesComponent;