import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import EditableText from './EditableText'
import {Link} from 'react-router-dom'

export default function ColumnCard({
  name,
  description,
  id,
  fromColumns,
  selected,
  onClick,
  onUpdate,
  link
}) {

  const total_unique = fromColumns.reduce( (tot,c)=> tot+c.unique, 0)
  return (
    <div
      onClick={onClick}
      className={`column-card card ${selected ? 'selected' : ''}`}>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <EditableText text={name} onUpdate={onUpdate} /> 
           <h2>{total_unique}</h2>
      </div>
      <p className="description">{description}</p>

      {fromColumns.map(c => (
        <p>
          {c.name} | {c.dataset.name}
        </p>
      ))}

      <Link to={link}><p>Work on mappings</p></Link>
    </div>
  );
}
