import { useState, useEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Initialize with the current window size
    const updateSize = () => {
      setScreenWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    // Add event listener for window resize
    window.addEventListener('resize', updateSize);
    
    // Call once to set initial size
    updateSize();
    
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { isMobile, isTablet, screenWidth };
}