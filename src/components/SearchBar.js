import React from 'react'
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar({ value, onChange, prompt, style }) {

  return (
    <div className='search-bar-container' style={style}>
      <FontAwesomeIcon className='search-icon' icon={faSearch} />
      <input type='text'
        className='search-bar'
        onChange={(e) => onChange(e.target.value)}
        placeholder={prompt}
        value={value}
      />
      <FontAwesomeIcon className='clear-icon' onClick={() => onChange('')} icon={faTimes} />
    </div>
  )
}


SearchBar.defaultProps = {
  style: {}
}
