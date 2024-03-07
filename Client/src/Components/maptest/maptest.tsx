import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

interface MapProps {}

export const Map: React.FC<MapProps> = () => {
    const [viewport, setViewport] = useState<any>({
        width: '100%',
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });

    const YOUR_MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9zZWNhcmxsaSIsImEiOiJjbHRmcnRud2owdDBkMmpxbHJ1Nzd1cWdxIn0.j0u3HGiM6QH2plL0sGYJnw'

    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            onViewportChange={(newViewport: any) => setViewport(newViewport)}
            mapboxApiAccessToken={YOUR_MAPBOX_TOKEN}
        />
    );
};