import React, {useState, useEffect} from 'react';
import {useStateValue, useProject} from '../contexts/app_context';
import {Link} from 'react-router-dom';
import ColumnCard from '../components/ColumnCard'
import {mergeMetaColumns, updateMetaColumn} from '../contexts/actions'
import {saveMappingsCSV, saveMappingsJSON ,applyAndSave } from '../utils/file_parsing'
import OpenDataSearcher from '../components/OpenDataSearcher'

import {
  faColumns,
  faDatabase,
  faFistRaised
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function ProjectPage(props) {
  const {match} = props;
  const {projectID} = match.params;
  const {project, datasets,meta_columns,columns,mappings} = useProject(projectID);
  const [{}, dispatch] = useStateValue() 
  const [selectedColumns, setSelectedColumns] = useState([])


  const exportMappingsCSV = ()=>{
     saveMappingsCSV(project,datasets,meta_columns,columns,mappings)
  }

  const exportMappingsJSON= ()=>{
     saveMappingsJSON(project,datasets,meta_columns,columns,mappings)
  }

  const exportPythonCode= ()=>{
    alert('saving as JSON')
  }

  const exportData = ()=>{
     applyAndSave(project,datasets,meta_columns,columns,mappings);
  }

  const changeMCName =(mc,name)=>{
   updateMetaColumn(mc.id, {name},dispatch)
  }

  const toggleSelectedColumn = (id)=>{
    if(selectedColumns.includes(id)){
      setSelectedColumns(selectedColumns.filter(cid=> cid !==id))
    }
    else{
      setSelectedColumns([...selectedColumns, id])
    }
  }

  const dereferenceColumn = (colID)=>{
     const column = columns.find(c => c.id ===colID)
     return {
         dataset: datasets.find(d=>d.id ===column.dataset_id),
         name: column.name,
         id: column.id,
         unique: column.unique
     }
  }

  const mergeColumns = ()=>{
    const toMerge = meta_columns.filter(mc=>selectedColumns.includes(mc.id))
    mergeMetaColumns(toMerge,dispatch)
    setSelectedColumns([])
  }


  return (
    <div className='dataset-page page'>
      {project ? (
        <React.Fragment>
          <h1 className="large-title-header">{project.name}</h1>
          <p>{project.description}</p>
          <div className="datasets region">
              <div className="region-header">
                  <h2><FontAwesomeIcon icon={faDatabase} style={{marginRight:'20px'}} />Datasets</h2>
                 <Link to={`/project/${projectID}/add_datasets`}>
                     <button>Add Dataset</button>
                 </Link>
              </div>
              <div className='region-list'>
                  {datasets.map((dataset)=>
                    <p>{dataset.name}</p>
                  )}
              </div>
          </div>

          <div className="columns region">
              <div className="region-header">
                 <h2><FontAwesomeIcon icon={faColumns} style={{marginRight:'20px'}} />Columns</h2>
                 { selectedColumns.length>0 ? <button onClick={mergeColumns}>{`Merge ${selectedColumns.length} columns`}</button> : '' } 
              </div>
              <div className='region-list column-list'>
                  {meta_columns.map(mc=>
                     <ColumnCard 
                         name= {mc.name}
                         description = {mc.description}
                         fromColumns = {mc.columns.map(dereferenceColumn)}
                         selected = {selectedColumns.includes(mc.id)}
                         onClick = {()=>toggleSelectedColumn(mc.id)}
                         onUpdate ={(newName)=> changeMCName(mc,newName)}
                         link = {`/project/${project.id}/column/${mc.id}`}
                     />
                  )}
              </div>
          </div>

          <div className="actions region">
              <div className="region-header">
                  <h2><FontAwesomeIcon icon={faFistRaised} style={{marginRight:'20px'}}/>Actions</h2>
              </div>
              <div className='region-list action-list'>
                  {/*<button onClick={exportMappingsCSV}>Export Mappings (csv)</button>*/} 
                  <button onClick={exportMappingsJSON}>Export Project</button> 
                  <button onClick={exportPythonCode}>Export Python code</button> 
                  <button onClick={exportData}>Export Data</button> 
              </div>
          </div>

        </React.Fragment>
      ) : (
        <h1>Project not found</h1>
      )}
    </div>
  );
}

