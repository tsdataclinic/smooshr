import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { deleteProject } from './actions';
import Dexie from "dexie"

const uuidv1 = require('uuid/v1');

export const StateContext = createContext();

const db = new Dexie('state');

db.version(1).stores({
  state: 'id'
});

const initalState = {
  datasets: [],
  columns: [],
  entries: [],
  projects: [],
  mappings: [],
  embeddings: [],
  metaColumns: [],
  showUploadModal: false,
  showApplyMappingsModal: false,
  cache_loaded: false,
  storage_stats: null,
  persisting: false
};

const reducer = (state, action) => {
  console.log("DISPATCHING ", action.type)
  switch (action.type) {
    case 'LOAD_CACHED_STATE':
      return action.payload;

    case 'ADD_DATASETS':
      return { ...state, datasets: [...state.datasets, ...action.payload] };

    case 'REMOVE DATASET':
      return {
        ...state,
        datasets: state.datasets.filter(d => d.id !== action.payload),
      };

    case 'ADD_EMBEDINGS':
      return {
        ...state,
        embeddings: action.payload
      }
    case 'ADD_COLUMNS':
      return { ...state, columns: [...state.columns, ...action.payload] };

    case 'REMOVE_COLUMN':
      return {
        ...state,
        columns: state.datasets.filter(c => c.id !== action.payload),
      };

    case 'ADD_ENTRIES':
      return { ...state, entries: [...state.entries, ...action.payload] };

    case 'REMOVE ENTRY':
      return {
        ...state,
        entries: state.entries.filter(e => e.id !== action.payload),
      };

    case 'REMOVE_META_COLUMNS':
      return {
        ...state,
        metaColumns: state.metaColumns.filter(mc => !action.payload.includes(mc.id))
      }
    case 'ADD_META_COLUMNS':
      return {
        ...state,
        metaColumns: [...state.metaColumns, ...action.payload]
      }

    case 'ADD_MAPPINGS':
      return { ...state, mappings: [...state.mappings, ...action.payload] };

    case 'REMOVE_MAPPING':
      return {
        ...state,
        mappings: state.mappings.filter(m => m.id !== action.payload),
      };

    case 'ADD_MAPPING':
      return {
        ...state,
        mappings: [...state.mappings, action.payload],
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, { id: uuidv1(), ...action.payload }],
      };

    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id == action.payload.id ? { ...p, ...action.payload } : p,
        ),
      };

    case 'ADD ENTRY TO MAPPING':
      return {
        ...state,
        mappings: state.mappings.map(m =>
          m.id === action.payload.id
            ? { ...m, entries: [...m.entries, action.payload.entry] }
            : m,
        ),
      };
    case 'UPDATE_MAPPING':
      return {
        ...state,
        mappings: state.mappings.map(m =>
          m.id === action.payload.id ? { ...m, ...action.payload.mapping } : m,
        ),
      };
    case 'REMOVE_ENTRIES_FOR_COLUMN':
      return {
        ...state,
        entries: state.entries.filter(entry => entry.columnID === action.payload)
      }

    case 'REMOVE_META_COLUMN':
      return {
        ...state,
        meta_columns: state.metaColumns.filter(mc => mc.id !== action.payload)
      };

    case 'UPDATE_META_COLUMN':
      return {
        ...state,
        meta_columns: state.metaColumns.map(mc =>
          mc.id === action.payload.id ? { ...mc, ...action.payload.meta_column } : mc,
        ),
      };

    case 'SET_PERSISTING':
      return {
        ...state,
        persisting: action.payload
      }
    case 'UPDATE_STORAGE_QUOTA':
      return {
        ...state,
        storage_stats: action.payload
      }
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { datasets,
    columns,
    entries,
    projects,
    mappings,
    metaColumns,
    showUploadModal,
    showApplyMappingsModal,
  } = state;

  useEffect(() => {
    if (state.cache_loaded) {
      db.state.put({ data: JSON.stringify(state), id: 1 });
      // localStorage.setItem('state', JSON.stringify(state));
      if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(estimation => {
          const { quota, usage } = estimation;
          dispatch({
            type: "UPDATE_STORAGE_QUOTA",
            payload: { quota, usage }
          })
        });
      } else {
        console.error("StorageManager not found");
      }
    }
  }, [datasets,
    columns,
    entries,
    projects,
    mappings,
    metaColumns,
    showUploadModal,
    showApplyMappingsModal]);

  useEffect(() => {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then((persistResult) => {
        dispatch({
          type: 'SET_PERSISTING',
          payload: persistResult
        })
      });
    }
  }, [])

  useEffect(() => {
    console.log('State update ', state);
  }, [state]);

  useEffect(() => {
    db.state.get(1).then(result => {
      if (result) {

        const cachedState = JSON.parse(result.data);
        console.log('ATTEMPTING TO HYDRATE STATE', cachedState);

        dispatch({
          type: 'LOAD_CACHED_STATE',
          payload: { ...initalState, ...cachedState, cache_loaded: true },
        });
      }
      else {
        dispatch({
          type: 'LOAD_CACHED_STATE',
          payload: { ...initalState, cache_loaded: true }
        })
      }
    });
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const useProject = projectID => {
  const [state, dispatch] = useStateValue();
  const project = state.projects.find(p => p.id === projectID);
  const datasets = state.datasets.filter(d => d.project_id === projectID);
  const meta_columns = state.metaColumns.filter(mc => mc.project_id === projectID)
  const meta_column_ids = meta_columns.map(mc => mc.id)

  const colIDs = meta_columns.reduce((ids, mc) => [...ids, ...mc.columns], [])
  const mappings = state.mappings.filter(m => meta_column_ids.includes(m.column_id))
  const columns = state.columns.filter(c => colIDs.includes(c.id));

  const deleteProject = () => {
    columns.forEach(c => {
      dispatch({
        type: 'DELETE_ENTRIES_FOR_COLUMN',
        payload: c.id
      })
      dispatch({
        type: "REMOVE_COLUMN",
        payload: c.id
      })
    })

    mappings.forEach(m => {
      dispatch({
        type: "REMOVE_MAPPING",
        payload: m.id
      })
    })

    meta_columns.forEach(m => {
      dispatch({
        type: "REMOVE_META_COLUMN",
        payload: m.id
      })
    })
    datasets.forEach(d => {
      dispatch({
        type: "REMOVE_DATASET",
        payload: d.id
      })
    })

    dispatch({
      type: "REMOVE_PROJECT",
      payload: project.id
    })

  }

  return { project, datasets, meta_columns, columns, mappings, deleteProject };
};

export const useColumn = columnID => {
  const [state, dispatch] = useStateValue();
  const column = state.columns.find(c => c.id === columnID);
  const entries = state.entries.filter(e => e.column_id == columnID);
  const mappings = state.mappings.filter(m => m.column_id === columnID);
  const entry_names = entries.map((e) => e.name)
  const embeddings = state.embeddings.filter(embed =>
    entry_names.includes(embed.entry),
  );
  return { column, entries, mappings, embeddings, dispatch };
};

export const useMetaColumn = columnID => {
  const [state, dispatch] = useStateValue();
  const meta_column = state.metaColumns.find(c => c.id === columnID);
  const entries = state.entries.filter(e => meta_column.columns.includes(e.column_id));

  // Need to consolidate the entries down to as single space.
  const entryNames = Array.from(new Set(entries.map(e => e.name)))
  const mergedEntry = entryNames.map(name => {
    const entry_collection = entries.filter(e => e.name === name)
    const total = entry_collection.reduce((total, ec) => total + ec.count, 0)
    return {
      name,
      count: total
    }
  })

  const mappings = state.mappings.filter(m => m.column_id === meta_column.id);
  const entry_names = entries.map((e) => e.name)
  const embeddings = state.embeddings.filter(embed =>
    entry_names.includes(embed.entry),
  );
  return { meta_column, entries: mergedEntry, mappings, embeddings, dispatch };
};


export const useStorage = () => {
  const [{ storage_stats, persisting }, _] = useStateValue()
  console.log("storage stats", storage_stats)
  if (storage_stats) {
    return { persisting, quota: storage_stats.quota / 1e6, usage: storage_stats.usage / 1e6 }
  }
  else {
    return {}
  }
}

export const useDataset = datasetID => {
  const [state, dispatch] = useStateValue();
  const dataset = state.datasets.find(d => d.id === datasetID);
  const columns = state.columns.filter(d => d.dataset_id === datasetID);
  const columnIDs = columns.map(c => c.id);
  const mappings = state.mappings.filter(m => columnIDs.includes(m.columnID));
  return { dataset, columns, mappings };
};
