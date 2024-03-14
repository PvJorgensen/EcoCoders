//page for single event card

import React from 'react';
import style from './singleChallenge.module.scss'
import { Navigation } from '../navBar/Navigation'

import { dateToNumbers } from '../utils/date_utils';


interface ChallengeCardProps {
  id: number;
  id_user:number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  date_start: number;
  date_end: number;
  img: string;
}

export const SingleChallengeCard: React.FC<ChallengeCardProps> = ({ id,id_user, name, description, longitude, latitude, date_start, date_end, img }) => {
  const date_end_formatted = new Date(date_end)
  const date_start_formatted = new Date(date_start)
  return (
    <div>
    <div key={id} className={style.card}>
      <div className={style.textWrapper}>
      <img src={img} alt="challenge_img" />
        <div className={style.mainText}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className={style.location}>
          <p>{longitude}{latitude}</p>
        </div>
        <div className={style.dates}>
           {/* <p>{new Date(date_start).toDateString()} - {new Date(date_end).toDateString()}</p> */}
          <p>{dateToNumbers(date_start_formatted)}</p>
          <p>{`${date_start_formatted.getHours()}:${date_start_formatted.getMinutes()} `} - {`${date_end_formatted.getHours()}:${date_end_formatted.getMinutes()} `}</p>          <p></p>
        </div>
      </div>
    </div>
    <Navigation></Navigation>
    </div>
  );
};
