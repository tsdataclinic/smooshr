import React, { useState } from 'react'
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function DropDownMenu({ onChange, options, prompt }) {
  const showDropDown = () => {
    setShowDropdown(true)
  }

  const selectOption = (option) => {
    setShowDropdown(false)
    setSelected(option)
    if (onChange) {
      onChange(option)
    }
  }

  const [show, setShowDropdown] = useState(false)
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="order-by">
      <p>{prompt} </p>
      <ul>
        <li onClick={showDropDown}>{selected} <FontAwesomeIcon icon={faSortDown} /> </li>
        {options.filter(o => o != selected && show).map(o => <li
          onClick={() => selectOption(o)}
        >{o}</li>)}
      </ul>
    </div>
  )

}

DropDownMenu.defaultProps = {
  options: [],
  prompt: 'select:'
}
