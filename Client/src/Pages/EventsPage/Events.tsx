import { useEffect, useState } from 'react';
import { EventCard } from '../../Components/EventCards/EventCard';
import EventService from '../../services/event.service';
import SearchBar from '../../Components/Searchbar/Searchbar';
export const Events = () => {

    interface Suggestion {
        [key: string]: any;
    }
    interface Event {
        id: number;
        name: string;
        description: string;
        longitude: number;
        latitude: number;
        date_start: number;
        date_end: number;
        imageURL: string;
    }

    const { getAllEvents } = EventService();
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Suggestion | null>(null);
    const [showContent, setShowContent] = useState(true);
  

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

    const fetchData = async () => {
        const data = await getAllEvents();
        return data;
    };

    return (
        <>
            <div style={{ paddingBottom: '9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <div style={{ width: '100%', maxWidth: '348px' }}>
                        <SearchBar
                            fetchData={fetchData}
                            setResult={(result) => {
                                setFilteredEvents(result);
                                setShowContent(false);
                            }}
                            suggestionKey='name' />
                    </div>
                </div>

                {showContent && (
                    <div>
                        {events ? (
                            events.map((event: Event) => (
                                <EventCard key={event.id}
                                    img ={event.imageURL}
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
                )}


            </div>
        </>
    )
}
