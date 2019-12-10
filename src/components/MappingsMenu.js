import React from 'react';

export default function MappingsMenu({
  mappings = [],
  selected,
  onMappingSelected,
  style
}) {

  const mappingSelected = (mapping) => {
    if (onMappingSelected) {
      onMappingSelected(mapping)
    }
  }

  return (
    <div class="MappingsMenu" style={style}>
      <h3>
        Merged Groups <span class="Pill">{mappings.length}</span>{' '}
      </h3>
      <ul>
        {mappings.map(mapping => (
          <li
            className={
              selected && mapping.name === selected.name ? 'selected' : ''
            }
            onClick={() => mappingSelected(mapping)}>
            {mapping.name}
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
