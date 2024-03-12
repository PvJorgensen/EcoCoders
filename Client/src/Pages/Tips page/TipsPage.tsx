import { Card } from 'antd';
import {useEffect,useState } from 'react';
import axios from 'axios';
import Searchbar from '../../Components/Search bar/Searchbar';
import styles from './TPage.module.scss';
import TipsService from '../../services/tips.service';
import { Link } from 'react-router-dom'; 

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
    const { getAllTipss } = TipsService();
    const [tips, setTips] = useState<Tip[]>([]);

    const fetchData = async (value: string) => {
        const { data } = await axios.get(`https://dummyjson.com/products/search?q=${value}&limit=10`);
        return data.products;
    };

    useEffect(() => {
        async function fetchTips() {
            try {
                const tipsData = await getAllTipss();
                setTips(tipsData);
            } catch (error) {
                console.error('Error fetching tips:', error);
            }
        }
        fetchTips();
    }, []);
    return (
        <>
            <h2 className={`${styles.h2} `}>Welcome to your eco-encyclopedia!</h2>

            <Card style={{ width: 348, height: 185 }} className={`${styles.topCard} `}>
                <h2 style={{ textAlign: "center", color: "black" }}>DAILY TIPS</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ flex: 1, margin: 0 }}>
                        If a pizza box is cheesy or oily, compost it if possible. Otherwise put it in the trash
                    </p>
                    <img
                        src="https://th.bing.com/th?id=OIP.8ti7pBA9iqulyrvakdFG0QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                        style={{ width: 121, height: 121, marginRight: '10px' }}
                        alt="Tip Image"
                    />
                </div>
            </Card>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '348px' }}>
                    <Searchbar fetchData={fetchData} setResult={setResult} suggestionKey="category"   />
                </div>
            </div>
            <div>
                {Array.isArray(tips) ? (
                    tips.map(tip => (
                     <Link to={`/categorizedTips/${encodeURIComponent(tip.category)}`} key={tip.id}>
                        <Card title={tip.category} style={{ width: 353, height: 144, margin: '10px', borderRadius: '10px', border: '1px solid #A8DEE6' }} />
                    </Link>

                        
                    ))
                ) : (
                    <p>No tips available</p>
                )}
            </div>
         
        </>
    );
};
