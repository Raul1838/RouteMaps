import {Coords} from "../interfaces/Coords.ts";
import {PathwayTypes} from "../enums/PathwayTypes.ts";
import React, {useState} from "react";

export interface NavigationContextInterface {
    from: Coords;
    setFrom(coords: Coords): void;
    to: Coords;
    setTo(coords: Coords): void;
    pathwayType: PathwayTypes;
    setPathwayType(pathwayType: PathwayTypes): void;
}

export const NavigationContext = React.createContext<NavigationContextInterface>({
    from: {lat: 0, lon: 0},
    setFrom: () => {},
    to: {lat: 0, lon: 0},
    setTo: () => {},
    pathwayType: PathwayTypes.UNDEFINED,
    setPathwayType: () => {}
});

export const NavigationProvider = ({children}: { children: React.ReactNode }) => {

    const [from, setFrom] = useState<Coords>({ lat: 0, lon: 0 });
    const [to, setTo] = useState<Coords>({ lat: 0, lon: 0 });
    const [pathwayType, setPathwayType] = useState<PathwayTypes>(PathwayTypes.UNDEFINED);

    const value: NavigationContextInterface = {
        from,
        setFrom,
        to,
        setTo,
        pathwayType,
        setPathwayType
    };

    return (
        <>
            <NavigationContext.Provider value={value}>
                { children }
            </NavigationContext.Provider>
        </>
    );
}
