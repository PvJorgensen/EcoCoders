import { Card, Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { Link } from 'react-router-dom'; 
import styles from "./TPage.module.scss"


export const TipsPage = () => {
    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
   
    return (
        <>
            <h3 className={`${styles.h3} `}>Welcome to your eco-encyclopedia!</h3>

            <Card style={{ width: 348, height: 185 }} className={`${styles.topCard} `}>
                <h2  style={{textAlign:"center" }}> DAILY TIPS</h2>
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
            <Search placeholder="Search" onSearch={onSearch} style={{ width: 349, height:36}} className={`${styles.searchbar} `} />

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          
                  {tips.map(tip => {
                    
                        return (
                            <Link  to={`/categorizedTips/${encodeURIComponent(tip.category)}`  }  key={tip.id}> 
                                <Card title={tip.category} style={{ width: 353, height:144, margin: '10px', borderRadius: '10px', border:" 1px solid #A8DEE6" }}>
                               </Card>
                           </Link>
                        );
                    
                      })}
            </div>
        </>
    );
};
