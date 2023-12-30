import {Map, Marker} from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useContext, useEffect, useRef} from 'react';
import {NavigationContext, NavigationContextInterface} from "../../context/NavigationContext.tsx";
import {getPathwayController, PathwayController} from "../../controller/PathwayController.ts";
import {Coords} from "../../interfaces/Coords.ts";
import polyline from '@mapbox/polyline';

export const InteractiveMap = () => {
    const navigationContext : NavigationContextInterface = useContext(NavigationContext);
    const { from, to, pathwayTransportMean, pathwayType } = navigationContext;

    const mapDiv = useRef<HTMLDivElement>(null);
    const map = useRef<Map>({} as Map);
    const markers = useRef<Marker[]>([]);

    useEffect(() => {
        if (mapDiv.current) {
            mapDiv.current.innerHTML = '';
        }
        map.current = new Map({
            container: mapDiv.current!,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [ -3.703790, 40.416775 ],
            zoom: 6,
        });
    }, []);

    useEffect(() => {
        drawPathwayBetween(from, to);
    }, [from, to, pathwayTransportMean]);

    const drawPathwayBetween = async (from: Coords, to: Coords) => {
        if ( map.current && from && to && from.lon !== to.lon && from.lat !== to.lat ) {
            const pathwayController: PathwayController = getPathwayController();
            const pathway = await pathwayController.calculatePathway(from, to, pathwayTransportMean, pathwayType);
            navigationContext.setDistance(pathway.distance);
            navigationContext.setDuration(pathway.duration);

            const decodedPath: [number, number][] = polyline.decode(pathway.codifiedPath).map(coordinate => [coordinate[1], coordinate[0]]);

            if (map.current.isStyleLoaded()) {
                // Elimina los marcadores existentes
                markers.current.forEach(marker => marker.remove());
                markers.current = [];

                const startMarker = new Marker()
                    .setLngLat(decodedPath[0])
                    .addTo(map.current);
                markers.current.push(startMarker);

                map.current.flyTo({
                    center: decodedPath[0],
                    zoom: 10
                });

                // Comprueba y elimina la capa de la ruta y su fuente si existen
                if (map.current.getLayer('route')) {
                    map.current.removeLayer('route');
                    map.current.removeSource('route');
                }

                map.current.addSource('route', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': decodedPath
                        }
                    }
                });

                map.current.addLayer({
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#0632fa',
                        'line-width': 8
                    }
                });

                // Añade un marcador diferente al final de la ruta
                const endMarker = new Marker({ color: '#F00' })  // El marcador es de color rojo
                    .setLngLat(decodedPath[decodedPath.length - 1])
                    .addTo(map.current);
                markers.current.push(endMarker);
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
