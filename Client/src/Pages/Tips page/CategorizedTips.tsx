
import { Card } from 'antd';
import {useEffect,useState} from 'react';
import styles from './TPage.module.scss';
import TipsService from '../../services/tips.service';
import { useParams } from 'react-router-dom'; 
import { Navigation } from "../../Components/navBar/Navigation";
import Searchbar from '../../Components/Search bar/Searchbar';




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
    const { category } = useParams<{ category: string }>(); //Retrieve the category name from the URL parameters
    const { getAllTips } = TipsService();
    const [tips, setTips] = useState<Tip[]>([]);

    const fetchData = async () => {
        const  data  = await getAllTips();
        return data;
    };

    

    useEffect(() => {
        async function fetchTips() {
            try {
                const tipsData = await getAllTips();
               //
                const filteredTips = tipsData.filter(tip => tip.category === category);
                setTips(filteredTips);
            } catch (error) {
                console.error('Error fetching tips:', error);
            }
        }
        fetchTips();
    }, [category]);
     

    return (
        <>
        <div style={{ justifyContent:'center' }}>
        <Card  style={{ width: 348, height: 90 }} className={`${styles.topCard} `}>
            <h1> {category}</h1>
         </Card>
 
         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <div style={{ width: '100%', maxWidth: '348px' }}>
            <Searchbar fetchData={fetchData} setResult={setResult} suggestionKey="name" />
        </div>
    </div>
    

         <div className={styles.gridContainer} >
                {Array.isArray(tips) ? (
                    tips.map((tip) => (
                        <Card className={styles.card} >         
                        <div key={tip.id} >
                        <p>{tip.name}</p>
                       </div>
                        </Card>

                        
                      
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </div>
        </div>
            
        <Navigation />
        
        </>
    );
};

