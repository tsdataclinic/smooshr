import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useProject } from '../contexts/app_context';
import { exportPythonCode } from '../utils/file_parsing';

export default function CodeExportModal({ match, history }) {
  const onClose = () => history.goBack();
  // const [_, dispatch] = useStateValue();
  const { projectID } = match.params;
  const { project, datasets, metaColumns, columns, mappings } = useProject(
    projectID,
  );

  const [changeNonMapped, setChangeNonMapped] = useState(false);
  const [createNewColumns, setCreateNewColumns] = useState(false);
  const [combineDatasets, setCombineDatasets] = useState(true);
  const [valueForNonMapped, setValueForNonMapped] = useState('unknown');

  const doExport = () => {
    const settings = {
      changeNonMapped,
      createNewColumns,
      combineDatasets,
      valueForNonMapped,
    };

    exportPythonCode(
      project,
      datasets,
      metaColumns,
      columns,
      mappings,
      settings,
    );
  };

  return (
    <ReactModal
      className="Modal"
      overlayClassName="Overlay"
      isOpen={true}
      onRequestClose={onClose}>
      <div className="code-export-modal">
        {project && (
          <React.Fragment>
            <div>
              <h1>{project.name}</h1>
              <p>Export Code</p>
            </div>
            <div className='code-export-options'>
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

            <div className={'export-instructions'}>
              <p>
                Click export to download a zip file with everything you need to
                apply your mapping.
              </p>
              <p>The code will do the following:</p>
              <ul>
                <li>
                  Load the files you worked on from the "put_your_files_in_here"
                  folder
                </li>
                <li>
                  Combine and rename columns from each dataset as you indicated
                </li>
                <li>Apply the new taxonomies you produced to those columns</li>
                <li>Export the results to the "results" folder</li>
              </ul>
              <p>
                The script that does all this is called "process.py" you can
                tweak it to suit your needs
              </p>
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
