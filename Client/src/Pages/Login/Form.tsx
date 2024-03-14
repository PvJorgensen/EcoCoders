import { useState } from 'react';
import { supabase } from "../../services/clientSupabase";
import "./Landing.css"
import { useNavigate } from "react-router-dom";

interface User {
    name: string;
    description: string;
    role: string;
    email: string;
    auth_id: any;
}

const getUserId = async () => {
    const user = supabase.auth.getSession();
    const userId = ((await user).data.session?.user.id)
    return userId
}

function Form() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // Agrega esto
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const auth_id = await getUserId();
    
            const newUser: User = {
                name: name,
                description: description,
                role: "user",
                email: "h",
                auth_id: auth_id,
            };
            console.log(newUser.auth_id)
    
            const { data, error } = await supabase.from('User').insert(newUser);
    
            if (error) {
                throw error;
            }

            console.log("User inserted successfully!");
            navigate('/home');
        } catch (error: any) {
            console.error("Error inserting user:", error.message);
        }
    }

    return (
        <div className="login-container">
            <form className="login-item" onSubmit={handleSubmit}>
                <h1 className="login-title">YOUR INFO</h1>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={name}
                    className="login-input"
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="about you"
                    value={description}
                    className="login-input"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <button className="login-button" type="submit">SIGN UP</button>
            </form>
        </div>
    )
}

export default Form;
