import {Pathway} from "../interfaces/Pathway.ts";
import React, {useState} from "react";

export interface PathwayContextInterface {
    pathways: Pathway[],
    setPathways: (pathways: Pathway[]) => void,
}

export const PathwayContext = React.createContext<PathwayContextInterface>({
    pathways: [],
    setPathways: () => { },
});

export const PathwayProvider = ({ children }: { children: React.ReactNode }) => {
    const [pathways, setPathways] = useState<Pathway[]>([]);

    const value: PathwayContextInterface = {
        pathways,
        setPathways
    };

    return (
        <PathwayContext.Provider value={value}>
            { children }
        </PathwayContext.Provider>
    );
}
