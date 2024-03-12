import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SupabaseContextProps {
    supabase: SupabaseClient | null;
}

const SupabaseContext = createContext<SupabaseContextProps>({ supabase: null });

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

    const supabaseUrl = 'https://hiqgrytlzaxpaneovggu.supabase.co';
    const supabaseKey = import.meta.env.REACT_APP_MAPBOX_TOKEN as string;

    useEffect(() => {
        setSupabase(createClient(supabaseUrl, supabaseKey));
    }, [supabaseKey]);

    return (
        <SupabaseContext.Provider value={{ supabase }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = (): SupabaseContextProps => useContext(SupabaseContext);
