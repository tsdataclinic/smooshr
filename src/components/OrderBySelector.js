import React, { useState } from "react";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderBySelector({ onChange }) {
  const showDropDown = () => {
    setShowDropdown(true);
  };

  const selectOption = (option) => {
    setShowDropdown(false);
    setSelected(option);
    if (onChange) {
      onChange(option);
    }
  };

  const [show, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState("Alphabetically");

  const options = ["Alphabetically", "Occurrences"];

  return (
    <div className="order-by">
      <p>Order By: </p>
      <ul>
        <li onClick={showDropDown}>
          {selected} <FontAwesomeIcon icon={faSortDown} />{" "}
        </li>
        {options
          .filter((o) => o !== selected && show)
          .map((o) => (
            <li onClick={() => selectOption(o)}>{o}</li>
          ))}
      </ul>
    </div>
  );
}
