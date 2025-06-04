import React, { useState } from 'react';

/**
 * ExpandableCode component for collapsible code sections
 * @param {Object} props
 * @param {string} props.title - Title of the code section
 * @param {React.ReactNode} props.children - Code content
 */
const ExpandableCode = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="expandable-code">
      <div 
        className="expandable-header" 
        onClick={() => setExpanded(!expanded)}
      >
        <span>{title}</span>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      {expanded && (
        <div className="expandable-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableCode;
