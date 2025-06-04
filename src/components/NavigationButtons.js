import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <div className="home-navigation">
      <button 
        onClick={() => navigate('/')}
      >
        🏠 Home
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
      >
        ← Back
      </button>
    </div>
  );
};

export const BackToTopButton = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
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

  return (
    <div 
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      title="Back to top"
    >
      ↑
    </div>
  );
};
