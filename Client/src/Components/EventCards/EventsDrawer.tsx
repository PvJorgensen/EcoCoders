import { EnvironmentOutlined } from '@ant-design/icons';
import React from 'react';

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

export const EventDrawer: React.FC<EventCardProps> = ({ id, name, description, date_start, date_end, img }) => {
    const date_end_formatted = new Date(date_end)
    const date_start_formatted = new Date(date_start)
    return (
        <div>
            <div key={id} >
                <div style={{display:  "flex", flexDirection: 'column', alignItems: 'center'}}>
                    <img src={img} alt="event_img" style={{ width: "90vw", height: '8rem', objectFit: "cover", borderRadius: '1rem' }} />
                    <div>
                        <h3 style={{fontSize: '23px',width: '90vw', textAlign: 'center'}}>{name}</h3>
                        <a style={{fontSize: '23px', color: 'black'}} href={`/map/${id}`}><EnvironmentOutlined /></a>
                    </div>
                    <div style={{width: '90vw'}}>
                        <p >{date_start_formatted.getDate()} {months[date_start_formatted.getMonth()]}</p>
                        <p >{`${date_start_formatted.getHours()}:${date_start_formatted.getMinutes()} `} | {`${date_end_formatted.getHours()}:${date_end_formatted.getMinutes()} `}</p>
                        <div>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
                <div style={{position: 'absolute', top: '15rem', right: '2rem'}}>
                    <button style={{ width: '100px', height: '100px', borderRadius: '50%', border: 'none', backgroundColor: '#F7EF81'}}>JOIN</button>
                </div>
            </div>
        </div>
    );
};
