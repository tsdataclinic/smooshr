import React from 'react';

import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MappingsMenu({
  mappings = [],
  selected,
  onMappingSelected,
  onDeleteMapping,
  style
}) {

  const mappingSelected = (mapping) => {
    if (onMappingSelected) {
      onMappingSelected(mapping)
    }
  }

  return (
    <div className="mappings-menu" style={style}>
      <h3>
        Groups
      </h3>
      <ul>
        {mappings.map(mapping => (
          <li
            className={
              selected && mapping.name === selected.name ? 'selected' : ''
            }
            onClick={() => mappingSelected(mapping)}>
            <span>
              {mapping.name}
            </span>
            <FontAwesomeIcon onClick={() => onDeleteMapping(mapping)} className='remove-button' icon={faTimesCircle} />
          </li>
        ))}
      </ul>
    </div>
  );
}

MappingsMenu.defaultProps = {
  mappings: [],
  style: {},
};
