import Place from "../interfaces/Place.ts";
import React from "react";

export interface PlacesContextInterface {
    places: Place[],
    setPlaces: (places: Place[]) => void,
}

export const PlacesContext = React.createContext<PlacesContextInterface>({
    places: [],
    setPlaces: () => { },
});

export const PlacesProvider = ({ children }: { children: React.ReactNode }) => {
    const [places, setPlaces] = React.useState<Place[]>([]);

    const value: PlacesContextInterface = {
        places,
        setPlaces
    };

    return (
        <PlacesContext.Provider value={value}>
            { children }
        </PlacesContext.Provider>
    );
}
