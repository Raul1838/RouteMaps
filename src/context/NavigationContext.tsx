import {Coords} from "../interfaces/Coords.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";
import React, {useState} from "react";
import {PathwayTransportMeans} from "../enums/PathwayTransportMeans.ts";

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
}

export const NavigationContext = React.createContext<NavigationContextInterface>({
    from: {lat: 0, lon: 0},
    setFrom: () => {},
    to: {lat: 0, lon: 0},
    setTo: () => {},
    pathwayTransportMean: PathwayTransportMeans.VEHICLE,
    setPathwayTransportMean: () => {},
    pathwayType: PathwayTypes.UNDEFINED,
    setPathwayType: () => {},
    distance: 0,
    setDistance: () => {},
    duration: 0,
    setDuration: () => {}
});

export const NavigationProvider = ({children}: { children: React.ReactNode }) => {

    const [from, setFrom] = useState<Coords>({ lat: 0, lon: 0 });
    const [to, setTo] = useState<Coords>({ lat: 0, lon: 0 });
    const [pathwayTransportMean, setPathwayTransportMean] = useState<PathwayTransportMeans>(PathwayTransportMeans.VEHICLE);
    const [pathwayType, setPathwayType] = useState<PathwayTypes>(PathwayTypes.UNDEFINED);
    const [distance, setDistance] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

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
        setDuration
    };

    return (
        <>
            <NavigationContext.Provider value={value}>
                { children }
            </NavigationContext.Provider>
        </>
    );
}
