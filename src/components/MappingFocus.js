import React, { useState } from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toggle from './Toggle'
import EditableText from './EditableText';

export default function MappingFocus({
  mapping,
  onRemoveEntryFromMapping,
  onRenameMapping,
  onDeleteMapping,
  onAddSuggestionToMapping,
  onAddNegativeExampleToMapping,
  suggestions,
  style,
}) {
  const [suggestionType, setSuggestionType] = useState('meaning');

  const removeEntryFromMapping = entry => {
    if (onRemoveEntryFromMapping) {
      onRemoveEntryFromMapping(entry, mapping);
    }
  };

  const addSuggestionToMapping = entry => {
    if (onAddSuggestionToMapping) {
      onAddSuggestionToMapping(entry.suggestion);
    }
  };

  const updateMappingName = name => {
    if (onRenameMapping) {
      onRenameMapping(mapping, name);
    }
  };

  const deleteMapping = name => {
    if (onDeleteMapping) {
      onDeleteMapping(mapping);
    }
  };

  const addNegativeExampleToMapping = (entry) => {

    if (onAddNegativeExampleToMapping) {
      onAddNegativeExampleToMapping(entry.suggestion)
    }
  }

  const suggestionsByType = suggestions[suggestionType];

  return (
    <div className="mapping-focus" style={style}>
      <div className='group-name'>
        <EditableText text={mapping.name} onUpdate={updateMappingName} />
      </div>
      <div className='toggle'>
        <Toggle prompt={"Suggested matches by:"} entries={['meaning', 'text']} onChange={setSuggestionType} />
      </div>
      <div className="include-list">
        <h4>Group Includes</h4>
        <ul>
          {mapping.entries.map(entry => (
            <li>
              <span title={entry}>{entry}</span>
              <div className="SuggestionActionButtons">

                <FontAwesomeIcon
                  className='remove-button'
                  onClick={() => removeEntryFromMapping(entry)}
                  icon={faTimesCircle} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* 
      <div className="full-toggle">
        <Toggle entries={['Includes', "Text", "Meaning"]} />
      </div> */}

      <div className="keyword-match">
        <h4>You might want to add</h4>
        <ul>
          {suggestionsByType.map(entry => (
            <li>
              <span title={entry.suggestion}>{entry.suggestion}</span>
              <div className="SuggestionActionButtons">

                <FontAwesomeIcon
                  className='add-button'
                  onClick={() => addSuggestionToMapping(entry)}
                  icon={faCheckCircle} />

                <FontAwesomeIcon
                  className='remove-button'
                  onClick={() => addNegativeExampleToMapping(entry)}
                  icon={faTimesCircle} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className={'ActionButtons'}>
        <button onClick={clearMapping} className={'mid-button'}>
          Clear Mapping
        </button>
        <button onClick={deleteMapping} className={'mid-button'}>
          Delete Mapping
        </button>
      </div> */}
    </div>
  );
}

MappingFocus.defaultProps = {
  style: {},
  meaningSuggestions: [],
  textSuggestions: [],
};
