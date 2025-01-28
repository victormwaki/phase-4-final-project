import React, { useEffect, useState } from 'react';
import '../../styles/ScrollToTopButton.css';

/**
 * A button that appears when user scrolls down,
 * and scrolls the window to the top upon click.
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!isVisible) return null;

  return (
    <button className="scroll-top-button" onClick={scrollToTop}>
      <img src="/assets/images/icon-arrow-up.svg" alt="Scroll to top icon" />
    </button>
  );
}
