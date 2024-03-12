import { supabase } from "./user.service";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Auth(){
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
          console.log(event, session);  
          if (!session) {
            navigate('/login')
          } else {
            navigate('/')
          }
        })
    }, [])
}
