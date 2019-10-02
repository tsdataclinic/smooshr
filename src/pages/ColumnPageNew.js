import React, {useState, useEffect} from 'react';
import SearchBar from '../components/SearchBar';
import EntryTable from '../components/EntryTable';
import MappingsArea from '../components/MappingsArea';
import useFuse from 'react-use-fuse';
import {suggestForMapping} from '../utils/text_clustering';
import {most_similar_to_category_mean} from '../utils/calc_embedings';

import {
  createMapping,
  renameMapping,
  addEntriesToMapping,
  addNegativeExampleToMapping,
  removeEntryFromMapping,
  deleteMapping,
  clearMapping,
  requestEmbedingsForEntries,
} from '../contexts/actions';
import {useStateValue, useMetaColumn} from '../contexts/app_context';

export default function ColumnPage({match}) {
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedMappingID, setSelectedMappingID] = useState(null);
  const [entrySelection, setEntrySelection] = useState([]); 
  const {projectID, datasetID, columnID} = match.params;

  const {meta_column,column, entries, mappings, embeddings, dispatch} = useMetaColumn(columnID);
  const selectedMapping = mappings.find(m => m.id == selectedMappingID);

  useEffect(() => {
    if (entries) {
      requestEmbedingsForEntries(entries, dispatch);
    }
  }, [JSON.stringify(entries)]);

  const non_mapped_entries = entries.filter(
    entry => !mappings.some(m => m.entries.includes(entry.name)),
  );

  const {result, search, term, reset} = useFuse({
    data: non_mapped_entries,
    options: {
      shouldSort: true,
      findAllMatches: true,
      keys: ['name'],
      caseSensitive: false,
    },
  });

  const filteredEntries = result;

  const toggleEnrtySelection = entry => {
    if (entrySelection.includes(entry.name)) {
      setEntrySelection(entrySelection.filter(s => s != entry.name));
    } else {
      setEntrySelection([...entrySelection, entry.name]);
    }
  };

  const onCreateMapping = () => {
    createMapping(entrySelection, columnID,entrySelection[0],  dispatch);
    setEntrySelection([]);
  };

  const onRenameMapping = (mapping, name) => {
    renameMapping(mapping, name, dispatch);
  };

  const onRemoveEntryFromMapping = (entry, mapping) => {
    removeEntryFromMapping(mapping, entry, dispatch);
  };

  const onClearMapping = mapping => {
    clearMapping(mapping, dispatch);
  };

  const onDeleteMapping = mapping => {
    deleteMapping(mapping, dispatch);
  };

  const onAddEntriesToMapping = (entriesToAdd, clearSelection = false) => {
    addEntriesToMapping(selectedMapping, entriesToAdd, dispatch);
    if (clearSelection) {
      setEntrySelection([]);
    }
  };

  const onAddNegativeExampleToMapping = entry => {
    addNegativeExampleToMapping(selectedMapping, entry, dispatch);
  };

  //Remove any entries that are already in a mapping


  const updateSearch = text => {
    setSearchTerm(text);
    search(text);
  };

  const suggestionsAvaliable = embeddings && selectedMapping;

  const meaningSuggestions = suggestionsAvaliable
    ? most_similar_to_category_mean(
        selectedMapping.entries,
        selectedMapping.negative_examples,
        non_mapped_entries,
        embeddings,
      )
    : [];

  const textSuggestions = suggestionsAvaliable
    ? suggestForMapping(selectedMapping.entries, non_mapped_entries)
    : [];

  const suggestions = {text: textSuggestions, meaning: meaningSuggestions};

  const {cache_loaded, _} = useStateValue();

  const stats = {
    mappings: mappings.length,
    total_rows: entries.reduce((total, e) => total + e.count, 0),
    total_mapped_rows: mappings
      .map(
        m =>
          m.entries.reduce(
            (total, entry) => total + entries.find(e => e.name === entry).count
          ,0)
      )
      .reduce((total, map) => total + map, 0),
    total_entries_in_mappings: mappings.reduce(
      (total, m) => total + m.entries.length,
      0,
    ),
  };
   
  console.log('stats is ', stats)

  if (!cache_loaded) {
    return (
      <div className="ColumnPage">
        <SearchBar
          style={{gridArea: 'header', width: '50%', justifySelf: 'center'}}
          onChange={updateSearch}
          onClear ={()=>updateSearch('')}
          value={searchTerm}
        />
        <EntryTable
          entries={filteredEntries}
          style={{
            gridArea: 'table',
            overflowY: 'scroll',
            width: '100%',
            height: '100%',
          }}
          onToggleSelection={toggleEnrtySelection}
          selection={entrySelection}
          {...entries}
        />
        <div className="StatsAndActions">
          <div className="stats">
            <p>
              <span>{stats.total_entries_in_mappings}</span> / <span>{entries.length}</span> entries |{' '}
              <span>{stats.total_mapped_rows}</span> / <span>{stats.total_rows}</span> rows
            </p>
          </div>
          <div className="entryActionButtons">
            <button
              disabled={entrySelection.length == 0}
              onClick={onCreateMapping}>
              New Mapping {entrySelection.length}
            </button>

            <button
              disabled={entrySelection.length == 0}
              onClick={() => onAddEntriesToMapping(entrySelection, true)}>
              Add to Mapping
            </button>
            <button
              onClick={() => createMapping(non_mapped_entries, columnID, 'Other', dispatch)}>
              Map Remaining To Other 
            </button>
          </div>
        </div>
        <MappingsArea
          mappings={mappings}
          selection={mappings.find(m => m.id === selectedMappingID)}
          style={{gridArea: 'mappings'}}
          onMappingSelected={s => setSelectedMappingID(s.id)}
          onRenameMapping={onRenameMapping}
          onRemoveEntryFromMapping={onRemoveEntryFromMapping}
          onDeleteMapping={onDeleteMapping}
          onClearMapping={onClearMapping}
          suggestions={suggestions}
          onAddSuggestionToMapping={suggestion =>
            onAddEntriesToMapping([suggestion])
          }
          onAddNegativeExampleToMapping={onAddNegativeExampleToMapping}
          {...mappings}
          syle={{height: '300px'}}
        />
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
