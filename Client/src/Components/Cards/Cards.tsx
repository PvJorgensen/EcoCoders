import React from 'react';
import { Card } from './Card';



const arrcards = [
  { title: 'Events', text: 'There is many events happing in your city. Check them out!', icon: 'events.svg', link: '/events' },
  { title: 'Challenges', text: 'You can create challenges and invite your frends to take part', icon: 'Challenges.svg', link: '/challenges' },
  { title: 'Friends', text: 'Check out what challenges your friends have been completing', icon: 'Friends.svg', link: '/PageNotFound' },
];

export const Cards: React.FC = () => {

  return (
    <>
      {arrcards.map((card) => (
        <Card key={card.title} title={card.title} text={card.text} icon={card.icon} link={card.link} />
      ))}
    </>
  );
};

  