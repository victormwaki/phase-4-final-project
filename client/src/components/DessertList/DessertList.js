import React from 'react';
import DessertCard from '../DessertCard/DessertCard';
import { dessertsData } from '../../data/desserts';
import '../../styles/DessertList.css';

/**
 * Renders a grid/list of dessert cards.
 */
export default function DessertList() {
  return (
    <div className="desserts-container">
      {dessertsData.map(dessert => (
        <DessertCard key={dessert.name} dessert={dessert} />
      ))}
    </div>
  );
}
