import { useState } from 'react';
import { supabase } from "../../services/clientSupabase";

interface User {
    username: string;
    name: string;
    last_name: string;
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
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [lastName, setlastName] = useState('');
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const auth_id = await getUserId();
    
            const newUser: User = {
                username: username,
                name: name,
                last_name: lastName,
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
        } catch (error: any) {
            console.error("Error inserting user:", error.message);
        }
    }

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log("Error signing out:", error.message);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={username}
                    onChange={(event) => setUserName(event.target.value)}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    value={lastName}
                    onChange={(event) => setlastName(event.target.value)}
                />
                <button type="submit">Insert</button>
            </form>
            <button onClick={handleSignOut}>SignOut</button>
        </div>
    )
}

export default Form;
