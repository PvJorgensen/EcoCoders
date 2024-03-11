import axios from 'axios';

const apiUrl: string = import.meta.env.VITE_API_URL;
const apiKey: string = import.meta.env.VITE_SUPABASE_KEY;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'apikey': apiKey,
    'Authorization': apiKey,
  },
});

export default axiosInstance;
