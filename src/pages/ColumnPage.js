import React, {useState} from 'react';
import {useStateValue} from '../contexts/app_context';
import {guessGroupingsLevenshteinHClust} from '../utils/text_clustering';
import EditableText from '../components/EditableText';
import TSNEPlot from '../components/TSNEPlot';
import {suggestForMapping} from '../utils/text_clustering';
import {calc_embedings, tsne_coords, most_similar_to_category_mean} from '../utils/calc_embedings';
import useFuse from 'react-use-fuse';
const uuidv1 = require('uuid/v1');

export default function ColumnPage({match}) {
  const [
    {datasets, cache_loaded, columns, mappings, entries},
    dispatch,
  ] = useStateValue();

  const [searchTerm, setSearchTerm] = useState(null);
  const [selection, setSelection] = useState([]);

  const [mappingSuggestions, setMappingSuggestions] = useState([]);

  const [hideMapped, setHideMapped] = useState(true);
  const [activeMappingID, setActiveMappingID] = useState(null);

  const {datasetID, columnID} = match.params;
  const dataset = datasets.find(d => d.id === datasetID);
  const column = columns.find(c => c.id === columnID);

  const [embedings, setEmbedings] = useState(null);

  const mappingsForColumn = mappings.filter(m => m.column_id === columnID);

  console.log('mappings ', mappingsForColumn);

  const entriesForColumnAll = entries
    .filter(e => e.column_id === columnID)

  const entriesForColumn = entriesForColumnAll
    .filter(e =>
      hideMapped
        ? !mappingsForColumn.some(m => m.entries.includes(e.name))
        : true,
    );

  const guessGroupings = () => {
    let {assignments, mappings} = guessGroupingsLevenshteinHClust(
      Object.keys(column.entries),
    );
  };

  const suggestForMappingWithEmbedings = (mapping_entries, all_entries,embeddings)=>{
    return most_similar_to_category_mean(mapping_entries,all_entries,embeddings) 
  }

  const calcEmbedings = () => {
    calc_embedings(entriesForColumnAll).then(result => {
      setEmbedings(result)
  })}

  const {result, search, term, reset} = useFuse({
    data: entriesForColumn,
    options: {
      shouldSort: true,
      findAllMatches: true,
      keys: ['name'],
      caseSensitive: false,
    },
  });

  const updateSearch = text => {
    setSearchTerm(text);
    search(text);
  };

  const toggleEntitySelection = entity => {
    if (selection.includes(entity.name)) {
      setSelection(selection.filter(eName => eName !== entity.name));
    } else {
      setSelection([...selection, entity.name]);
    }
  };

  const newMappingFromSelection = () => {
    const id = uuidv1();

    dispatch({
      type: 'ADD_MAPPING',
      payload: {
        name: selection[0],
        entries: selection,
        column_id: columnID,
        id,
      },
    });
    setSelection([]);
  };

  const addEntitiesToMapping = (selectedEntities, mappingID) => {
    const activeMapping = mappings.find(m => m.id === mappingID);
    dispatch({
      type: 'UPDATE_MAPPING',
      payload: {
        id: mappingID,
        mapping: {entries: [...activeMapping.entries, ...selectedEntities]},
      },
    });
    setSelection([]);
  };

  const updateMappingName = (mappingID, name) => {
    console.log('updating mapping id ', mappingID, name);
    dispatch({
      type: 'UPDATE_MAPPING',
      payload: {
        id: mappingID,
        mapping: {name},
      },
    });
  };

  const deleteMapping = mappingID => {
    dispatch({
      type: 'DELETE_MAPPING',
      payload: mappingID,
    });
  };

  const removeEntriesFromMapping = (mapping, entries) => {
    console.log('mapping is ', mapping.id, entries, mapping);
    dispatch({
      type: 'UPDATE_MAPPING',
      payload: {
        id: mapping.id,
        mapping: {
          entries: mapping.entries.filter(e => !entries.includes(e)),
        },
      },
    });
  };
  console.log('selection is ', selection);

  const inMappings = mappingsForColumn.reduce(
    (r, map) => r + map.entries.length,
    0,
  );
  return cache_loaded ? (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <div classname="entites" style={{flex: 1}}>
        <h3 style={{marginBottom: '20px'}}>
          Entries for {column.name}. You have mapped of {inMappings} of{' '}
          {entriesForColumn.length} entries
        </h3>
        <div className="search">
          <input
            placeholder={'filter'}
            value={searchTerm}
            onChange={e => updateSearch(e.target.value)}
          />
          <div>
            Hide already mapped:{' '}
            <input
              checked={hideMapped}
              onChange={e => setHideMapped(e.target.checked)}
              type="checkbox"
            />
          </div>
        </div>
        <div className="entityGrid">
          {result.map(e => (
            <p
              onClick={() => toggleEntitySelection(e)}
              key={e.name}
              style={{
                fontWeight: selection.includes(e.name) ? 'bold' : 'normal',
                cursor: 'pointer',
              }}>
              {e.name} : {e.count}
            </p>
          ))}
        </div>
      </div>

      <div style={{flex: 1}}>
        <h2>Mappings</h2>
        <div className="buttons">
          <button onClick={calcEmbedings}> Calc Embedings</button>
          <button
            onClick={() => addEntitiesToMapping(selection, activeMappingID)}>
            Add Selection To Mapping
          </button>
          <button onClick={newMappingFromSelection}>
            Creat New Mapping from selection
          </button>
        </div>
        <div className="mappings">
          {mappingsForColumn.map(mapping => (
            <div
              onClick={() => setActiveMappingID(mapping.id)}
              className={`mapping ${
                mapping.id === activeMappingID ? 'active' : ''
              }`}>
              <span>
                <EditableText
                  text={mapping.name}
                  onUpdate={text => updateMappingName(mapping.id, text)}
                />
                <span onClick={() => deleteMapping(mapping.id)}>X</span>
              </span>
              {mapping.entries.map(entry => (
                <p>
                  {entry}{' '}
                  <span
                    onClick={() => removeEntriesFromMapping(mapping, [entry])}
                    className="RemoveEntry"
                    style={{cursor: 'pointer'}}>
                    X
                  </span>
                </p>
              ))}
              <hr />
              <p style={{fontWeight: 'bold'}}>Similar Words</p>

              {suggestForMapping(mapping.entries, entriesForColumn).map(
                suggestion => (
                  <p
                    style={{cursor: 'pointer'}}
                    onClick={() =>
                      addEntitiesToMapping([suggestion.suggestion], mapping.id)
                    }>
                    {suggestion.suggestion}
                  </p>
                ),
              )}
              <p style={{fontWeight: 'bold'}}>Similar Meanings</p>

              {embedings && 
                  suggestForMappingWithEmbedings(mapping.entries, entriesForColumn, embedings).map(
                    suggestion => (
                      <p
                        style={{cursor: 'pointer'}}
                        onClick={() =>
                          addEntitiesToMapping([suggestion.suggestion], mapping.id)
                        }>
                        {suggestion.suggestion}
                      </p>
                    )
              )}
              
            </div>
          ))}
        </div>
      </div>
      {embedings && false && <TSNEPlot data={embedings} />}
    </div>
  ) : (
    <h1>Loading </h1>
  );
}
