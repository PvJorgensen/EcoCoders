import React from 'react';
import style from './events.module.scss'
import { Link } from 'react-router-dom';
import { EnvironmentFilled } from '@ant-design/icons';

interface EventCardProps {
  id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  date_start: number;
  date_end: number;
  img: string;
}

export const EventCard: React.FC<EventCardProps> = ({ id, name, longitude, latitude, date_start, date_end, img }) => {
  return (
    <Link to={`/event/${id}`} className={style.card} key={id}>
      <img src={img} alt="event image"  />
          <div className={style.mainText}>
            <h3>{name}</h3>
            <EnvironmentFilled />
            <div>
              <p>{date_start.toString()}</p>
              <p>{date_end.toString()}</p>
            </div>
          </div>
          <div className={style.joinButtom}>
            <div className={style.joinPeople}>10</div>
            <button className={style.button}>Join</button>
          </div>
    </Link>
  );
};
