import {Coords} from "../interfaces/Coords.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";
import React, {useState} from "react";
import {PathwayTransportMeans} from "../enums/PathwayTransportMeans.ts";
import Vehicle from "../interfaces/Vehicle.ts";
import Combustible from "../enums/Combustible.ts";

export interface NavigationContextInterface {
    from: Coords;
    setFrom(coords: Coords): void;
    to: Coords;
    setTo(coords: Coords): void;
    pathwayTransportMean: PathwayTransportMeans,
    setPathwayTransportMean(pathwayTransportMean: PathwayTransportMeans): void,
    pathwayType: PathwayTypes;
    setPathwayType(pathwayType: PathwayTypes): void;
    distance: number;
    setDistance(distance: number): void;
    duration: number;
    setDuration(duration: number): void;
    showSavedPlaces: boolean;
    setShowSavedPlaces(showSavedPlaces: boolean): void;
    fieldInSelection: string;
    setFieldInSelection(fieldInSelection: string): void;
    showVehicles: boolean;
    setShowVehicles(showVehicles: boolean): void;
    vehicle: Vehicle,
    setVehicle(vehicle: Vehicle): void;
    codifiedPath: string;
    setCodifiedPath(codifiedPath: string): void;
    cost: number;
    setCost(cost: number): void;
}

export const NavigationContext = React.createContext<NavigationContextInterface>({
    from: {lat: 0, lon: 0, name: ''},
    setFrom: () => {},
    to: {lat: 0, lon: 0, name: ''},
    setTo: () => {},
    pathwayTransportMean: PathwayTransportMeans.VEHICLE,
    setPathwayTransportMean: () => {},
    pathwayType: PathwayTypes.RECOMMENDED,
    setPathwayType: () => {},
    distance: 0,
    setDistance: () => {},
    duration: 0,
    setDuration: () => {},
    showSavedPlaces: false,
    setShowSavedPlaces: () => {},
    fieldInSelection: '',
    setFieldInSelection: () => {},
    showVehicles: false,
    setShowVehicles: () => {},
    vehicle: { name: '', plate: '', propulsion: Combustible.Gasolina, consumption: 0, favorite: false },
    setVehicle: () => {},
    codifiedPath: '',
    setCodifiedPath: () => {},
    cost: 0,
    setCost: () => {},
});

export const NavigationProvider = ({children}: { children: React.ReactNode }) => {

    const [from, setFrom] = useState<Coords>({ lat: 0, lon: 0, name: '' });
    const [to, setTo] = useState<Coords>({ lat: 0, lon: 0, name: '' });
    const [pathwayTransportMean, setPathwayTransportMean] = useState<PathwayTransportMeans>(PathwayTransportMeans.VEHICLE);
    const [pathwayType, setPathwayType] = useState<PathwayTypes>(PathwayTypes.RECOMMENDED);
    const [distance, setDistance] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [showSavedPlaces, setShowSavedPlaces] = useState<boolean>(false);
    const [fieldInSelection, setFieldInSelection] = useState<string>('');
    const [showVehicles, setShowVehicles] = useState<boolean>(false);
    const [vehicle, setVehicle] = useState<Vehicle>({ name: '', plate: '', propulsion: Combustible.Gasolina, consumption: 0, favorite: false });
    const [codifiedPath, setCodifiedPath] = useState<string>('');
    const [cost, setCost] = useState<number>(0);

    const value: NavigationContextInterface = {
        from,
        setFrom,
        to,
        setTo,
        pathwayTransportMean,
        setPathwayTransportMean,
        pathwayType,
        setPathwayType,
        distance,
        setDistance,
        duration,
        setDuration,
        showSavedPlaces,
        setShowSavedPlaces,
        fieldInSelection,
        setFieldInSelection,
        showVehicles,
        setShowVehicles,
        vehicle,
        setVehicle,
        codifiedPath,
        setCodifiedPath,
        cost,
        setCost
    };

    return (
        <>
            <NavigationContext.Provider value={value}>
                { children }
            </NavigationContext.Provider>
        </>
    );
}
