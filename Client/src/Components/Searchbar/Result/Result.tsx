import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import styles from '../../../Pages/Tipspage/TPage.module.scss';
import { EventCard } from '../../EventCards/EventCard';

interface CategoryProps {
  id: number;
  name: string;
  description: string;
  category: string;
}

interface EventProps {
  id: number;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  date_start: number;
  date_end: number;
  imageURL: string;
}

type ResultProps = CategoryProps | EventProps;

const Result: React.FC<ResultProps> = (props) => {

  if ('category' in props) {
    const { id, name, description, category } = props;
    return (
      <div>
        <Link to={`/categorizedTips/${encodeURIComponent(category)}`}>
          <Card className={styles.detailCard} >
            <h1>{name}</h1>
            <p>{description}</p>
          </Card>
        </Link>
      </div>
    );
  } else {
    const { id, name, description, longitude, latitude, date_start, date_end, imageURL } = props;
    return (
      <div>
        <Link to={`/event/${id}`}>
        <EventCard key={id}
                                    img ={imageURL}
                                    id={id}
                                    name={name}
                                    description={description}
                                    longitude={longitude}
                                    latitude={latitude}
                                    date_start={date_start}
                                    date_end={date_end}
                                />
        </Link>
      </div>
    );
  }
};

export default Result;
