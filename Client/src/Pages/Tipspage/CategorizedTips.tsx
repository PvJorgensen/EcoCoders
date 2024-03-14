import { Card } from 'antd';
import { useEffect, useState } from 'react';
import styles from './TPage.module.scss';
import TipsService from '../../services/tips.service';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from "../../Components/navBar/Navigation";
import Searchbar from '../../Components/Searchbar/Searchbar';

interface Suggestion {
    [key: string]: any;
}
interface Tip {
    id: number;
    name: string;
    description: string;
    category: string;
}
export const CategorizedTips = () => {
    const [result, setResult] = useState<Suggestion | null>(null);
    const [tips, setTips] = useState<Tip[]>([]);
    const { category } = useParams<{ category: string }>(); //Retrieve the category name from the URL parameters
    const { getAllTips } = TipsService();
    const [showContent, setShowContent] = useState(true); // State to manage the visibility of the main content

    const fetchData = async () => {
        const data = await getAllTips();
        return data;
    };

    useEffect(() => {
        async function fetchTips() {
            try {
                const tipsData = await getAllTips();
                const filteredTips = tipsData.filter(tip => tip.category === category);
                setTips(filteredTips);
            } catch (error) {
                console.error('Error fetching tips:', error);
            }
        }
        fetchTips();
    }, [category]);

    // Handler function to handle suggestion click
    const handleSuggestionClick = () => {
        setShowContent(false); // Hide the main content when a suggestion is clicked
    };

    return (
        <>
            <div style={{ justifyContent: 'center' }}>
                <Card style={{ width: 348, height: 90 }} className={`${styles.topCard} `}>
                    <h1> {category}</h1>
             </Card>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <div style={{ width: '100%', maxWidth: '348px' }}>
                        <Searchbar fetchData={fetchData} setResult={setResult} suggestionKey="name" />
                    </div>
                </div>

                {showContent && (
                 
                 <div style={{ display: 'flex', justifyContent: 'center',marginTop:'10px' }}>

                    <div className={styles.gridContainer} >
                        {Array.isArray(tips) ? (
                            tips.map((tip) => (
                            <Link to={`/detailTips/${encodeURIComponent(tip.category)}/${encodeURIComponent(tip.id)}`} key={tip.id}>
                                
                                <Card className={styles.card} >
                                    <div key={tip.id} >
                                        <p>{tip.name}</p>
                                    </div>
                                </Card>


                            </Link>

                                
                            ))
                        ) : (
                            <p>No events available</p>
                        )}
                    </div>


                 </div>
               
                    
                    


                )}

            
             

            <Navigation />
        </>
    );
};
