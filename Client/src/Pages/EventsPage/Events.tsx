import { useEffect, useState } from 'react';
import { EventCard } from '../../Components/EventCards/EventCard';
import EventService from '../../services/event.service';

export const Events = () => {
    interface Event {
        id: number;
        name: string;
        description: string;
        longitude: number;
        latitude: number;
        date_start: Date;
        date_end: Date;
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

