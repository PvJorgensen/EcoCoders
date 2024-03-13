
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
    <div>
      <h1>EVENTS</h1>
      <Button icon={<EnvironmentFilled />}type="default" shape="circle" size="large"onClick={openMapPage} />
      <Events />
      <Navigation />
    </div>
  );
};
  