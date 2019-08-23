import React, {useState, useEffect, useMemo} from 'react';
import {parse_file_for_preview} from '../utils/file_parsing';
import {useStateValue } from '../contexts/app_context';

export default function FileSnapshot({file}) {
  const [columns, setColumns] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [entries, setEntries] = useState([]);
  const [includedCols, setIncludedCols] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('loading');

  const [_, dispatch] = useStateValue();

  const submit = () => {
    dispatch({
      type: 'ADD_DATASETS',
      payload: [dataset],
    });

    dispatch({
      type: 'ADD_COLUMNS',
      payload: columns.map(c => ({
        ...c,
        focusCol: includedCols.includes(c.id),
      })),
    });

    dispatch({
      type: 'ADD_ENTRIES',
      payload: entries.filter(e => includedCols.includes(e.column_id)),
    });

    setStatus('saved');
  };

  const skip = () => {
    setStatus('skipping');
  };

  const toggleSelect = column_id => {
    if (includedCols.includes(column_id)) {
      setIncludedCols(includedCols.filter(id => id !== column_id));
    } else {
      setIncludedCols([...includedCols, column_id]);
    }
  };

  const displayEntries = useMemo(
    () =>
      columns.reduce((res, col) => {
        const col_entries = entries.filter(e => e.column_id === col.id);
        res[col.id] = {
          entries: col_entries.slice(0, 5).map(e => e.name),
          extra: col_entries.length - 5,
        };

        return res;
      }, {}),
    [entries, columns],
  );


  console.log("display Entries ", displayEntries)

  useEffect(() => {
    parse_file_for_preview(file, no_parsed => setProgress(no_parsed)).then(
      result => {
        setStatus('selecting');
        setDataset(result.dataset);
        setColumns(result.columns);
        setEntries(result.entries);
      },
    );
  }, [file]);

  return (
    <div className="fileSnapshot">
      <h3>{file.name}</h3>
      {status == 'loading' && <p>Loading, parsed {progress} rows</p>}

      {status == 'selecting' && (
        <React.Fragment>
          <p>
            Has a total of {dataset.row_count} rows and {columns.length}{' '}
            columns. Select the columns you want to work with
          </p>
          <ul className="columnSummaryList">
            {columns.map(column => (
              <li key={column.id}>
                <div>
                  <div class="summary_list_header">
                    <h3>
                      {column.name} <span>({column.unique})</span>
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

          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
              <button onClick={submit}>Load</button>
              <button onClick={skip}>Skip</button>
          </div>
        </React.Fragment>
      )}

      {status == 'saved' && <p>Loaded!</p>}
      {status == 'skipping' && <p>Skipping</p>}
    </div>
  );
}
