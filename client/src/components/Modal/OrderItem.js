import React, { useEffect, useState } from 'react';
import useResponsiveImage from '../../hooks/useResponsiveImage';
import { getAllDesserts } from '../../data/desserts';

/**
 * Renders a single order item in the checkout modal
 * by fetching the matching dessert data from the server.
 */
export default function OrderItem({ item }) {
  const [dessertData, setDessertData] = useState(null);

  useEffect(() => {
    getAllDesserts()
      .then(desserts => {
        const found = desserts.find(d => d.name === item.name);
        setDessertData(found || null);
      })
      .catch(err => console.error('Error fetching desserts:', err));
  }, [item.name]);

  // Provide a fallback if dessertData is null
  // so our hook is called unconditionally:
  const defaultImage = {
    thumbnail: '',
    mobile: '',
    tablet: '',
    desktop: '',
  };

  const imageObj = dessertData?.image || defaultImage;
  const responsiveSrc = useResponsiveImage(imageObj);

  if (!dessertData) {
    // We have already called our hook, so there's no conditional call
    return <div>Loading dessert info...</div>;
  }

  return (
    <div className="order-item">
      <img
        src={responsiveSrc}
        alt={item.name}
        className="order-item-image"
      />
      <div className="order-item-details">
        <div className="order-item-left">
          <p className="order-item-name">{item.name}</p>
          <div className="order-tally-price">
            <p className="order-item-quantity">{item.quantity}x</p>
            <p className="order-item-price">
              ${item.price.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="order-item-right">
          <p className="order-item-total">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
