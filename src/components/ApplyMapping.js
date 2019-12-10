import React, { useState } from 'react';
import streamSaver from 'streamsaver';

export default function ApplyMapping(props) {
  const { file, columns } = props;

  const [addColumns, setAddColumns] = useState(true);
  const [status, setStatus] = useState('pending');

  const startProcessing = () => {
    setStatus('running');
    const fileStream = streamSaver.createWriteStream('processed.txt', {
      size: 22,
    });
    new Response('StreamSaver is awesome').body.pipeTo(fileStream).then(
      () => {
        console.log('SAVED');
      },
      () => {
        console.log('ERROR');
      },
    );
  };

  return (
    <div className="ApplyMapping">
      {status === 'pending' && (
        <React.Fragment>
          <p id={file.name}>{file.name}</p>
          <div className="options">
            <p>Applying mappings to {columns.length} columns</p>
            Add Columns:{' '}
            <input
              type="checkbox"
              checked={addColumns}
              onChange={e => setAddColumns(e.target.checked)}
            />
            Treat Unmapped as Unknown: <input type="checkbox" />
            <button onClick={startProcessing}>Apply Mapping</button>
          </div>
        </React.Fragment>
      )}
      {status === 'running' && <h2>Running</h2>}
      {status === 'done' && <h2>Done</h2>}
    </div>
  );
}
