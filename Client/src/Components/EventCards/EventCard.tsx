import React from 'react';
import style from './events.module.scss'
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  text: string;
  icon: string;
  link: string;
}

export const EventCard: React.FC<CardProps> = ({ title, text, icon, link }) => {
  return (
    <Link to={link} className={style.card}>
      <img src={icon} alt="" />
      <div className={style.textWrapper}>
      <h3>{title}</h3>
      <p>{text}</p>
      </div>
    </Link>
  );
};
