import { Card } from 'antd';
import {useEffect,useState } from 'react';
import axios from 'axios';
import Searchbar from '../../Components/Search bar/Searchbar';
import styles from './TPage.module.scss';
import TipsService from '../../services/tips.service';
import { Link } from 'react-router-dom'; 
import { Navigation } from "../../Components/navBar/Navigation";

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
         <div style={{ justifyContent:'center' }}>
         <h2 className={`${styles.h2} `}>Welcome to your eco-encyclopedia!</h2>
    
    <Card style={{ width: 348, height: 190 }} className={`${styles.topCard} `}>
        <h3 style={{ textAlign: "center", color: "black" }}>DAILY TIPS</h3>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ flex: 1 }}>
                If a pizza box is cheesy or oily, compost it if possible. Otherwise put it in the trash
            </p>
            <img
                src="https://th.bing.com/th?id=OIP.8ti7pBA9iqulyrvakdFG0QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                style={{ width: 121, height: 121 }}
                alt="Tip Image"
            />
        </div>
    </Card>

    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <div style={{ width: '100%', maxWidth: '348px' }}>
            <Searchbar fetchData={fetchData} setResult={setResult} suggestionKey="category" />
        </div>
    </div>
    
    <div className={styles.gridContainer} >
        {Array.isArray(tips) ? (
            tips.map((tip) => (
                <Link to={`/categorizedTips/${encodeURIComponent(tip.category)}`} key={tip.id}>
                    <Card  className={styles.card} >       <h1>{tip.category}</h1>
                    </Card>
                </Link>
            ))
        ) : (
            <p>No tips available</p>
        )}
    </div>
         </div>
           
         <Navigation />
        </>
    );
};
