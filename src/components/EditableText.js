import React, {useState} from 'react'


export default function EditableText({text, onUpdate}){
  const [localText, setLocalText] = useState(text)
  const [editing, setEditing] = useState(false)


  return  editing ? 
      <input onChange={(e)=>setLocalText(e.target.value)} onBlur={()=> {console.log('lost focus'); setEditing(false); onUpdate(localText)  } } value={localText} /> 
    : <h3 onClick={()=>setEditing(true)}>{localText}</h3>
    
}
