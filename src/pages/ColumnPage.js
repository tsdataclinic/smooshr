import React, {useState} from 'react';
import {useStateValue} from '../contexts/app_context';
import {guessGroupingsLevenshteinHClust} from '../utils/text_clustering';
import EditableText from '../components/EditableText';
const uuidv1 = require('uuid/v1');

export default function ColumnPage({match}) {
  const [
    {datasets, cache_loaded, columns, mappings, entries},
    dispatch,
  ] = useStateValue();
  const [searchTerm, setSearchTerm] = useState(null);
  const [selection, setSelection] = useState([]);
  const [activeMappingID, setActiveMappingID] = useState(null);

  const {datasetID, columnID} = match.params;
  const dataset = datasets.find(d => d.id === datasetID);
  const column = columns.find(c => c.id === columnID);

  const mappingsForColumn = mappings.filter(m => m.column_id === columnID);

  const toggleEntitySelection = entity => {
    if (selection.includes(entity.name)) {
      setSelection(selection.filter(eName => eName !== entity.name));
    } else {
      setSelection([...selection, entity.name]);
    }
  };

  const newMappingFromSelection = () => {
    dispatch({
      type: 'ADD_MAPPING',
      payload: {
        name: selection[0],
        entries: selection,
        column_id: columnID,
        id: uuidv1(),
      },
    });
    setSelection([]);
  };

  const addEntitiesToMapping =() => {
    const activeMapping = mappings.find(m=> m.id  === activeMappingID)
    dispatch({
      type: 'UPDATE_MAPPING',
      payload: {
        id: activeMappingID,
        mapping: {entries: [...activeMapping.entries, ...selection]},
      },
    });
    setSelection([])
  };

  const updateMappingName = (mappingID, name) => {
    console.log('updating mapping id ', mappingID, name);
    dispatch({
      type: 'UPDATE_MAPPING',
      payload: {
        mapping_id: mappingID,
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
    console.log('mapping is ', mapping.id, entries, mapping)
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

  const entriesForColumn = entries
    .filter(e => e.column_id === columnID)
    .filter(e => (searchTerm ? e.name.includes(searchTerm) : true));

  const guessGroupings = () => {
    let {assignments, mappings} = guessGroupingsLevenshteinHClust(
      Object.keys(column.entries),
    );
  };

  return cache_loaded ? (
    <div style={{width: '100%', height: '100%'}}>
      <div class="control_panel">
        <h2>Entries for: {column.name}</h2>
        <div className="controls">
          <button onClick={guessGroupings}> Guess Categories</button>
          <button onClick={addEntitiesToMapping}>Add Selection To Mapping</button>
          <button onClick={newMappingFromSelection}>
            Creat New Mapping from selection
          </button>
          <div className="search">
            <input
              placeholder={'filter'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <span>Hide already mapped</span> <input type="checkbox" />
          </div>
        </div>
      </div>
      <div className="entityGrid">
        {entriesForColumn.map(e => (
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

      <div>
        <h2>Mappings</h2>
        <div className="mappings">
          {mappingsForColumn.map(mapping => (
            <div
                onClick={()=>setActiveMappingID(mapping.id)}
                className= {`mapping ${mapping.id === activeMappingID  ? 'active': ''}`}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading </h1>
  );
}
