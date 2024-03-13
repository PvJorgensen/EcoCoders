import { useEffect, useState } from 'react';
import { EventCard } from '../../Components/EventCards/EventCard';
import EventService from '../../services/event.service';
import SearchBar from '../../Components/Searchbar/Searchbar';

export const Events = () => {
    interface Event {
        id: number;
        name: string;
        description: string;
        longitude: number;
        latitude: number;
        date_start: number;
        date_end: number;
    }
    const { getAllEvents } = EventService();  //fetching events
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const eventsData = await getAllEvents();
                setEvents(eventsData);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        fetchEvents();
    }, []);
      
    return (
        <>
            <div>
                <SearchBar
                fetchData={getAllEvents}
                setResult={(events)=>setEvents(events as Event[])}
                suggestionKey='' />
                {Array.isArray(events) ? (
                    events.map(event => (
                        <EventCard key={event.id} 
                        id={event.id}
                        name={event.name} 
                        description={event.description}
                        longitude={event.longitude}
                        latitude={event.latitude}
                        date_start={event.date_start}
                        date_end={event.date_end}
                        />
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </div>
        </>
    )
}

