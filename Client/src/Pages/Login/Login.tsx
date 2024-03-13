import { supabase } from "../../services/clientSupabase";
import { useState } from "react";
import "./Landing.css"
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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

    const goToSignup = () => {
        navigate('/signup')
    }
    
    return (
        <>
        <div className="login-container"> 
            <form className="login-item" onSubmit={handleSubmit}>
                <h1 className="login-title">WELCOME BACK!</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="yourmail@"
                    className="login-input"
                    onChange={(event => setEmail(event.target.value))}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="login-input"
                    onChange={(event => setPassword(event.target.value))}
                />
                <button className="login-button">LOGIN</button>

                <p className="login-link" onClick={goToSignup}>REGISTER</p>
            </form>
        </div>
        </>
    );
}

export default Login
