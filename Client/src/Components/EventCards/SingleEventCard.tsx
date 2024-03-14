//page for single event card
import { EnvironmentOutlined } from '@ant-design/icons';

import React from 'react';
import style from './singleEvent.module.scss'
import { Navigation } from '../navBar/Navigation'

import { dateToNumbers } from '../utils/date_utils';
import { months } from '../utils/date_utils';


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

export const SingleEventCard: React.FC<EventCardProps> = ({ id, name, description, date_start, date_end, img }) => {
  const date_end_formatted = new Date(date_end)
  const date_start_formatted = new Date(date_start)
  return (
    <div>
    <div key={id} className={style.card}>
      <div className={style.textWrapper}>
      <img src={img} alt="event_img" />
        <div className={style.mainText}>
          <h3>{name}</h3>
          <a href="/map"><EnvironmentOutlined /></a>
        </div>
        <div className={style.dates}>
          <p className={style.datatext}>{date_start_formatted.getDate()} {months[date_start_formatted.getMonth()]}</p>
          <p className={style.datatext}>{`${date_start_formatted.getHours()}:${date_start_formatted.getMinutes()} `} | {`${date_end_formatted.getHours()}:${date_end_formatted.getMinutes()} `}</p>          <p></p>
          <div className={style.location}>
          <p>{description}</p>
          
        </div>
        </div>
      </div>
          <div className={style.joinbtn}>
            <button>JOIN</button>
          </div>
    </div>
    <Navigation></Navigation>

    </div>
  );
};
