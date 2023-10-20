import { Map, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../interfaces/RootState';


export const RoutesMap = () => {

    const mapDiv = useRef<HTMLDivElement>(null);
    const { coordinates: [ longitud, latitud] } = useSelector( ( state: RootState ) => state.map );
    const map = useRef<Map | null>(null);

    useEffect(() => {
        map.current = new Map({
            container: mapDiv.current!, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [ -3.703790, 40.416775 ], // starting position [lng, lat]
            zoom: 6, // starting zoom
        });
    }, [])

    useEffect(() => {
        if ( isNaN(longitud) || isNaN(latitud) || !map.current) return;
        new Marker().setLngLat( [ longitud, latitud ] ).addTo( map.current );
        map.current.flyTo({
            zoom: 6,
            center: [ longitud, latitud ]
        });
    }, [ longitud, latitud ]);
   
    
    return(
        <div
            ref={ mapDiv }
            style={{
                height: '100vh',
                left: 0,
                top: 0,
                width: '75vw',
            }}
        >
        </div>
    )

}
