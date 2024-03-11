import React from 'react';
import { Card } from './Card'; // Sørg for at importere din Card-komponent korrekt

const arrcards = [
  { title: 'Events', text: 'There is many events happing in your city. Check them out!', icon: 'events.svg' },
  { title: 'Challenges', text: 'You can create challenges and invite your frends to take part', icon: 'Challenges.svg' },
  { title: 'Friends', text: 'Check out what challenges your friends have been completing', icon: 'Friends.svg' },
];

export const Cards: React.FC = () => {

  return (
    <>
      {arrcards.map((card) => (
        <Card key={card.title} title={card.title} text={card.text} icon={card.icon} />
      ))}
    </>
  );
};

  