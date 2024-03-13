import { Card } from 'antd';
import { useEffect, useState } from 'react';
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
    const [tips, setTips] = useState<Tip[]>([]);
    const [selectedTip, setSelectedTip] = useState<Tip | null>(null); 
    const { category } = useParams<{ category: string }>();
    const { getAllTips } = TipsService();

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

    
    const handleCardClick = (tip: Tip) => {
        setSelectedTip(tip);
    };

    return (
        <>
            <div style={{ justifyContent: 'center' }}>
                {selectedTip ? ( 
                    
                    <div >
                         <Card style={{ width: 348, height: 90 }} className={`${styles.topCard} `}>
                            <h1>{category}</h1>
                        </Card>
                        <div className={styles.detailCard}>
                            <h2>{selectedTip.name}</h2>
                            <p>{selectedTip.description}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <Card style={{ width: 348, height: 90 }} className={`${styles.topCard} `}>
                            <h1>{category}</h1>
                        </Card>
                        <div className={styles.gridContainer}>
                            {Array.isArray(tips) ? (
                                tips.map((tip) => (
                                    <Card
                                        className={styles.card}
                                        key={tip.id}
                                        onClick={() => handleCardClick(tip)} 
                                    >
                                        <div>
                                            <p>{tip.name}</p>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <p>No tips available</p>
                            )}
                        </div>
                    </>
                )}
            </div>
            <Navigation />
        </>
    );
};
