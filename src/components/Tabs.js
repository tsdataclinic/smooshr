import React from 'react';

export default function Tabs({ options, selected, onSelected }) {
  return (
    <div className="tabs">
      {options.map(option => (
        <p
          className={`tab ${selected === option ? 'selected' : ''} `}
          key={option}
          onClick={() => onSelected(option)}>
          {option}
        </p>
      ))}
    </div>
  );
}