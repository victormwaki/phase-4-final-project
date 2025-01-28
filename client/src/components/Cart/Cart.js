import React from 'react';
import { useCart } from '../../context/cartContext';
import CartItem from './CartItem';
import '../../styles/Cart.css';

/**
 * Renders the entire cart, including items, total price, and a checkout button.
 * If cart is empty, displays an illustration and text.
 * @param {Object} props
 * @param {Function} props.onCheckout - Callback to open the checkout modal.
 */
export default function Cart({ onCheckout }) {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">
          Your Cart (<span id="cart-quantity">{totalItems}</span>)
        </h2>
      </div>
      <div className="cart-items" id="cart-items">
        {cart.length === 0 ? (
          <div>
            <img
              src="/assets/images/illustration-empty-cart.svg"
              alt="Empty cart illustration"
              className="illustration-empty-cart"
            />
            <p className="cart-empty-text">Your added items will appear here</p>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <CartItem key={item.name} item={item} />
            ))}

            <div className="cart-total">
              <p className="total-text">Order Total</p>
              <p className="total-price">${totalPrice}</p>
            </div>

            <div className="cart-note">
              <img
                src="/assets/images/icon-carbon-neutral.svg"
                alt="carbon neutral icon"
                className="icon-carbon-neutral"
              />
              <p>
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>

            <button className="checkout-button" onClick={onCheckout}>
              Confirm Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
