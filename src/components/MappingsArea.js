import React from 'react';
import MappingFocus from './MappingFocus';
import MappingsMenu from './MappingsMenu';

export default function MappingsArea({
  mappings,
  selection,
  onMappingSelected,
  onRenameMapping,
  onRemoveEntryFromMapping,
  onDeleteMapping,
  onClearMapping,
  onAddEntryToMapping,
  onAddSuggestionToMapping,
  onAddNegativeExampleToMapping,
  suggestions,
  style,
}) {
  return (
    <div className="MappingsArea" style={style}>
      <MappingsMenu
        mappings={mappings}
        selected={selection}
        onMappingSelected={onMappingSelected}
      />
      {selection && (
        <MappingFocus
          mapping={selection}
          onRemoveEntryFromMapping={onRemoveEntryFromMapping}
          onRenameMapping={onRenameMapping}
          onDeleteMapping={onDeleteMapping}
          onClearMapping={onClearMapping}
          onAddEntryToMapping={onAddEntryToMapping}
          onAddSuggestionToMapping={onAddSuggestionToMapping}
          suggestions={suggestions}
          onAddNegativeExampleToMapping={onAddNegativeExampleToMapping}
        />
      )}
    </div>
  );
}

MappingsArea.defaultProps = {
  style: {},
};
