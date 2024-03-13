import React from 'react';
import { Card } from 'antd';
import styles from '../../../Pages/Tips page/TPage.module.scss';
import { Link } from 'react-router-dom'; 

// Props interface
interface ResultProps {
    category?: string; 
    name?: string; 
    description?: string; 
}

const Result: React.FC<ResultProps> = ({ category, name, description }) => {

 
  if (category) {
    return (
      <Link to={`/categorizedTips/${encodeURIComponent(category)}`}>
        <Card className={styles.card}>
          <h1>{category}</h1>
        </Card>
      </Link>
    );
  }
  
  
  else {
    return (
      <Card >
        <div>
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </Card>
    );
  }

  
  return null;
};

export default Result;
