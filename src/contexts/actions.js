import { calc_embedings } from '../utils/calc_embedings';
const uuidv1 = require('uuid/v1');

export function createMapping(selection, columnID, name, dispatch) {
  const id = uuidv1();
  dispatch({
    type: 'ADD_MAPPING',
    payload: {
      name: name,
      entries: selection,
      negative_examples: [],
      column_id: columnID,
      id,
    },
  });
  return id;
}

export function renameMapping(mapping, newName, dispatch) {
  dispatch({
    type: 'UPDATE_MAPPING',
    payload: {
      mapping: {
        name: newName,
      },
      id: mapping.id,
    },
  });
}

export function loadProject(projectDetails, dispatch) {
  const {
    project,
    datasets,
    entries,
    columns,
    mappings,
    meta_columns,
  } = projectDetails;

  dispatch({
    type: 'ADD_OR_REPLACE_PROJECT',
    payload: project,
  });

  datasets.forEach(dataset => {
    dispatch({
      type: 'ADD_OR_REPLACE_DATASET',
      payload: dataset,
    });
  });

  columns.forEach(column => {
    dispatch({
      type: 'ADD_OR_REPLACE_COLUMN',
      payload: column,
    });
  });

  mappings.forEach(mapping => {
    dispatch({
      type: 'ADD_OR_REPLACE_MAPPING',
      payload: mapping,
    });
  });

  meta_columns.forEach(mc => {
    dispatch({
      type: 'ADD_OR_REPLACE_METACOLUMN',
      payload: mc,
    });
  });

  entries.forEach(entry => {
    console.log('entry ', entry);
    dispatch({
      type: 'ADD_OR_REPLACE_ENTRY',
      payload: entry,
    });
  });
}

export function removeEntryFromMapping(mapping, entry, dispatch) {
  console.log('mapping ', mapping, ' entry ', entry);
  dispatch({
    type: 'UPDATE_MAPPING',
    payload: {
      id: mapping.id,
      mapping: {
        entries: mapping.entries.filter(e => e !== entry),
      },
    },
  });
}

export function deleteMapping(mapping, dispatch) {
  dispatch({
    type: 'REMOVE_MAPPING',
    payload: mapping.id,
  });
}

export function clearMapping(mapping, dispatch) {
  dispatch({
    type: 'UPDATE_MAPPING',
    payload: {
      id: mapping.id,
      mapping: {
        entries: [],
      },
    },
  });
}

export function requestEmbedingsForEntries(entries, dispatch) {
  calc_embedings(entries).then(embeddings => {
    dispatch({
      type: 'ADD_EMBEDINGS',
      payload: embeddings,
    });
  });
}

export function addNegativeExampleToMapping(mapping, entry, dispatch) {
  dispatch({
    type: 'UPDATE_MAPPING',
    payload: {
      id: mapping.id,
      mapping: {
        negative_examples: [...mapping.negative_examples, entry],
      },
    },
  });
}
export function addEntriesToMapping(mapping, entries, dispatch) {
  dispatch({
    type: 'UPDATE_MAPPING',
    payload: {
      id: mapping.id,
      mapping: {
        entries: [...mapping.entries, ...entries],
      },
    },
  });
}

export function updateMetaColumn(id, changes, dispatch) {
  dispatch({
    type: 'UPDATE_META_COLUMN',
    payload: {
      id,
      meta_column: changes,
    },
  });
}

export function unMergeMetaColumn(meta_column, dispatch) {
  meta_column.columns.forEach(col_id => {
    dispatch({
      type: 'CREATE_META_COLUMN_FROM_COL_ID',
      payload: {
        col_id,
        id: uuidv1(),
        project_id: meta_column.project_id,
      },
    });
  });

  dispatch({
    type: 'REMOVE_META_COLUMNS',
    payload: [meta_column.id],
  });

  dispatch({
    type: 'REMOVE_MAPPINGS_FOR_METACOLUMN',
    payload: meta_column.id,
  });
}

export function mergeMetaColumns(meta_columns, dispatch) {
  const new_col = meta_columns[0];
  const ids = meta_columns.map(mc => mc.id);

  meta_columns.slice(1).forEach(mc => {
    new_col.columns = [...new_col.columns, ...mc.columns];
  });

  dispatch({
    type: 'REMOVE_META_COLUMNS',
    payload: ids,
  });

  dispatch({
    type: 'ADD_META_COLUMNS',
    payload: [new_col],
  });
}
