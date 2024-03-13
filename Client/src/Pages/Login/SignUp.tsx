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

            if (!user) {
                console.log("wating for validate")
            } else {
                navigate('/form')
            }

        } catch (error) {
            console.error(error);
        }
    }
    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <>
            <div className="login-container">
                <form className="login-item" onSubmit={handleSubmit}>
                    <h1 className="login-title">TAKE PART</h1>
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
                    <button className="login-button">SIGN UP</button>

                    <p className="login-link" onClick={goToLogin}>DO YOU ALREADY HAVE AN ACCOUNT?</p>
                </form>
            </div>
        </>
    );
}

export default SignUp

