import { supabase } from "../../services/clientSupabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const response = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            
            const user = supabase.auth.getSession();

            if (!user){
                console.log("wating for validate")
            } else {
                navigate('/form')
            }

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
                <button>Take Part</button>
            </form>
        </div>
        </>
    );
}

export default SignUp

