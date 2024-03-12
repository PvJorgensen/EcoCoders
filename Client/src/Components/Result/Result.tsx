import React from 'react';

// Props interface
interface ResultProps {
  name: string;
  description: string;
  category: string;
}


const Result: React.FC<ResultProps> = ({ name, description, category }) => (
  <div>
    <span>Name: {name}</span>
    <span>Description: {description}</span>
    <span>Category: {category}</span>
  </div>
);

export default Result;
