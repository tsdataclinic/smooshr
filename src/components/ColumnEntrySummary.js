import React from 'react'

export default function ColumnEntrySummary({name,entries}){
   return(
     <div className='column_entry_summary'>
      <span>{name}</span>
      <span>{entries}</span>
     </div>
   )
}

ColumnEntrySummary.defaultProps= {
  name: 'test',
  entries: 23,
  percent: ''
}
