// src/components/Modal/CheckoutModal.js
import React from 'react';
import { useCart } from '../../context/cartContext';
import OrderItem from './OrderItem'; 
import '../../styles/CheckoutModal.css';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, clearCart } = useCart();
  if (!isOpen) return null;

  const totalPrice = cart
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  function handleClose() {
    clearCart();
    onClose();
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="overlay open" onClick={handleClose} />
      <div className="modal-content">
        <img
          src="/assets/images/icon-order-confirmed.svg"
          alt="Order confirmed icon"
        />
        <h2>Order Confirmed</h2>
        <p id="subtitle">We hope you enjoy your food!</p>

        <div id="order-list" className="order-list">
          {/* Use the subcomponent for each item in the cart */}
          {cart.map(item => (
            <OrderItem key={item.name} item={item} />
          ))}

          <div className="modal-total-price">
            <p className="total-text">Order Total</p>
            <p className="total-price">${totalPrice}</p>
          </div>
        </div>

        <button
          id="close-modal-button"
          className="close-modal"
          onClick={handleClose}
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}
