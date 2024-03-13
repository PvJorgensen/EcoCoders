import axiosInstance from "./axios.service";

const eventTable = 'Event';
const userJoinEventTable = 'UserEvent'

export default function EventService() {

    interface Event {
        id: number; 
        name: string;
        description: string;
        longitude: number;
        latitude: number; 
        date_start: number; //In typeScript there is no TimeStamp, so we have to use number
        date_end: number; //In typeScript there is no TimeStamp, so we have to use number
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

    const getEventsByUserId = async (userId: number): Promise<Event[]> => {
        try {
            const response = await axiosInstance.get<Event[]>(`/${userJoinEventTable}?id_user=eq.${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Events for user with id ${userId} :`, error);
            throw error;
        }
    };

    // Find The Events from a user
    const getUsersInOneEvent = async (EventId: number): Promise<Event[]> => {
        try {
            const response = await axiosInstance.get<Event[]>(`/${userJoinEventTable}?id_event=eq.${EventId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching users for Event with id ${EventId} :`, error);
            throw error;
        }
    };

    // Join a Event
    const joinEvent = async (userId: number, EventId: number): Promise<void> => {
        try {
            const userEventData = { id_user: userId, id_Event: EventId };
            await axiosInstance.post(`/${userJoinEventTable}`, userEventData);
        } catch (error) {
            console.error(`Error joining Event with id ${EventId} :`, error);
            throw error;
        }
    };

    // Leave a Event
    const leaveEvent = async (userId: number, EventId: number): Promise<void> => {
        try {
            await axiosInstance.delete(`/${userJoinEventTable}?id_user=eq.${userId}&id_event=eq.${EventId}`);
        } catch (error) {
            console.error(`Error leaving Event with id ${EventId} :`, error);
            throw error;
        }
    };


    return {
        getAllEvents,
        getEventById,
        createEvent,
        updateEvent,
        deleteEvent,
        getEventsByUserId,
        getUsersInOneEvent,
        joinEvent,
        leaveEvent
    };
}