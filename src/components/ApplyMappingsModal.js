import React, { useState, useCallback } from 'react';
import ReactModal from 'react-modal';
import ApplyMapping from './ApplyMapping'
import { useDataset } from '../contexts/app_context'

import { useDropzone } from 'react-dropzone';

export default function ApplyMappingsModal({ match, history }) {

  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const { datasetID } = match.params

  const onClose = () => {
    history.goBack()
  }

  const { columns, mappings } = useDataset(datasetID);

  const onDrop = useCallback(files => {
    if (files.every(file => file.name.split('.').includes('csv'))) {
      setFiles(files);
    } else {
      setError(
        "Smoosher currently only supports CSV's please just upload those!",
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <ReactModal isOpen={true} onRequestClose={onClose}>
      {error && <h1>{error}</h1>}

      {files ? (
        <div>
          {files.map(file => (
            <ApplyMapping
              file={file}
              columns={columns}
              mappings={mappings}
            />

          ))}
        </div>
      ) : (
          <React.Fragment>
            <h1>Select files to apply mapping to</h1>
            <div className="file-uploader">
              <div {...getRootProps()}>
                <input
                  {...getInputProps({
                    accept: ['text/csv', 'application/vnd.ms-excel'],
                  })}
                />

                {isDragActive ? (
                  <p>Drop the files here ... </p>
                ) : (
                    <p>Drag 'n' drop files to apply mapping</p>
                  )}
              </div>
            </div>
          </React.Fragment>
        )}
    </ReactModal>
  );
}
