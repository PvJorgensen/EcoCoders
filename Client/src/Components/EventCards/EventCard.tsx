import React from 'react';
import style from './events.module.scss'
import { Link } from 'react-router-dom';

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
  return (
    <Link to={`/event/${id}`} className={style.card} key={id}>
      <div>img</div>
          <div className={style.mainText}>
            <h3>{name}</h3>
            <p>Button{longitude}{latitude}</p>
            <p>{date_start.toString()} - {date_end.toString()}</p>
          </div>
          <button className={style.button}>Join</button>
    </Link>
  );
};
