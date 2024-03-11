import { Card, Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import { useSupabase } from '../../Providers/SupabaseProvider/SupabaseProvider';
import { Link } from 'react-router-dom'; 

interface Tip {
    id: number;
    name: string;
    description: string;
    category: string;
}

export const TipsPage = () => {
    const { Search } = Input;
    const [tips, setTips] = useState<Tip[]>([]);
    const [displayedCategories, setDisplayedCategories] = useState<Set<string>>(new Set());
    const { supabase } = useSupabase(); 

    useEffect(() => {
        async function fetchTips() {
            if (supabase) {
                try {
                    const { data, error } = await supabase
                        .from ('Tips')
                        .select('id, name, description, category');
    
                    if (error) {
                        throw error;
                    }
    
                    setTips(data || []);
                } catch (error) {
                    console.error('Error retrieving tips:', (error as Error) .message);
                }
            }
        }

        if (supabase) {
            fetchTips();
        }
    }, [supabase]);

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <>
            <h3>Welcome to your eco encyclopedia!</h3>

            <Card title="DAILY TIPS"  style={{ width: 300 }}>
               <p>If a pizza box is cheessy or oily, compost it if possible. Otherwise put it in the trash</p>
                <img></img>
            </Card>

            <Search placeholder="" onSearch={onSearch} style={{ width: 200 }} />

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tips.map(tip => {
                    if (!displayedCategories.has(tip.category)) {

                        // Add the category to the set of displayed categories
                        setDisplayedCategories(prevSet => new Set(prevSet.add(tip.category)));

                        // Show the map only if the category has not already been displayed
                        return (
                            <Link  to={`/categorizedTips/${encodeURIComponent(tip.category)}`  }  key={tip.id}> 
                                <Card title={tip.category} style={{ width: 200, margin: '10px', borderRadius: '10px' }}>
                               </Card>
                           </Link>
                        );
                    } else {
                        return null; 
                    }
                })}
            </div>
        </>
    );
};
