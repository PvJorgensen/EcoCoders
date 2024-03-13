import { Card } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import Searchbar from '../../Components/Searchbar/Searchbar';
import styles from './TPage.module.scss';

interface Suggestion {
    [key: string]: any; 
}

export const TipsPage = () => {
    const [result, setResult] = useState<Suggestion | null>(null);

    const fetchData = async (value: string) => {
        const { data } = await axios.get(`https://dummyjson.com/products/search?q=${value}&limit=10`);
        return data.products;
    };

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
        </>
    );
};
