import React, { useState } from 'react';
import PlacesViewModel from '../../viewModel/PlacesViewModel';

interface AddPlaceByToponymComponentProps {
    placesViewModel: PlacesViewModel;
}

const AddPlaceByToponymComponent = ({ placesViewModel }: AddPlaceByToponymComponentProps) => {
    const [toponym, setToponym] = useState('');
    const [resultado, setResultado] = useState('');

    const handleAddPlace = async () => {
        try {
            const result = await placesViewModel.addPlaceByToponym(toponym);
            setResultado(result ? 'Lugar añadido con éxito' : 'Error al añadir lugar');
        } catch (error) {

            setResultado('Error al procesar la solicitud');
        }
    };

    return (
        <div>
            <h1>Añadir un lugar por topónimo</h1>
            <input
                type="text"
                value={toponym}
                onChange={(e) => setToponym(e.target.value)}
                placeholder="Nombre del Lugar"
            />
            <button onClick={handleAddPlace}>Añadir Lugar</button>
            <div>{resultado}</div>
        </div>
    );
};

export default AddPlaceByToponymComponent;
