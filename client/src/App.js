import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Import Router and Routes
import { CartProvider } from './context/cartContext'; // Your Cart context provider
import DessertList from './components/DessertList/DessertList'; // Dessert List Page
import Cart from './components/Cart/Cart'; // Cart Component
import CheckoutModal from './components/Modal/CheckoutModal'; // Checkout Modal
import Checkout from './components/Checkout'; // Checkout Page
import DessertDetails from './components/DessertDetails'; // Dessert Detail Page
import Navbar from './components/Navbar'; // Navbar for navigation
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'; // ScrollToTopButton
import './styles/App.css';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  // Open the checkout modal
  function handleCheckout() {
    setModalOpen(true);
  }

  // Close the checkout modal
  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <CartProvider>
      <Router>
        <Navbar /> {/* Include Navbar so it's available across all pages */}
        <main className="main">
          <div className="main-container">
            <h1 className="title">Desserts</h1>

            {/* Switch component will ensure only one route is displayed at a time */}
            <Switch>
              <Route path="/" exact>
                <DessertList /> {/* Main page with the dessert list */}
              </Route>
              <Route path="/desserts/:id" component={DessertDetails} /> {/* Dessert details page */}
              <Route path="/checkout">
                <Checkout /> {/* Checkout page */}
              </Route>
            </Switch>
          </div>

          {/* Cart and checkout modal */}
          <Cart onCheckout={handleCheckout} />

          <CheckoutModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </main>

        {/* Scroll-to-top button */}
        <ScrollToTopButton />

        {/* Footer */}
        {/* <footer>
          <div className="attribution">
            Challenge by{' '}
            <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>. Coded by <a href="#">victormwaki</a>.
          </div>
        </footer> */}
      </Router>
    </CartProvider>
  );
}

export default App;
