
import { Card } from 'antd';
import {useEffect,useState} from 'react';
import styles from './TPage.module.scss';
import TipsService from '../../services/tips.service';
import { useParams } from 'react-router-dom'; 
import { Navigation } from "../../Components/navBar/Navigation";

interface Tip {
    id: number;
    name: string;
    description: string;
    category: string;
}
export const CategorizedTips = () => {
    
    const { category } = useParams<{ category: string }>(); //Retrieve the category name from the URL parameters
    const { getAllTipss } = TipsService();
    const [tips, setTips] = useState<Tip[]>([]);

    useEffect(() => {
        async function fetchTips() {
            try {
                const tipsData = await getAllTipss();
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
        <Card  style={{ width: 348, height: 100 }} className={`${styles.topCard} `}>
           <h1> {category}</h1>
         </Card>

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

