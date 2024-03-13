import React from 'react';
import style from './singleEvent.module.scss'

interface EventCardProps {
  id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  date_start: Date;
  date_end: Date;
}

export const SingleEventCard: React.FC<EventCardProps> = ({ id, name, description, longitude, latitude, date_start, date_end }) => {
  return (
    <div key={id} className={style.card}>
      <div className={style.textWrapper}>
        <div className={style.mainText}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className={style.location}>
          <p>{longitude}</p>
          <p>{latitude}</p>
        </div>
        <div className={style.dates}>
          <p>{new Date(date_start).toDateString()} - {new Date(date_end).toDateString()}</p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
