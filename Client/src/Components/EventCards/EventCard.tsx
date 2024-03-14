import React, { useEffect, useState } from 'react';
import style from './events.module.scss'
import { useNavigate } from 'react-router-dom';

import { EnvironmentOutlined } from '@ant-design/icons';

import { dateToNumbers } from '../utils/date_utils';
import { supabase } from '../../services/clientSupabase';
import EventService from '../../services/event.service';

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

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  description: string;
  auth_id: any;
}

export const EventCard: React.FC<EventCardProps> = ({ id, name, longitude, latitude, date_start, date_end, img }) => {

  const date_end_formatted = new Date(date_end)
  const date_start_formatted = new Date(date_start)
  const navigate = useNavigate();
  const { joinEvent, getUsersCountByEventId } = EventService();
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: '',
    role: '',
    email: '',
    description: '',
    auth_id: null,
  });
  const [userCount, setUserCount] = useState(0);

  const getUserId = async () => {
    const user = supabase.auth.getSession();
    const userId = ((await user).data.session?.user.id)
    return userId
  }

  const fetchUserCount = async () => {
    const count = await getUsersCountByEventId(id);
    setUserCount(count);
  };

  useEffect(() => {


    fetchUserCount();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth_id = await getUserId();
        const { data, error } = await supabase.from('User').select('*').eq('auth_id', auth_id).single();
        if (error) throw error;
        setUserData(data);
      } catch (error: any) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

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
        <div className={style.joinPeople}> {userCount}</div>
        <button className={style.button} onClick={() => joinEvent(userData.id, id).then(() => {
          console.log('User joined the event');
          fetchUserCount();
        }).catch((error) => {
          console.error('Error joining the event:', error);
        })}>Join</button>
      </div>
    </div>
  );
};
