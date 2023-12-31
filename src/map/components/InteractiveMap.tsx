import {Map} from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useContext, useEffect, useRef} from 'react';
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import {getPathwayController, PathwayController} from "../../controller/PathwayController.ts";
import {Coords} from "../../interfaces/Coords.ts";

export const InteractiveMap = () => {
    const navigationContext : NavigationContextInterface = useContext(NavigationContext);
    const { from, to, pathwayTransportMean, pathwayType } = navigationContext;

    const mapDiv = useRef<HTMLDivElement>(null);
    const map = useRef<Map>({} as Map);

    useEffect(() => {
        map.current = new Map({
            container: mapDiv.current!,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [ -3.703790, 40.416775 ],
            zoom: 6,
        });
    }, []);

    useEffect(() => {
        drawPathwayBetween(from, to);
    }, [from, to]);

    const drawPathwayBetween = async ( from: Coords, to: Coords ) => {
        if (map.current && from && to) {
            const pathwayController: PathwayController = getPathwayController();
            const pathway = await pathwayController.calculatePathway(from, to, pathwayTransportMean, pathwayType);
            navigationContext.setDistance(pathway.distance);
            navigationContext.setDuration(pathway.duration);

            if (map.current.isStyleLoaded()) {
                pathway.path.features.forEach((feature, index) => {
                    const routeId = `route${index}`;

                    if (map.current.getLayer(routeId)) {
                        map.current.removeLayer(routeId);
                        map.current.removeSource(routeId);
                    }

                    map.current.addSource(routeId, {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': {
                                type: 'LineString',
                                coordinates: feature.geometry.coordinates
                            }
                        }
                    });

                    map.current.addLayer({
                        'id': routeId,
                        'type': 'line',
                        'source': routeId,
                        'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        'paint': {
                            'line-color': '#0632fa',
                            'line-width': 8
                        }
                    });
                });
            }
        }
    }


    return(
        <div
            ref={ mapDiv }
            style={{
                position: 'fixed',
                height: '100vh',
                left: 0,
                top: 0,
                width: '100vw',
                zIndex: -1,
            }}
        >
        </div>
    )

}
