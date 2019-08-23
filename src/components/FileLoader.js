import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import FileSnapshot from './FileSnapshot';

export default function FileLoader(props) {
  const [filesPreview, setFilesPreview] = useState(null);
  const [error, setError] = useState(null);

  const [columnSelections, setColumnSelections] = useState([]);
  const {onClose} = props;

  const onDrop = useCallback(files => {
    if (files.every(file => file.name.split('.').includes('csv'))) {
      setFilesPreview(files);
      setColumnSelections({...columnSelections, [files[0].name]: {}});
      setError(null);
    } else {
      setError('Some files are not CSVs, We only support CSVs for now');
    }
  });

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return filesPreview ? (
    <div>
      {filesPreview.map(file => (
        <FileSnapshot file={file} />
      ))}
    </div>
  ) : (
    <div className="fileUploader">
      <div {...getRootProps()}>
        <input
          {...getInputProps({accept: ['text/csv', 'application/vnd.ms-excel']})}
        />
        {isDragActive ? (
          <p>Drop the files here ... </p>
        ) : (
          <p>Drag 'n' drop files here to create dataset</p>
        )}
      </div>
      <button onClick={onClose}>Close</button>
      {error && <p>{error}</p>}
    </div>
  );
}
