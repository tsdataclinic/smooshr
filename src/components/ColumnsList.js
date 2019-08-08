import React from 'react';
import {useStateValue} from '../contexts/app_context';
import {Link} from 'react-router-dom';

export default function ColumnList({match}) {
  const {datasetID, columnID} = match.params;
  const [{datasets, columns}, dispatch] = useStateValue();
  const columnsForDataset = columns.filter(c => c.dataset_id === datasetID)

  return (
    <React.Fragment>
      <h2>Columns list</h2>
      {columnsForDataset && (
        <ul>
            {columnsForDataset.filter(c=>c.focusCol).map(column => (
            <Link to={`/dataset/${datasetID}/column/${column.id}`}>
              <li>
                {column.name} ({column.unique})
              </li>
            </Link>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
}
