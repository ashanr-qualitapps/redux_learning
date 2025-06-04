import React from 'react';

/**
 * Table of Contents component for tutorials
 * @param {Object} props
 * @param {Array} props.sections - Array of section objects with id and title
 */
const TutorialTOC = ({ sections }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="tutorial-toc">
      <h4>Table of Contents</h4>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TutorialTOC;
