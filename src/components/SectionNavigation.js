import React from 'react';

/**
 * Section navigation component for tutorials
 * @param {Object} props
 * @param {string} props.prevSection - ID of previous section
 * @param {string} props.nextSection - ID of next section
 * @param {string} props.prevTitle - Title of previous section
 * @param {string} props.nextTitle - Title of next section
 */
const SectionNavigation = ({ prevSection, nextSection, prevTitle, nextTitle }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="section-navigation">
      {prevSection && (
        <button 
          className="section-nav-button prev"
          onClick={() => scrollToSection(prevSection)}
        >
          ← Previous: {prevTitle}
        </button>
      )}
      
      {nextSection && (
        <button 
          className="section-nav-button next"
          onClick={() => scrollToSection(nextSection)}
        >
          Next: {nextTitle} →
        </button>
      )}
    </div>
  );
};

export default SectionNavigation;
