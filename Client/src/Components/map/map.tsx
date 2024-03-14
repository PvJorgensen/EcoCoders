import React, { useEffect } from 'react';
import ReactMapGL, {
    Marker,
    GeolocateControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './pin';
import GreenPoints from '../../assets/GreenPoints.svg'
import DrawerComponents from '../drawer/drawer';

interface Mark {
    id: number;
    lat: number;
    lng: number;
}

interface MapProps {
    marks: Mark[] | null;
    greenpoints: Mark[] | null;
    selectable: boolean;
}

const Map: React.FC<MapProps> = ({ marks, greenpoints, selectable }) => {
    const token = import.meta.env.VITE_MAPBOX_TOKEN as string;

    const [viewport, setViewport] = React.useState({
        latitude: 28.013004,
        longitude: -15.425111,
        zoom: 0.8,
        bearing: 0,
        pitch: 0
    });

    const [clickedCoords, setClickedCoords] = React.useState<Mark | null>(null);

    const [openDrawer,SetopenDrawer] = React.useState(false);

    const closeDrawer = () => {
        SetopenDrawer(false)
    }

    const handleClick = (lng: number, lat: number) => {
        const id = 0;
        if (selectable) {
            const coords = {id, lat, lng};
            setClickedCoords(coords);
            console.log(clickedCoords);
        }
    };

    const handleClickMarker  = () => {        
        if(!openDrawer){
            SetopenDrawer(true);
        }
    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setViewport({
                    ...viewport,
                    zoom: 10,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);

    const selectablePin = React.useMemo(
        () =>
            clickedCoords && (
                <Marker
                    longitude={clickedCoords.lng}
                    latitude={clickedCoords.lat}
                    anchor="bottom"
                >
                    <Pin />
                </Marker>
            ),
        [clickedCoords]
    );

    const pins = React.useMemo(
        () =>
            marks && marks.map((mark, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={mark.lng}
                    latitude={mark.lat}
                    anchor="bottom"
                    onClick={handleClickMarker}
                >
                    <Pin />
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
                    onClick={handleClickMarker}
                >
                    <img src={GreenPoints} alt="greenpoint" />
                </Marker>
            )),
        [greenpoints]
    );

    return (
        <>
            <ReactMapGL
                {...viewport}
                onMove={evt => setViewport(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                //@ts-ignore
                projection='globe'
                mapboxAccessToken={token}
                onClick={evt => handleClick(evt.lngLat.lng, evt.lngLat.lat)}
            >
                <GeolocateControl position="top-left" />
                {GreenPointspins}
                {pins}
                {selectablePin}
                {openDrawer && <DrawerComponents isOpen={openDrawer} onClose={closeDrawer} isfilter={false}/>}
            </ReactMapGL>
        </>
    );
};

export default Map;
