import axiosInstance from "./axios.service";

const eventTable = 'Event';

export default function EventService() {

    interface Event {
        id: number;
        name: string;
        description: string;
        longitude: number;
        latitude: number;
        date_start: Date;
        date_end: Date;
    }

    const getAllEvents = async (): Promise<Event[]> => {
        try {
            const response = await axiosInstance.get<Event[]>(`/${eventTable}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    };


    const getEventById = async (eventId: number): Promise<Event[]> => {
        try {
            const response = await axiosInstance.get<Event[]>(`/${eventTable}?id=eq.${eventId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching event with id ${eventId} :`, error);
            throw error;
        }
    };

    //rember to do a post, the infotmation must be like this:
    //{
    //  "id:" 1,
    //  "name": "..."
    //  ...
    // }

    const createEvent = async (eventData: Event): Promise<Event> => {
        try {
            const response = await axiosInstance.post<Event>(`/${eventTable}`, eventData);
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    };
    
    const updateEvent = async (eventId: number, eventData: Event): Promise<Event> => {
        try {
            const response = await axiosInstance.patch<Event>(`/${eventTable}?id=eq.${eventId}`, eventData);
            return response.data;
        } catch (error) {
            console.error(`Error updating event with id ${eventId} :`, error);
            throw error;
        }
    };

    const deleteEvent = async (eventId: number): Promise<void> => {
        try {
            await axiosInstance.delete(`/${eventTable}?id=eq.${eventId}`);
        } catch (error) {
            console.error(`Error deleting event with id ${eventId} :`, error);
            throw error;
        }
    };

    return {
        getAllEvents,
        getEventById,
        createEvent,
        updateEvent,
        deleteEvent
    };
}