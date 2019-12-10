import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditableText from './EditableText';

export default function MappingFocus({
  mapping,
  onRemoveEntryFromMapping,
  onRenameMapping,
  onClearMapping,
  onDeleteMapping,
  onAddSuggestionToMapping,
  onAddNegativeExampleToMapping,
  suggestions,
  style,
}) {
  const [suggestionType, setSuggestionType] = useState('text');

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

  const clearMapping = name => {
    if (onClearMapping) {
      onClearMapping(mapping);
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
    <div className="MappingFocus" style={style}>
      <EditableText text={mapping.name} onUpdate={updateMappingName} />
      <div className="IncludeList">
        <h4>Includes</h4>
        <ul>
          {mapping.entries.map(entry => (
            <li>
              {entry}{' '}
              <button
                onClick={() => removeEntryFromMapping(entry)}
                className={'SmallButton RoundButton'}>
                <FontAwesomeIcon icon={faTimes} />{' '}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="KeywordMatch">
        <h4>
          Suggestions by:{' '}
          <span
            style={
              suggestionType === 'text'
                ? { fontWeight: 'bold' }
                : { fontWeight: 'lighter' }
            }
            onClick={() => setSuggestionType('text')}>
            text
          </span>{' '}
          /{' '}
          <span
            style={
              suggestionType === 'meaning'
                ? { fontWeight: 'bold' }
                : { fontWeight: 'lighter' }
            }
            onClick={() => setSuggestionType('meaning')}>
            meaning
          </span>
        </h4>
        <ul>
          {suggestionsByType.map(entry => (
            <li>
              {entry.suggestion}{' '}
              <div className="SuggestionActionButtons">
                <button
                  className={'SmallButton RoundButton'}
                  onClick={() => addSuggestionToMapping(entry)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className={'SmallButton RoundButton'}
                  onClick={() => addNegativeExampleToMapping(entry)}
                >
                  <FontAwesomeIcon
                    icon={faTimes} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={'ActionButtons'}>
        <button onClick={clearMapping} className={'MidButton'}>
          Clear Mapping
        </button>
        <button onClick={deleteMapping} className={'MidButton'}>
          Delete Mapping
        </button>
      </div>
    </div>
  );
}

MappingFocus.defaultProps = {
  style: {},
  meaningSuggestions: [],
  textSuggestions: [],
};
