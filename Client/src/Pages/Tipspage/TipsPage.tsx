import  { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import Searchbar from '../../Components/Searchbar/Searchbar';
import styles from './TPage.module.scss';
import TipsService from '../../services/tips.service';
import { Navigation } from "../../Components/navBar/Navigation";
import defaultimg from '../../assets/Pizza.svg'

interface Suggestion {
    [key: string]: any; 
}

interface Tip {
    id: number;
    name: string;
    description: string;
    category: string;
}

export const TipsPage = () => {
    const [result, setResult] = useState<Suggestion | null>(null);
    const { getAllTips } = TipsService();
    const [tips, setTips] = useState<Tip[]>([]);
    const [showContent, setShowContent] = useState(true); // State to control the visibility of the tips content

    const fetchData = async () => {
        const data = await getAllTips();
        return data;
    };

    useEffect(() => {
        async function fetchTips() {
            try {
                const tipsData = await getAllTips();
                
                // Filter unique Tip objects based on their category
                const uniqueTips = tipsData.reduce((unique: Tip[], tip: Tip) => {
                    const existingCategory = unique.find(u => u.category === tip.category);
                    if (!existingCategory) {
                        unique.push(tip);
                    }
                    return unique;
                }, [] as Tip[]);
                setTips(uniqueTips);
            } catch (error) {
                console.error('Error fetching tips:', error);
            }
        }
        fetchTips();
    }, []);

    return (
        <>
            <div style={{ justifyContent: 'center' }}>
                <h2 className={`${styles.h2} `}> <span>Welcome to your</span> <br></br> eco-encyclopedia!</h2>
                

                <Card style={{ width: 348, height: 190 }} className={`${styles.topCard} `}>
                    <h3 style={{ color: "black", textAlign: "center" }}>DAILY TIPS</h3>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <p style={{ flex: 1 }}>
                            If a pizza box is cheesy or oily, compost it if possible. Otherwise put it in the trash
                        </p>
                        <img
                            src={defaultimg}
                            style={{ width: 121, height: 121 }}
                            alt="Tip Image"
                        />
                    </div>
                </Card>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>

                    <div style={{ width: '100%', maxWidth: '348px' }}>
                        <Searchbar fetchData={fetchData} setResult={(result) => {
                            setResult(result);
                            setShowContent(false); // Hide the content when a suggestion is clicked
                        }} suggestionKey="name" />

                    </div>

                </div>

                {showContent && ( // Only render the content if showContent is true

                <div style={{ display: 'flex', justifyContent: 'center', marginTop:'10px' }} >
                         
                         <div className={styles.gridContainer} >

                        {Array.isArray(tips) ? (
                            tips.map((tip) => (
                                <Link to={`/categorizedTips/${encodeURIComponent(tip.category)}`} key={tip.id}>
                                    <Card className={styles.card} > <h1>{tip.category}</h1>
                                    </Card>
                                </Link>
                            ))
                        ) : (
                            <p>No tips available</p>
                        )}
                    </div>

                </div>
                   
                )}

            </div>

            <Navigation />
        </>
    );
};
