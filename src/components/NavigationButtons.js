import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaArrowRight, FaArrowUp } from 'react-icons/fa';

export const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <div className="home-navigation">
      <button 
        onClick={() => navigate('/')}
        className="navigation-button home-button"
        aria-label="Go to home page"
      >
        <FaHome className="button-icon" /> Home
      </button>
    </div>
  );
};

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="back-navigation">
      <button 
        onClick={() => navigate(-1)} 
        className="navigation-button back-button"
        aria-label="Go back to previous page"
      >
        <FaArrowLeft className="button-icon" /> Back
      </button>
    </div>
  );
};

export const NextButton = ({ to, label = "Next" }) => {
  const navigate = useNavigate();
  
  // Use consistent approach with navigation
  return (
    <div className="next-navigation" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button
        onClick={() => navigate(to)}
        className="navigation-button next-button"
        aria-label={`Go to ${label}`}
      >
        {label} <FaArrowRight className="button-icon" />
      </button>
    </div>
  );
};

export const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Don't render if not visible
  if (!visible) return null;

  return (
    <button 
      className="back-to-top-button"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <FaArrowUp className="button-icon" />
    </button>
  );
};

// New component that combines next and back buttons
export const NavigationControls = ({ prevPath, nextPath, prevLabel = "Back", nextLabel = "Next" }) => {
  return (
    <div className="navigation-controls">
      {prevPath && (
        <BackButton />
      )}
      {nextPath && (
        <NextButton to={nextPath} label={nextLabel} />
      )}
    </div>
  );
};
