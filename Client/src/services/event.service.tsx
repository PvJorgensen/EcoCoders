import { useSupabase } from "../Providers/SupabaseProvider";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
import axios from 'axios';

const eventTable = 'Event';
// const userEventTable = 'UserEvent';
const { supabase } = useSupabase();
const apiUrl: string = import.meta.env.VITE_API_URL;

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
            const response = await axios.get<Event[]>(`${apiUrl}${eventTable}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error; // Re-lanzamos el error para manejarlo en otro lugar si es necesario
        }
    };


    const getEventById = async (eventId: number): Promise<Event | null> => {
        try {
            const response = await axios.get<Event>(`${apiUrl}${eventTable}/${eventId}`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return null;
            } else {
                console.error('Error fetching event by ID:', error);
                throw error;
            }
        }
    };


    async function createEvent(eventData: any) {
        if (supabase) {
            const { data, error } = await supabase.from(eventTable).insert(eventData);
            if (error) {
                console.error("Error creating event:", error.message);
            } else {
                return data;
            }
        }
    }

    const updateEvent = async (eventId: string, eventData: any) => {
        if (supabase) {
            const { data, error } = await supabase.from(eventTable).update(eventData).eq('id', eventId)
            if (error) {
                console.error("Error updating event:", error.message)
            } else {
                return data;
            }
        }
    }

    const deleteEvent = async (eventId: string) => {
        if (supabase) {
            const { data, error } = await supabase.from(eventTable).delete().eq('id', eventId)
            if (error) {
                console.error("Error deleting event:", error.message)
            } else {
                return data;
            }
        }
    }

    return {
        getAllEvents,
        getEventById,
        createEvent,
        updateEvent,
        deleteEvent
    };
}




