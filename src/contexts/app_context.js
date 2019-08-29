import React, {createContext, useContext, useReducer, useEffect} from 'react';
const uuidv1 = require('uuid/v1');

export const StateContext = createContext();

const initalState = {
  datasets: [],
  columns: [],
  entries: [],
  projects: [],
  mappings: [],
  col_mappings: [],
  showUploadModal: false,
  showApplyMappingsModal: false,
  cache_loaded: false,
};

const reducer = (state, action) => {
  switch (action.type) {

    case 'LOAD_CACHED_STATE':
      return action.payload;

    case 'ADD_DATASETS':
      return {...state, datasets: [...state.datasets, ...action.payload]};

    case 'REMOVE DATASET':
      console.log();
      return {
        ...state,
        datasets: state.datasets.filter(d => d.id !== action.payload),
      };

    case 'ADD_COLUMNS':
      return {...state, columns: [...state.columns, ...action.payload]};

    case 'REMOVE COLUMN':
      return {
        ...state,
        columns: state.datasets.filter(c => c.id !== action.payload),
      };

    case 'ADD_ENTRIES':
      return {...state, entries: [...state.entries, ...action.payload]};

    case 'REMOVE ENTRY':
      return {
        ...state,
        entries: state.entries.filter(e => e.id !== action.payload),
      };

    case 'ADD_MAPPINGS':
      return {...state, mappings: [...state.mappings, ...action.payload]};

    case 'REMOVE MAPPING':
      return {
        ...state,
        mappings: state.mappings.filter(m => m.id !== action.payload),
      };


    case "ADD_MAPPING":
      return{
        ...state,
        mappings: [...state.mappings, action.payload]
      }

    case "ADD_PROJECT":
      return{
        ...state,
        projects: [...state.projects, {id: uuidv1() ,  ...action.payload}]
      }

    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.mappings.filter(p => p.id !== action.payload),
      };

    case "UPDATE_PROJECT":
      return{
        ...state,
        projects: state.projects.map((p)=> p.id == action.payload.id ? 
        {...p,...action.payload} :
        p
        ) 
      }

    case "ADD ENTRY TO MAPPING":
       return {
         ...state,
         mappings: state.mappings.map((m)=> 
           m.id === action.payload.id ? 
           {...m, entries: [...m.entries, action.payload.entry ]} : 
           m
         )
       }

    case "DELETE_MAPPING":
        return{
           ...state,
           mappings: state.mappings.filter((m)=>
           m.id !== action.payload
           )
        }
    case "UPDATE_MAPPING":
        return {
          ...state,
         mappings: state.mappings.map((m)=> 
           m.id === action.payload.id ? 
           {...m, ...action.payload.mapping} : 
           m
         )
        }
    default:
      return state;
  }
};

export const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  useEffect(() => {
    if (state.cache_loaded) {
      localStorage.setItem('state', JSON.stringify(state));
    }
  }, [state]);


  useEffect(()=>{
     console.log('State update ', state)
  },[state])

  useEffect(() => {
    const cachedState = JSON.parse(localStorage.getItem('state'));
    console.log('ATTEMPTING TO HYDRATE STATE', cachedState);

    dispatch({
      type: 'LOAD_CACHED_STATE',
      payload: {...initalState, ...cachedState, cache_loaded: true},
    });
  }, []);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const useProject= (projectID)=>{
   const [state,dispatch] = useStateValue()
   const project = state.projects.find(p=>p.id===projectID) 
   const datasets = state.datasets.filter(d=>d.project_id === projectID)
   return {project,datasets}
}

export const useColumn = (columnID)=>{
   const [state, dispatch] = useStateValue()
   const column= state.columns.find(c=>c.id === columnID)
   const entries = state.entries.filter(e=>e.column_id == columnID)
   const mappings = state.mappings.filter(m=>m.columnID === columnID)
   return {column,entries,mappings} 
}

export const useDataset= (datasetID) =>{
   const [state, dispatch] = useStateValue()
   const dataset = state.datasets.find(d=>d.id === datasetID)
   const columns= state.columns.filter(d=>d.dataset_id === datasetID)
   const columnIDs = columns.map(c=>c.id)
   const mappings = state.mappings.filter((m)=> columnIDs.includes(m.columnID))
   return {dataset,columns,mappings}
}
