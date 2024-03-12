import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventService from '../../services/event.service';
import { SingleEventCard } from '../../Components/EventCards/SingleEventCard';

interface Event {
    id: number;
    name: string;
    description: string;
    longitude: number;
    latitude: number;
    date_start: Date;
    date_end: Date;
}

export const SingleEvent = () => {
    const [event, setEvent] = useState<Event | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData: Event[] = await EventService().getEventById(Number(id));
                setEvent(eventData[0]);
            } catch (error) {
                console.error(`Error fetching event with id ${id}:`, error);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) {
        return <div>Loading...</div>;
    }
console.log(event)
    return (
        <div>
            <SingleEventCard
            id={event.id}
            name={event.name} 
            description={event.description}
            longitude={event.longitude}
            latitude={event.latitude}
            date_start={event.date_start}
            date_end={event.date_end}
            />
        </div>
    );
};