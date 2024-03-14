import React, { useEffect } from "react";
import Map from "../../Components/map/map";
import Drawer from "../../Components/drawer/drawer";
import { Button } from "antd";
import "./MapPage.css";
import { Navigation } from "../../Components/navBar/Navigation";
import EventService from "../../services/event.service";
import GreenPointService from "../../services/greenpoints.service";
import { GLOBAL_VARIABLE_GREENPOINTS, GLOBAL_VARIABLE_MARKS } from "../../Components/const/const";
import { useParams } from "react-router-dom";


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
    const { getAllEvents, getEventById } = EventService();
    const { getAllGreenPoints } = GreenPointService();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            getMark();
        } else {
            getMarks();
            getGreenPoints();
        }

    }, [id]);

    const openDrawer = () => {
        setDrawer(!drawer);
    }

    const closeDrawer = () => {
        setDrawer(false);
    }

    const getMark = async () => {
        try {
            const events = await getEventById(Number(id));
            setMarks(events.map(evt => ({ id: evt.id, lat: evt.latitude, lng: evt.longitude })));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    const getMarks = async () => {
        try {
            const events = await getAllEvents();
            setMarks(events.map(evt => ({ id: evt.id, lat: evt.latitude, lng: evt.longitude })));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    const getGreenPoints = async () => {
        try {
            const allgreenpoints = await getAllGreenPoints();
            setGreemPoints(allgreenpoints.map(grp => ({ id: grp.id, lat: grp.latitude, lng: grp.longitude })));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Button type="default" shape="circle" size="large" onClick={openDrawer} />
            <Map marks={!GLOBAL_VARIABLE_MARKS ? marks : null} greenpoints={!GLOBAL_VARIABLE_GREENPOINTS ? greenpoints : null} selectable={false} />
            <Drawer isOpen={drawer} onClose={closeDrawer} isfilter={true} />
            <Navigation />
        </div>
    )
}