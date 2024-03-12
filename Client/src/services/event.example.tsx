import { useEffect, useState } from "react";
import EventService from "./event.service";

//Exmaple to know how to work with the getAllEvents 
//And how to not have problems with Dates

export const Example = () => {
    interface Event {
        id: number;
        name: string;
        description: string;
        longitude: number;
        latitude: number;
        date_start: Date;
        date_end: Date;
    }
    const { getAllEvents } = EventService();
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
                        <div key={event.id}>
                            <h2>{event.name}</h2>
                            <p>Description: {event.description}</p>
                            <p>Longitude: {event.longitude}</p>
                            <p>Latitude: {event.latitude}</p>
                            <p>Start Date: {new Date(event.date_start).toDateString()}</p>
                            <p>End Date: {new Date(event.date_end).toDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </div>
        </>
    )
}





