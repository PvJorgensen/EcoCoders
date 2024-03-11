import React from 'react';
import styles from './card.module.scss'
interface CardProps {
  title: string;
  text: string;
  icon: string;
}

export const Card: React.FC<CardProps> = ({ title, text, icon, }) => {
  return (
    <div className={styles.card}>
      <img src={icon} alt="" />
      <div className={styles.textWrapper}>
      <h3>{title}</h3>
      <p>{text}</p>
      </div>
    </div>
  );
};

