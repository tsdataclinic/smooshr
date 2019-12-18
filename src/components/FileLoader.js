import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import FileSnapshot from './FileSnapshot';
import Tabs from './Tabs';
import OpenDataSearcher from './OpenDataSearcher';

import {faFile, faDownload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function FileLoader({onAddDataset}) {
  const [filesPreview, setFilesPreview] = useState(null);
  const [error, setError] = useState(null);
  const [url, setURL] = useState(null);

  const [columnSelections, setColumnSelections] = useState([]);
  const [selectedTab, setSelectedTab] = useState('file');

  const submitFromURL = () => {
    setFilesPreview([{type: 'url', ref: url}]);
  };

  const submitFromOpenData = dataset => {
    setFilesPreview([dataset]);
  };

  const onDrop = useCallback(
    files => {
      if (files.every(file => file.name.split('.').includes('csv'))) {
        setFilesPreview(files.map(f => ({type: 'file', ref: f})));
        setColumnSelections({...columnSelections, [files[0].name]: {}});
        setError(null);
      } else {
        setError('Some files are not CSVs, We only support CSVs for now');
      }
    },
    [columnSelections],
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const renderURL = () => {
    return (
      <div className="url-tab">
        <FontAwesomeIcon icon={faDownload} />
        <div>
          <input
            placeholder="dataseturl"
            value={url}
            onChange={e => setURL(e.target.value)}
          />
          <button disabled={!url} onClick={submitFromURL}>
            Submit
          </button>
        </div>
      </div>
    );
  };

  const renderOpenDataPortal = () => {
    return <OpenDataSearcher onDataset={submitFromOpenData} />;
  };

  const renderFile = () => {
    return (
      <div {...getRootProps()}>
        <div className="file-tab" style={{cursor: 'p'}}>
          <FontAwesomeIcon icon={faFile} />
          <input
            {...getInputProps({
              accept: ['text/csv', 'application/vnd.ms-excel'],
            })}
          />
          {isDragActive ? (
            <p>Drop the files here ... </p>
          ) : (
            <p>Drag 'n' drop files here or click to load dataset</p>
          )}
        </div>
        {error && <p>{error}</p>}
      </div>
    );
  };

  const tabContent = () => {
    switch (selectedTab) {
      case 'url':
        return renderURL();
      case 'open data portal':
        return renderOpenDataPortal();
      default:
        return renderFile();
    }
  };

  return (
    <div className="file-uploader">
      {filesPreview ? (
        filesPreview.map(file => (
          <FileSnapshot file={file} onAddDataset={onAddDataset} />
        ))
      ) : (
        <React.Fragment>
          <Tabs
            options={['file', 'url', 'open data portal']}
            selected={selectedTab}
            onSelected={tab => setSelectedTab(tab)}
          />
          <div className="content">{tabContent()}</div>
        </React.Fragment>
      )}
    </div>
  );
}
