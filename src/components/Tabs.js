import React, {useState} from 'react';

export default function Tabs({options, selected, onSelected}) {
  console.log('SELECTED ', selected)
  return (
    <div className="Tabs">
      {options.map(option => (
        <p
          className={`Tab ${selected === option ? 'selected' : ''} `}
          key={option}
          onClick={()=>onSelected(option)}>
          {option}
        </p>
      ))}
    </div>
  );
}
