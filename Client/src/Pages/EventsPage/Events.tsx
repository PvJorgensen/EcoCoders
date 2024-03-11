import { useEffect, useState } from 'react';
import { useSupabase } from '../../Providers/SupabaseProvider/SupabaseProvider';
import { EventCard } from '../../Components/EventCards/EventCard';

export const Events = () => {
    interface Event {  //defining the event
        id: number;
        title: string;
        text: string;
        icon: string;
        link: string;
      }

  const [events, setEvents] = useState<Event[]>([]);
  const { supabase } = useSupabase(); // getting the supabase client
  console.log(supabase)

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: events, error } = await supabase
        .from('events')
        .select('*');
  
      if (error) console.error('Error loading events', error);
      else {
        console.log('Events fetch:', events);
        setEvents(events);
      }
    };
  
    fetchEvents();
  }, []);
  

  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} title={event.title} text={event.text} icon={event.icon} link={event.link} />
      ))}
    </div>
  );
};

