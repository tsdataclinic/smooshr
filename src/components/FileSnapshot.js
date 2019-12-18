import React, {useState, useEffect, useMemo} from 'react';
import {parseFileForPreview} from '../utils/file_parsing';
import ProgressBar from './ProgressBar';

export default function FileSnapshot({file, onAddDataset}) {
  const [columns, setColumns] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [entries, setEntries] = useState([]);
  const [includedCols, setIncludedCols] = useState([]);
  const [progress, setProgress] = useState({});
  const [status, setStatus] = useState('loading');

  const submit = () => {
    const cols = columns.map(c => ({
      ...c,
      focusCol: includedCols.includes(c.id),
    }));
    const ents = entries.filter(e => includedCols.includes(e.column_id));

    onAddDataset(dataset, cols, ents);

    setStatus('saved');
  };

  const skip = () => {
    setStatus('skipping');
  };

  const toggleSelect = columnID => {
    if (includedCols.includes(columnID)) {
      setIncludedCols(includedCols.filter(id => id !== columnID));
    } else {
      setIncludedCols([...includedCols, columnID]);
    }
  };

  const displayEntries = useMemo(
    () =>
      columns.reduce((res, col) => {
        const colEntries = entries.filter(e => e.column_id === col.id);
        res[col.id] = {
          entries: colEntries.slice(0, 5).map(e => e.name),
          extra: colEntries.length - 5,
        };

        return res;
      }, {}),
    [entries, columns],
  );

  useEffect(() => {
    parseFileForPreview(file, progress => setProgress(progress)).then(
      result => {
        setStatus('selecting');
        setDataset(result.dataset);
        setColumns(result.columns);
        setEntries(result.entries);
      },
    );
  }, [file]);

  return (
    <div className="file-snapshot">
      <div className="file-snapshot-header">
        <h3>{file.type === 'url' ? file.ref : file.ref.name}</h3>
        {status === 'loading' && (
          <React.Fragment>
            <p>
              Loading, parsed{' '}
              {progress.rows_read ? progress.rows_read.toLocaleString() : 0}{' '}
              rows
            </p>
            <ProgressBar
              total={progress.total_size ? progress.total_size : 0}
              value={progress.bytes_read}
              style={{width: '500px'}}
            />
          </React.Fragment>
        )}
        {status === 'selecting' && (
          <p>
            Has a total of {dataset.row_count} rows and {columns.length}{' '}
            columns. Select the columns you want to work with
          </p>
        )}
      </div>
      {status === 'selecting' && (
        <React.Fragment>
          <ul className="column-summary-list ">
            {columns.map(column => (
              <li className="column-preview-card card" key={column.id}>
                <div>
                  <div className="summary-list-header">
                    <h3>
                      {column.name}{' '}
                      <span>{`${column.exceded ? '>' : ''} ${
                        column.unique
                      }`}</span>
                    </h3>
                    <input
                      type="checkbox"
                      checked={includedCols.includes(column.id)}
                      onChange={() => toggleSelect(column.id)}
                    />
                  </div>
                  <p>
                    {displayEntries[column.id].entries.join(', ') +
                      ` and ${displayEntries[column.id].extra} more`}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="column-summary-buttons">
            <button onClick={submit}>Load</button>
            <button onClick={skip}>Cancel</button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
