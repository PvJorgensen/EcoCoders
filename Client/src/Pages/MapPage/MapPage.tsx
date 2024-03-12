import React from "react";
import Map from "../../Components/map/map";
import Drawer from "../../Components/drawer/drawer";
import { Button } from "antd";
import "./MapPage.css";


interface MapPageProps {

}

export const MapPage: React.FC<MapPageProps> = () => {

    const [drawer, SetDrawer] = React.useState(false);

    const openDrawer = () => {
        SetDrawer(true)
    }

    const closeDrawer = () => {
        SetDrawer(false)
    }

    const Marks = [{lat:20.00000,lng: 20.20000}]

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Button type="default" shape="circle" size="large" onClick={openDrawer} />
            <Map marks={Marks} greenpoints={null} selectable={false} />
            <Drawer isOpen={drawer} onClose={closeDrawer} />
        </div>
    )
}