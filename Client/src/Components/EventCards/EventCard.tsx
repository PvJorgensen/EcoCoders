import React from 'react';
import style from './events.module.scss'
import { Link, useNavigate } from 'react-router-dom';

import { EnvironmentOutlined } from '@ant-design/icons';

import { dateToNumbers } from '../utils/date_utils';

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

  const date_end_formatted = new Date(date_end)
  const date_start_formatted = new Date(date_start)
  const navigate = useNavigate();

  const locationMap = (id: number) => {
    navigate(`/map/${id}`)
  }

  const NavEvetPage = (id: number) => {
    navigate(`/event/${id}`)
  }

  return (
    <div className={style.card} key={id}>
      <img onClick={() => NavEvetPage(id)} src={img} alt="event image" />
      <div className={style.mainText} >
        <h3 onClick={() => NavEvetPage(id)}>{name}</h3>
        <EnvironmentOutlined onClick={() => locationMap(id)} />
        <div onClick={() => NavEvetPage(id)}>
          <p>{dateToNumbers(date_start_formatted)}</p>
          <p>{`${date_start_formatted.getHours()}:${date_start_formatted.getMinutes()} `} - {`${date_end_formatted.getHours()}:${date_end_formatted.getMinutes()} `}</p>
        </div>
      </div>
      <div className={style.joinButtom}>
        <div className={style.joinPeople}>10</div>
        <button className={style.button}>Join</button>
      </div>
    </div>
  );
};
