import React, { useEffect } from 'react';
import ReactMapGL, {
    Marker,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './pin';
import GreenPoints from  '../../assets/GreenPoints.svg'

interface Mark {
    lat: number;
    lng: number;
}

interface MapProps {
    marks: Mark[] | null;
    greenpoints: Mark[] | null;
}

const Map: React.FC<MapProps> = ({marks, greenpoints}) => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN as string;

    const [viewport, setViewport] = React.useState({
        latitude: 28.013004,
        longitude: -15.425111,
        zoom: 10,
        bearing: 0,
        pitch: 0
    });

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setViewport({
                    ...viewport,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);


    const pins = React.useMemo(
        () =>
            marks && marks.map((mark, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={mark.lng}
                    latitude={mark.lat}
                    anchor="bottom"
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                    }}
                >
                    <Pin/>
                </Marker>
            )),
        [marks]
    );
    

    const GreenPointspins = React.useMemo(
        () =>
             greenpoints && greenpoints.map((mark, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={mark.lng}
                    latitude={mark.lat}
                    anchor="bottom"
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                    }}
                >
                    <img src={GreenPoints} alt="greenpoint" />
                </Marker>
            )),
        []
    );

    return (
        <>
            <ReactMapGL
                {...viewport}
                onMove={evt => setViewport(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                //@ts-ignore
                projection='globe'
                mapboxAccessToken={token}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />
                {GreenPointspins}
                {pins}
            </ReactMapGL>
        </>
    );
};

export default Map;
