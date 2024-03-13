import { createClient } from '@supabase/supabase-js';

const apiUrl: string = import.meta.env.VITE_API_USER_URL_;
const apiKey: string = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(apiUrl, apiKey);
