import React from 'react';
import style from './events.module.scss'
import { Link } from 'react-router-dom';
import { dateToNumbers } from '../utils/date_utils';

interface EventCardProps {
  id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  date_start: number;
  date_end: number;
}

export const EventCard: React.FC<EventCardProps> = ({ id, name, longitude, latitude, date_start, date_end }) => {
  const date_end_formatted = new Date(date_end)
  const date_start_formatted = new Date(date_start)
  
  return (
    <Link to={`/event/${id}`} className={style.card} key={id}>
      <div>img</div>
          <div className={style.mainText}>
            <h3>{name}</h3>
            <p>Button{longitude} - {latitude}</p>
            <p>{dateToNumbers(date_start_formatted)}</p>
            <p>{`${date_start_formatted.getHours()}:${date_start_formatted.getMinutes()} `} - {`${date_end_formatted.getHours()}:${date_end_formatted.getMinutes()} `}</p>
            <p></p>
          </div>
          <button className={style.button}>Join</button>
    </Link>
  );
};
