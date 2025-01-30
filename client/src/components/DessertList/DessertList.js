import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import DessertCard from '../DessertCard/DessertCard';
import '../../styles/DessertList.css';

// Import the service function that fetches all desserts
import { getAllDesserts } from '../../data/desserts';

/**
 * Renders a grid/list of dessert cards by fetching from the server.
 */
export default function DessertList() {
  const [desserts, setDesserts] = useState([]);

  // Fetch all desserts on mount
  useEffect(() => {
    getAllDesserts()
      .then((data) => {
        setDesserts(data); // store them in state
      })
      .catch((err) => console.error('Error fetching desserts:', err));
  }, []);

  return (
    <div className="desserts-container">
      {desserts.map((dessert) => (
        <Link to={`/desserts/${dessert.id}`} key={dessert.id}>
          <DessertCard dessert={dessert} />
        </Link>
      ))}
    </div>
  );
}
