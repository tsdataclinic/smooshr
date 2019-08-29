import React from 'react';
import {Link} from 'react-router-dom';

export default function SideList({title, entries, actionPrompt, actionLink}) {
  console.log('entries are ', entries )
  return (
    <div className="sidebarlist">
      <h3>{title}</h3>

      <ul style={{flex:1}}>
        {entries && entries.map(entry => (
            <li>{entry}</li>
        ))}
      </ul>
      <Link style={{padding:'14px'}} to={actionLink}>
              {actionPrompt}
      </Link>
    </div>
  );
}
