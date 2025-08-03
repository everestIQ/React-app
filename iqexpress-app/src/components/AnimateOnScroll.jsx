// src/components/AnimateOnScroll.jsx

import React, { useState, useEffect, useRef } from 'react';

const AnimateOnScroll = ({ children, animationClass }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // `entry.isIntersecting` is true when the element is in the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null, // The viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div
      ref={elementRef}
      className={`animated-element ${isVisible ? animationClass : ''}`}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;