import { useEffect, useState } from 'react';

/**
 * Custom hook to pick the correct image src based on the viewport width.
 * @param {Object} imageObj - An object containing mobile, tablet, and desktop image URLs.
 * @returns {string} - The appropriate image URL.
 */
export default function useResponsiveImage(imageObj) {
  const [src, setSrc] = useState(imageObj.desktop);

  useEffect(() => {
    function updateImageSource() {
      const width = window.innerWidth;
      if (width <= 480) {
        setSrc(imageObj.mobile);
      } else if (width <= 768) {
        setSrc(imageObj.tablet);
      } else {
        setSrc(imageObj.desktop);
      }
    }

    // Update on mount
    updateImageSource();

    // Update on resize (debounced)
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateImageSource, 300);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imageObj]);

  return src;
}
