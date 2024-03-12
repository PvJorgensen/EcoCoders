import React, { useEffect } from "react";
import Map from "../../Components/map/map";
import Drawer from "../../Components/drawer/drawer";
import { Button } from "antd";
import "./MapPage.css";
import { Navigation } from "../../Components/navBar/Navigation";
import EventService from "../../services/event.service";
import GreenPointService from "../../services/greenpoints.service";


interface MapPageProps {

}

interface Mark {
    id: number;
    lat: number;
    lng: number;
}

export const MapPage: React.FC<MapPageProps> = () => {

    const [drawer, setDrawer] = React.useState(false);
    const [marks, setMarks] = React.useState<Mark[]>([]);
    const [greenpoints, setGreemPoints] = React.useState<Mark[]>([]);
    const { getAllEvents } = EventService();
    const { getAllGreenPoints } = GreenPointService();

    useEffect(() => {
        getMarks();
        getGreenPoints();
        console.log(greenpoints);
        
    }, []);

    const openDrawer = () => {
        setDrawer(!drawer);
    }

    const closeDrawer = () => {
        setDrawer(false);
    }

    const getMarks = async () => {
        try {
            const events = await getAllEvents();
            setMarks(events.map(evt => ({id: evt.id, lat: evt.latitude, lng: evt.longitude })));     
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    const getGreenPoints = async () => {
        try{
            const allgreenpoints = await getAllGreenPoints();
            setGreemPoints(allgreenpoints.map(grp => ({id: grp.id, lat: grp.latitude, lng: grp.longitude })));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Button type="default" shape="circle" size="large" onClick={openDrawer} />
            <Map marks={marks} greenpoints={greenpoints} selectable={false} />
            <Drawer isOpen={drawer} onClose={closeDrawer} />
            <Navigation/>
        </div>
    )
}