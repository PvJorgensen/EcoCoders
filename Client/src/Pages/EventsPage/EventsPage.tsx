
import { Navigation } from "../../Components/navBar/Navigation";
import { Events } from './Events'



  export const EventsPage: React.FC<EventsPageProps> = () => {

    return (
      <div>
        <h1>EVENTS</h1>
        <Events />
        <Navigation />
      </div>
    );
  };
  