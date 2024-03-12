import React from 'react';
import style from './events.module.scss'
import { Link } from 'react-router-dom';

interface EventCardProps {
  id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  date_start: Date;
  date_end: Date;
}

// 
export const EventCard: React.FC<EventCardProps> = ({ id, name, description, longitude, latitude, date_start, date_end }) => {
  return (
    <Link to={`/event/${id}`} className={style.card}>
      <div key={id}>
        <div className={style.textWrapper}>
          <div className={style.mainText}>
            <h3>{name}</h3>
            <p>Description: {description}</p>
          </div>
          <div className={style.location}>
            <p>Longitude: {longitude}</p>
            <p>Latitude: {latitude}</p>
          </div>
          <div className={style.dates}>
            <p>Start Date: {new Date(date_start).toDateString()}</p>
            <p>End Date: {new Date(date_end).toDateString()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
