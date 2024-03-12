import { supabase } from "../../services/clientSupabase";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const result = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            console.log(result)

        } catch (error) {
            console.error(error);
        }
        
    }
    
    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="yourmail@"
                    onChange={(event => setEmail(event.target.value))}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(event => setPassword(event.target.value))}
                />
                <button>LogIn</button>
            </form>
        </div>
        </>
    );
}

export default Login