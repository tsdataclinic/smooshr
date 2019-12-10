import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Dexie from 'dexie';

const uuidv1 = require('uuid/v1');

export const StateContext = createContext();

const db = new Dexie('state');

db.version(1).stores({
  state: 'id',
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
  persisting: false,
};

// Helper function
const add_or_replace = (candidate, collection, id_col = 'id') => {
  if (collection.find(item => item[id_col] === candidate[id_col])) {
    return collection.map(item =>
      item[id_col] === candidate[id_col] ? candidate : item,
    );
  } else {
    return [...collection, candidate];
  }
};

// Main Reducer for the project
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOAD_CACHED_STATE':
      return payload;

    case 'ADD_DATASETS':
      return { ...state, datasets: [...state.datasets, ...payload] };

    case 'ADD_OR_REPLACE_DATASET':
      return {
        ...state,
        datasets: add_or_replace(payload, state.datasets),
      };
    case 'ADD_OR_REPLACE_ENTRY':
      return {
        ...state,
        entries: add_or_replace(payload, state.entries, 'name'),
      };
    case 'ADD_OR_REPLACE_MAPPING':
      return {
        ...state,
        mappings: add_or_replace(payload, state.mappings),
      };
    case 'ADD_OR_REPLACE_METACOLUMN':
      return {
        ...state,
        metaColumns: add_or_replace(payload, state.metaColumns),
      };
    case 'ADD_OR_REPLACE_PROJECT':
      return {
        ...state,
        projects: add_or_replace(payload, state.projects),
      };
    case 'ADD_OR_REPLACE_COLUMN':
      return {
        ...state,
        columns: add_or_replace(payload, state.columns),
      };
    case 'REMOVE DATASET':
      return {
        ...state,
        datasets: state.datasets.filter(d => d.id !== payload),
      };

    case 'ADD_EMBEDINGS':
      return {
        ...state,
        embeddings: payload,
      };
    case 'ADD_COLUMNS':
      return { ...state, columns: [...state.columns, ...payload] };

    case 'REMOVE_COLUMN':
      return {
        ...state,
        columns: state.datasets.filter(c => c.id !== payload),
      };

    case 'ADD_ENTRIES':
      return { ...state, entries: [...state.entries, ...payload] };

    case 'REMOVE ENTRY':
      return {
        ...state,
        entries: state.entries.filter(e => e.id !== payload),
      };

    case 'CREATE_META_COLUMN_FROM_COL_ID':
      return {
        ...state,
        metaColumns: [
          ...state.metaColumns,
          {
            id: payload.id,
            name: state.columns.find(c => c.id === payload.col_id).name,
            description: state.columns.find(c => c.id === payload.col_id)
              .description,
            project_id: payload.project_id,
            columns: [payload.col_id],
          },
        ],
      };

    case 'REMOVE_MAPPINGS_FOR_METACOLUMN':
      return {
        ...state,
        mappings: state.mappings.filter(m => m.column_id !== payload),
      };

    case 'REMOVE_META_COLUMNS':
      return {
        ...state,
        metaColumns: state.metaColumns.filter(mc => !payload.includes(mc.id)),
      };
    case 'ADD_META_COLUMNS':
      return {
        ...state,
        metaColumns: [...state.metaColumns, ...payload],
      };

    case 'REMOVE_MAPPING':
      return {
        ...state,
        mappings: state.mappings.filter(m => m.id !== payload),
      };

    case 'ADD_MAPPINGS':
      return {
        ...state,
        mappings: [...state.mappings, ...payload],
      };


    case 'ADD_MAPPING':
      return {
        ...state,
        mappings: [...state.mappings, payload],
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, { id: uuidv1(), ...payload }],
      };

    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== payload),
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === payload.id ? { ...p, ...payload } : p,
        ),
      };

    case 'ADD ENTRY TO MAPPING':
      return {
        ...state,
        mappings: state.mappings.map(m =>
          m.id === payload.id
            ? { ...m, entries: [...m.entries, payload.entry] }
            : m,
        ),
      };
    case 'UPDATE_MAPPING':
      return {
        ...state,
        mappings: state.mappings.map(m =>
          m.id === payload.id ? { ...m, ...payload.mapping } : m,
        ),
      };
    case 'REMOVE_ENTRIES_FOR_COLUMN':
      return {
        ...state,
        entries: state.entries.filter(entry => entry.columnID === payload),
      };

    case 'REMOVE_META_COLUMN':
      return {
        ...state,
        meta_columns: state.metaColumns.filter(mc => mc.id !== payload),
      };

    case 'UPDATE_META_COLUMN':
      return {
        ...state,
        meta_columns: state.metaColumns.map(mc =>
          mc.id === payload.id ? { ...mc, ...payload.meta_column } : mc,
        ),
      };

    case 'SET_PERSISTING':
      return {
        ...state,
        persisting: payload,
      };
    case 'UPDATE_STORAGE_QUOTA':
      return {
        ...state,
        storage_stats: payload,
      };
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const {
    datasets,
    columns,
    entries,
    projects,
    mappings,
    metaColumns,
    showUploadModal,
    showApplyMappingsModal,
    cache_loaded
  } = state;


  // Effect used to persist the state values that we care about preserving
  // to our cache 
  // TODO move this function to it's own hook section
  useEffect(() => {
    if (cache_loaded) {

      db.state.put({
        data: JSON.stringify({
          datasets,
          columns,
          entries,
          projects,
          mappings,
          metaColumns,
          showUploadModal,
          showApplyMappingsModal,
        }), id: 1
      });

      if (navigator.storage && navigator.storage.estimate) {
        navigator.storage.estimate().then(estimation => {
          const { quota, usage } = estimation;
          dispatch({
            type: 'UPDATE_STORAGE_QUOTA',
            payload: { quota, usage },
          });
        });
      } else {
        console.error('StorageManager not found');
      }
    }
  }, [
    datasets,
    columns,
    entries,
    projects,
    mappings,
    metaColumns,
    showUploadModal,
    showApplyMappingsModal,
    cache_loaded
  ]);

  // Use this to restore the state
  useEffect(() => {
    db.state.get(1).then(result => {
      if (result) {
        const cachedState = JSON.parse(result.data);
        dispatch({
          type: 'LOAD_CACHED_STATE',
          payload: { ...initalState, ...cachedState, cache_loaded: true },
        });
      } else {
        dispatch({
          type: 'LOAD_CACHED_STATE',
          payload: { ...initalState, cache_loaded: true },
        });
      }
    });
  }, []);


  // Record if we are able to reliably persist the 
  // cached local state
  useEffect(() => {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then(persistResult => {
        dispatch({
          type: 'SET_PERSISTING',
          payload: persistResult,
        });
      });
    }
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
  const metaColumns = state.metaColumns.filter(
    mc => mc.project_id === projectID,
  );
  const metaColumnIds = metaColumns.map(mc => mc.id);

  const colIDs = metaColumns.reduce((ids, mc) => [...ids, ...mc.columns], []);
  const mappings = state.mappings.filter(m =>
    metaColumnIds.includes(m.column_id),
  );
  const columns = state.columns.filter(c => colIDs.includes(c.id));
  const columnIds = columns.map(c => c.id);
  const entries = state.entries.filter(e => columnIds.includes(e.column_id));

  const deleteProject = () => {
    columns.forEach(c => {
      dispatch({
        type: 'DELETE_ENTRIES_FOR_COLUMN',
        payload: c.id,
      });
      dispatch({
        type: 'REMOVE_COLUMN',
        payload: c.id,
      });
    });

    mappings.forEach(m => {
      dispatch({
        type: 'REMOVE_MAPPING',
        payload: m.id,
      });
    });

    metaColumns.forEach(m => {
      dispatch({
        type: 'REMOVE_META_COLUMN',
        payload: m.id,
      });
    });

    datasets.forEach(d => {
      dispatch({
        type: 'REMOVE_DATASET',
        payload: d.id,
      });
    });

    dispatch({
      type: 'REMOVE_PROJECT',
      payload: project.id,
    });
  };

  return {
    project,
    datasets,
    metaColumns,
    columns,
    mappings,
    deleteProject,
    entries,
  };
};

