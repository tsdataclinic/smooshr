import React from 'react'


export default function GroupDescription(props){
  const {name,description,unique_entries, no_rows} = props

  return (
    <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Unique entries: {unique_entries} total rows: {no_rows}</p>
    </div>
  )
}
