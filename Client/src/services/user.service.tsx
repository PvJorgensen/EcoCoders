import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'


const apiUrl: string = import.meta.env.VITE_API_URL;
const apiKey: string = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(apiUrl, apiKey);

export default function UserService() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            //@ts-ignore
            setSession(session)
        })

        const { data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            //@ts-ignore
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', height:'100vh'}}>
                {/* <img src="/path/to/your/logo.png" alt="Logo" style={{ width: '100px', height: '100px' }} /> */}
                <h1>Eco Coders</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{
                            style: {
                                button: {
                                    backgroundColor: '#1E6091',
                                    color: 'white',
                                    borderRadius: '10px',
                                    height: '3em',
                                },
                                input: {
                                    border: '3px solid #A8DEE6',
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    height: '3em',
                                    width: '80vw'
                                }
                            }
                        }}
                        providers={[]}
                    />
                </div>
            </div>

        )
    }
    else {
        return (<div>Logged in!</div>)
    }
}


// interface user {
//     id: number;
//     username: string;
//     name: string;
//     last_name: string;
//     email: string;
//     password: number;
//     auth_id: number;
// }

// async function signUp(email: string, password: string) {
//     const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//     });
//     return { data, error };
// }

// async function signInWithEmail() {
//     const { data, error } = await supabase.auth.signInWithPassword({
//         email: 'example@email.com',
//         password: 'example-password',
//     })
//     return { data, error };
// }

// async function signIn(email: string, password: string) {
//     const { data, error } = await supabase.auth.signIn({
//         email,
//         password,
//     });
//     return { data, error };
// }

// async function deleteAccount() {
//     const { error } = await supabase.auth.deleteAccount();
//     return { error };
// }

// async function updateUserData(data: any) {
//     const { user, error } = await supabase.auth.update({
//         data,
//     });
//     return { user, error };
// }



