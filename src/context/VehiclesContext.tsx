import Vehicle from "../interfaces/Vehicle.ts";
import React from "react";

export interface VehiclesContextInterface {
    vehicles: Vehicle[],
    setVehicles: (vehicles: Vehicle[]) => void,
}

export const VehiclesContext = React.createContext<VehiclesContextInterface>({
    vehicles: [],
    setVehicles: () => { },
});

export const VehiclesProvider = ({ children }: { children: React.ReactNode }) => {
    const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);

    const value: VehiclesContextInterface = {
        vehicles,
        setVehicles
    };

    return (
        <VehiclesContext.Provider value={value}>
            { children }
        </VehiclesContext.Provider>
    );
}
