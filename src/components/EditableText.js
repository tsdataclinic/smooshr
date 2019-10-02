import React, {useState,useEffect} from 'react'

import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


export default function EditableText({text, onUpdate}){
  const [localText, setLocalText] = useState(text)
  const [editing, setEditing] = useState(false)

  useEffect(()=>{
     setLocalText(text)
  },[text])

  return  editing ? 
      <input onChange={(e)=>setLocalText(e.target.value)} onBlur={()=> { setEditing(false); onUpdate(localText)  } } value={localText} /> 
    : 
    
      <h3>
          {localText} <FontAwesomeIcon onClick={()=>setEditing(true)} icon={faEdit} />
      </h3>
    
    
}
