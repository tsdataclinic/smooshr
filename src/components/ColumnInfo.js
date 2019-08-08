import React from 'react'
import ColumnEntrySummary from './ColumnEntrySummary'

export default function ColumnInfo(props){
   const {name,type,entries} = props

   return(
     <div className='column_info'>
        <h2>{name}</h2>
        <div className='column_info_stats'>
            <span>Total: 200</span>
            <span>Unique: 200</span>
            <span>Type: Text</span>
        </div>

        {/*<h3>Entries</h3> 
        <ul>
            {entries.map((entry)=>(
               <li>
                 <ColumnEntrySummary entry={entry}/>
               </li>
            ))}
        </ul>*/}
     </div>
   )
}
