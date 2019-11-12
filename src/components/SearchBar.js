import React, {useState} from 'react'
import { faSearch, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar({value,onChange, prompt, style}){

   return(
   <div className='SearchBarContainer' style={style}>
       <FontAwesomeIcon className='searchIcon' icon={faSearch} />
       <input type='text' 
           className='SearchBar'
           onChange={(e)=>onChange(e.target.value)}
           placeholder={prompt}
           value={value}
       />
       <FontAwesomeIcon className='clearIcon' onClick={()=>onChange('')} icon={faTimes} />
    </div>
   )
}


SearchBar.defaultProps= {
  style:{}
}
