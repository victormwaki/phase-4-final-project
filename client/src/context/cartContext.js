import React, { createContext, useContext, useState } from 'react';

/**
 * The shape of items in the cart.
 * @typedef {Object} CartItem
 * @property {string} name
 * @property {string} category
 * @property {number} price
 * @property {Object} image
 * @property {number} quantity
 */

/**
 * CartContext used to share cart state throughout the app.
 */
const CartContext = createContext();

/**
 * Custom hook to easily access the cart context.
 * @returns {Object} - { cart, addItem, removeOneItem, removeAllOfItem, clearCart }
 */
export function useCart() {
  return useContext(CartContext);
}

/**
 * Provides cart-related state and methods to its children.
 * @param {Object} props
 * @param {JSX.Element} props.children
 */
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /**
   * Add a dessert item to the cart (or increment if it already exists).
   * @param {Object} dessert
   */
  function addItem(dessert) {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === dessert.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === dessert.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...dessert, quantity: 1 }];
    });
  }

  /**
   * Remove exactly one instance of the item from the cart.
   * @param {string} dessertName
   */
  function removeOneItem(dessertName) {
    setCart(prevCart => {
      const targetItem = prevCart.find(item => item.name === dessertName);
      if (!targetItem) return prevCart;

      if (targetItem.quantity === 1) {
        return prevCart.filter(item => item.name !== dessertName);
      }
      return prevCart.map(item =>
        item.name === dessertName
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }

  /**
   * Remove all instances of a specific item from the cart.
   * @param {string} dessertName
   */
  function removeAllOfItem(dessertName) {
    setCart(prevCart =>
      prevCart.filter(item => item.name !== dessertName)
    );
  }

  /**
   * Clear the entire cart (used after order confirmation).
   */
  function clearCart() {
    setCart([]);
  }

  const value = {
    cart,
    addItem,
    removeOneItem,
    removeAllOfItem,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