export const useColumn = columnID => {
  const [state, dispatch] = useStateValue();
  const column = state.columns.find(c => c.id === columnID);
  const entries = state.entries.filter(e => e.column_id === columnID);
  const mappings = state.mappings.filter(m => m.column_id === columnID);
  const entryNames = entries.map(e => e.name);
  const embeddings = state.embeddings.filter(embed =>
    entryNames.includes(embed.entry),
  );
  return { column, entries, mappings, embeddings, dispatch };
};

export const useMetaColumn = columnID => {
  const [state, dispatch] = useStateValue();
  const metaColumn = state.metaColumns.find(c => c.id === columnID);
  if (!metaColumn) {
    return {
      metaColumn: null,
      entries: [],
      mappings: [],
      embeggins: [],
      dispatch,
    };
  }
  const entries = state.entries.filter(e =>
    metaColumn.columns.includes(e.column_id),
  );

  // Need to consolidate the entries down to as single space.
  const entryNames = Array.from(new Set(entries.map(e => e.name)));
  const mergedEntry = entryNames.map(name => {
    const entry_collection = entries.filter(e => e.name === name);
    const total = entry_collection.reduce((total, ec) => total + ec.count, 0);
    return {
      name,
      count: total,
    };
  });

  const mappings = state.mappings.filter(m => m.column_id === metaColumn.id);
  const embeddings = state.embeddings.filter(embed =>
    entryNames.includes(embed.entry),
  );
  return { metaColumn, entries: mergedEntry, mappings, embeddings, dispatch };
};

export const useProjectStats = () => {
  const [state,] = useStateValue();
  const { projects, datasets, columns } = state;
  const project_stats = projects.reduce((stats, project) => {
    const project_datasets = datasets
      .filter(d => d.project_id === project.id)
      .map(d => d.id);
    const project_columns = columns.filter(c =>
      project_datasets.includes(c.id),
    );
    const project_meta_columns = columns.filter(
      mc => mc.project_id === project.id,
    );
    return [
      ...stats,
      {
        project: project,
        stats: {
          datasets: datasets.length,
          columns: project_columns.length,
          meta_columns: project_meta_columns.length,
        },
      },
    ];
  }, []);
  return project_stats;
};

export const useStorage = () => {
  const [{ storage_stats, persisting },] = useStateValue();
  if (storage_stats) {
    return {
      persisting,
      quota: storage_stats.quota / 1e6,
      usage: storage_stats.usage / 1e6,
    };
  } else {
    return {};
  }
};

export const useDataset = datasetID => {
  const [state,] = useStateValue();
  const dataset = state.datasets.find(d => d.id === datasetID);
  const columns = state.columns.filter(d => d.dataset_id === datasetID);
  const columnIDs = columns.map(c => c.id);
  const mappings = state.mappings.filter(m => columnIDs.includes(m.columnID));
  return { dataset, columns, mappings };
};
