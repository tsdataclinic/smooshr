import React from 'react';
import {useStateValue} from '../contexts/app_context';
import {Link} from 'react-router-dom';

export default function ColumnList({match}) {
  const {datasetID, columnID} = match.params;
  const [{datasets, columns}, dispatch] = useStateValue();
  const columnsForDataset = columns.filter(c => c.dataset_id === datasetID)

  return (
    <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
      <h2>Columns list</h2>
      {columnsForDataset && (
        <ul style={{flex:1}}>
            {columnsForDataset.filter(c=>c.focusCol).map(column => (
            <Link to={`/dataset/${datasetID}/column/${column.id}`}>
              <li>
                {column.name} ({column.unique})
              </li>
            </Link>
          ))}
        </ul>
      )}
      <Link to={`/dataset/${datasetID}`}><p>Back to dataset</p></Link>
  </div>
  );
}
