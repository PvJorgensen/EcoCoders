import React from 'react';
import { Card } from './Card';
import chalengSVG from '../../assets/emoji_events.svg';
import eventsSVG from '../../assets/EnvironmentFilled.svg';
import friendsSVG from '../../assets/face_6.svg';

const arrcards = [
  { title: 'Events', text: 'There is many events happing in your city. Check them out!', icon: eventsSVG, link: '/events' },
  { title: 'Challenges', text: 'You can create challenges and invite your frends to take part', icon: chalengSVG, link: '/PageNotFound' },
  { title: 'Friends', text: 'Check out what challenges your friends have been completing', icon: friendsSVG, link: '/PageNotFound' },
];

export const Cards: React.FC = () => {

  return (
    <div style={{marginBottom: '7rem'}}>
      {arrcards.map((card) => (
        <Card key={card.title} title={card.title} text={card.text} icon={card.icon} link={card.link} />
      ))}
    </div>
  );
};

  