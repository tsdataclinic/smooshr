import React from 'react';

export default function Tabs({ options, selected, onSelected }) {
  return (
    <div className="Tabs">
      {options.map(option => (
        <p
          className={`Tab ${selected === option ? 'selected' : ''} `}
          key={option}
          onClick={() => onSelected(option)}>
          {option}
        </p>
      ))}
    </div>
  );
}