import { supabase } from "./clientSupabase";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Auth(){
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
          console.log(event, session);  
          if (!session) {
            // If the user is on the /login or /signup page, do not redirect
            if (window.location.pathname !== '/login' && window.location.pathname !== '/signup' && window.location.pathname !== '/form' ) {
              navigate('/landing')
            }
          } else {
            if (window.location.pathname !== '/form') {
              navigate('/')
            }
          }
        })
    }, [])
}
