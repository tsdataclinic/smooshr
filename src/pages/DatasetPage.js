import React from 'react';
import TablePreview from '../components/TablePreview';
import EmbedingsViz from '../components/EmbedingsViz';
import ColumnInfo from '../components/ColumnInfo';
import {useStateValue} from '../contexts/app_context';
import SideList from '../components/SideList'
import {Link} from 'react-router-dom';

export default function DatasetPage({match}) {
  const datasetID = match.params.datasetID;

  const [{datasets, columns, mappings}, dispatch] = useStateValue();
  const dataset = datasets.find(d => d.id == datasetID);

  const columnsForDataset = columns.filter(c => c.dataset_id === datasetID);
  return dataset ? (
    <React.Fragment>
      <div className="datatable full_card">
        <TablePreview data={dataset.sample} columns={columnsForDataset} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px',
          }}>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <h2>Could not find dataset</h2>
  );
}

export function DatasetPageSidebar({match}){

  const {projectID, datasetID, columnID} = match.params;
  const [{datasets, columns}, dispatch] = useStateValue();
  const columnsForDataset = columns.filter(c => c.dataset_id === datasetID)

  return (
    <SideList 
        title ={'Columns'}
        entries = 
            {columnsForDataset.filter(c=>c.focusCol).map(column => (
            <Link to={`/project/${projectID}/dataset/${datasetID}/column/${column.id}`}>
                {column.name} ({column.unique})
            </Link>
          ))}
        actionPrompt={'Back to project'}
        actionLink = {`/project/${projectID}`}
    /> 
  );
}
