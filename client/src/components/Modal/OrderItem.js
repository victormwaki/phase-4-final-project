import React from 'react';
import useResponsiveImage from '../../hooks/useResponsiveImage';
import { dessertsData } from '../../data/desserts';

/**
 * A subcomponent for rendering an individual order item in the checkout modal.
 * @param {Object} props
 * @param {Object} props.item - The cart item (name, quantity, price).
 */
export default function OrderItem({ item }) {
  // 1) Retrieve the dessert data from your dessert list
  const dessertData = dessertsData.find(d => d.name === item.name);

  // 2) Call the Hook at the top level of this component
  const responsiveSrc = useResponsiveImage(dessertData.image);

  // 3) Return the JSX for one "order item" row
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
