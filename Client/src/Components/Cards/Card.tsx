import React from 'react';
import styles from './card.module.scss'
import { Link } from 'react-router-dom';
interface CardProps {
  title: string;
  text: string;
  icon: string;
  link: string;
}

export const Card: React.FC<CardProps> = ({ title, text, icon, link }) => {
  return (
    <Link to={link} className={styles.card}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img src={icon} alt="" />
      </div>
      <div className={styles.textWrapper}>
      <h3>{title}</h3>
      <p>{text}</p>
      </div>
    </Link>
  );
};

