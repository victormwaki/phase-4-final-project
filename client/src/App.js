import React, { useState } from 'react';
import { CartProvider } from './context/cartContext';
import DessertList from './components/DessertList/DessertList';
import Cart from './components/Cart/Cart';
import CheckoutModal from './components/Modal/CheckoutModal';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';
import './styles/App.css';

/**
 * Main Application component. 
 * Renders a list of desserts, a cart, and a checkout modal.
 * Uses a CartProvider for global cart state.
 */
function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  /**
   * Opens the checkout modal.
   */
  function handleCheckout() {
    setModalOpen(true);
  }

  /**
   * Closes the checkout modal.
   */
  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <CartProvider>
      <main className="main">
        <div className="main-container">
          <h1 className="title">Desserts</h1>
          <DessertList />
        </div>

        <Cart onCheckout={handleCheckout} />

        {/* Checkout modal */}
        <CheckoutModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </main>

      {/* Scroll-to-top button */}
      <ScrollToTopButton />

      {/* <footer>
        <div className="attribution">
          Challenge by{' '}
          <a href="https://www.frontendmentor.io?ref=challenge">   "my footer"
            Frontend Mentor
          </a>. Coded by <a href="#">devkilyungi</a>.
        </div>
      </footer> */}
    </CartProvider>
  );
}

export default App;
