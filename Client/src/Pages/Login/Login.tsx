import { supabase } from "../../services/user.service";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithOtp({
                email: email
            })
            // const result = await supabase.auth.signInWithPassword({
            //     email: email,
            //     password: password,
            // })


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
                <button>Send</button>
            </form>
        </div>
        {/* <UserService/> */}
        </>
    );
}

export default Login