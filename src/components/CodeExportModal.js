import React, {useState} from 'react';
import ReactModal from 'react-modal';
import {useProject, useStateValue} from '../contexts/app_context';
import {exportPythonCode} from '../utils/file_parsing';

export default function CodeExportModal({match, history}) {
  const onClose = () => history.goBack();
  const [_, dispatch] = useStateValue();
  const {projectID} = match.params;
  const {project, datasets, meta_columns, columns, mappings} = useProject(
    projectID,
  );

  const [changeNonMapped, setChangeNonMapped] = useState(false);
  const [createNewColumns, setCreateNewColumns] = useState(false);
  const [combineDatasets, setCombineDatasets] = useState(true);
  const [valueForNonMapped, setValueForNonMapped] = useState('unknown');

  
  const doExport = ()=>{
    const settings= { 
       changeNonMapped,
       createNewColumns,
       combineDatasets,
       valueForNonMapped
    }

    exportPythonCode(project,datasets,meta_columns,columns,mappings, settings)
  }

  return (
    <ReactModal isOpen={true} onRequestClose={onClose}>
      <div className="code-export-modal">
        <h1>Export Code</h1>
        {project && (
          <React.Fragment>
            <p>{project.name}</p>

            <div>
              <span>
                Change non mapped entries?
                <input
                  type="checkbox"
                  value={changeNonMapped}
                  onChange={e => setChangeNonMapped(e.target.checked)}
                />
              </span>
              {changeNonMapped && (
                <span>
                  Value for non mapped entries?
                  <input
                    type="text"
                    value={valueForNonMapped}
                    onChange={e => setValueForNonMapped(e.target.value)}
                  />{' '}
                </span>
              )}
              <span>
                Create new columns?{' '}
                <input
                  type="checkbox"
                  value={createNewColumns}
                  onChange={e => setCreateNewColumns(e.target.checked)}
                />{' '}
              </span>
              <span>
                Combine datasets in to single file?{' '}
                <input
                  type="checkbox"
                  value={combineDatasets}
                  onChange={e => setCombineDatasets(e.target.checked)}
                />{' '}
              </span>
            </div>

            <div className={'explanation'}>
              <span>
                The script will create these new columns on these datasets
              </span>
              <span>Map the old entries to the following</span>
              <span>Combine the datasets in to a single file</span>
            </div>

            <div className="buttons">
              <button onClick={doExport}>Export</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </React.Fragment>
        )}
      </div>
    </ReactModal>
  );
}
