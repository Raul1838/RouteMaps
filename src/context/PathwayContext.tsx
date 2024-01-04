import {Pathway} from "../interfaces/Pathway.ts";
import React, {useState} from "react";
import {PathwayTypes} from "../enums/PathwayTypes.ts";
import {PathwayTransportMeans} from "../enums/PathwayTransportMeans.ts";

export interface PathwayContextInterface {
    pathways: Pathway[],
    setPathways: (pathways: Pathway[]) => void,
    loadedPathway: Pathway,
    setLoadedPathway: (loadedPathway: Pathway) => void,
}

export const PathwayContext = React.createContext<PathwayContextInterface>({
    pathways: [],
    setPathways: () => {},
    loadedPathway: {
        type: PathwayTypes.UNDEFINED,
        start: {
            lon: 0,
            lat: 0,
        },
        end: {
            lon: 0,
            lat: 0,
        },
        codifiedPath: '',
        duration: 0,
        distance: 0,
        favourite: false,
        transportMean: PathwayTransportMeans.VEHICLE,
        cost: 0,
    },
    setLoadedPathway: () => {},
});

export const PathwayProvider = ({ children }: { children: React.ReactNode }) => {
    const [pathways, setPathways] = useState<Pathway[]>([]);
    const [loadedPathway, setLoadedPathway] = useState<Pathway>({
        type: PathwayTypes.UNDEFINED,
        start: {
            lon: 0,
            lat: 0,
        },
        end: {
            lon: 0,
            lat: 0,
        },
        codifiedPath: '',
        duration: 0,
        distance: 0,
        favourite: false,
        transportMean: PathwayTransportMeans.VEHICLE,
        cost: 0,
    });


    const value: PathwayContextInterface = {
        pathways,
        setPathways,
        loadedPathway,
        setLoadedPathway,
    };

    return (
        <PathwayContext.Provider value={value}>
            { children }
        </PathwayContext.Provider>
    );
}
