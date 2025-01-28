import React from 'react';
import { useCart } from '../../context/cartContext';

/**
 * Represents an individual cart line item showing name, quantity, and price.
 * Also includes a remove button to remove all instances of this item.
 * @param {Object} props
 * @param {Object} props.item - The cart item (including name, price, quantity).
 */
export default function CartItem({ item }) {
  const { removeAllOfItem } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-left">
        <p className="item-name">{item.name}</p>
        <p className="item-details">
          <span className="item-quantity">{item.quantity}x</span> @
          <span className="item-price">${item.price.toFixed(2)}</span>
          <span className="item-total">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </p>
      </div>
      <div className="cart-item-right">
        <button
          className="remove-button"
          onClick={() => removeAllOfItem(item.name)}
        >
          <img
            src="/assets/images/icon-remove-item.svg"
            alt="Remove icon"
            className="icon-remove-item"
          />
        </button>
      </div>
    </div>
  );
}
