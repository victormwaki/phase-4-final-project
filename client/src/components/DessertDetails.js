// src/components/DessertDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DessertDetails() {
  const { id } = useParams();
  const [dessert, setDessert] = useState(null);

  useEffect(() => {
    fetch(`/api/desserts/${id}`)
      .then((res) => res.json())
      .then((data) => setDessert(data))
      .catch((error) => console.error('Error fetching dessert data:', error));
  }, [id]);

  if (!dessert) return <div>Loading...</div>;

  return (
    <div>
      <h1>{dessert.name}</h1>
      <img src={dessert.image} alt={dessert.name} />
      <p>{dessert.description}</p>
      <p>Price: ${dessert.price}</p>
    </div>
  );
}
