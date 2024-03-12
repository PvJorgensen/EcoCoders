
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSupabase } from '../../Providers/SupabaseProvider/SupabaseProvider';

interface Tip {
    id: number;
    name: string;
    description: string;
    category: string;
}

export const CategorizedTips = () => {
    const { categoryName } = useParams<{ categoryName: string }>(); //Retrieve the category name from the URL parameters
    const [categoryTips, setCategoryTips] = useState<Tip[]>([]);
    const { supabase } = useSupabase();

    useEffect(() => {
        async function fetchCategoryTips() {
            if (supabase) {
                try {
                    const { data, error } = await supabase
                        .from('Tips')
                        .select('id, name, description, category')
                        .eq('category', categoryName); // Filter Tips by Category
    
                    if (error) {
                        throw error;
                    }
    
                    setCategoryTips(data || []);
                } catch (error) {
                    console.error('Error retrieving categorized tips:', (error as Error).message);
                }
            }
        }

        if (supabase) {
            fetchCategoryTips();
        }
    }, [categoryName, supabase]);

    return (
        <>
        <Card title={categoryName}  style={{ width: 300 }}>
               
         </Card>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {categoryTips.map(tip => (
                    <Card key={tip.id} title={tip.name} style={{ width: 200, margin: '10px', borderRadius: '10px' }}>
                        <p>{tip.description}</p>
                    </Card>
                ))}
            </div>
        </>
    );
};
