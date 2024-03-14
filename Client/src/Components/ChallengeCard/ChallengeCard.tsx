import React from 'react';
import style from './challenges.module.scss'
import { Link, useNavigate } from 'react-router-dom';

import { EnvironmentOutlined } from '@ant-design/icons';

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


export const ChallengeCard: React.FC<ChallengeCardProps> = ({ id,id_user, name, longitude, latitude, date_start, date_end, img }) => {

  const date_end_formatted = new Date(date_end)
  const date_start_formatted = new Date(date_start)
  const navigate = useNavigate();


  const NavChallengePage = (id: number, id_user:number) => {
    navigate(`/challenge/${id_user}/${id}`)
  }

  return (
    <div className={style.card} key={id}>
      <img onClick={() => NavChallengePage(id_user,id)} src={img} alt="challenge image" />
      <div className={style.mainText} >
        <h3 onClick={() =>  NavChallengePage(id_user,id)}>{name}</h3>
      
        <div onClick={() =>  NavChallengePage(id_user,id)}>
          <p>{dateToNumbers(date_start_formatted)}</p>
          <p>{`${date_start_formatted.getHours()}:${date_start_formatted.getMinutes()} `} - {`${date_end_formatted.getHours()}:${date_end_formatted.getMinutes()} `}</p>
        </div>
      </div>
      <div className={style.joinButtom}>
        <button className={style.button}>Accepted</button>
      </div>
    </div>
  );
};
