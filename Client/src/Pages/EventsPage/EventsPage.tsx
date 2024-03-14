
// This Page renders all the events
import { useNavigate } from "react-router-dom";
import { Navigation } from "../../Components/navBar/Navigation";
import { Events } from './Events'
import { Button } from "antd";
import { EnvironmentFilled } from "@ant-design/icons";


export const EventsPage: React.FC = () => {
  const navigate= useNavigate();
  const openMapPage = () => {
    navigate( "/map");
  }

  return (
    <div style={{width: '100vw',height: '100vh'}}>
      <h1 style={{bottom: 0}}>EVENTS</h1>
      <Button style={{position: 'fixed', top: '20px', right: '20px' }} icon={<EnvironmentFilled />}type="default" shape="circle" size="large"onClick={openMapPage} />
      <Events />
      <Navigation />
    </div>
  );
};
  