import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface SupabaseContextProps {
    supabase: SupabaseClient | null;
}

const SupabaseContext = createContext<SupabaseContextProps>({ supabase: null });

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

    const supabaseUrl = 'https://hiqgrytlzaxpaneovggu.supabase.co';
    const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;

    useEffect(() => {
        setSupabase(createClient(supabaseUrl, supabaseKey));
    }, [supabaseKey]);

    return (
        <SupabaseContext.Provider value={{ supabase }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = (): SupabaseClient | null => {
    const context = useContext(SupabaseContext);
    if (!context) {
        throw new Error('useSupabase must be used within a SupabaseProvider');
    }
    return context.supabase;
};
