import React from 'react';
import TablePreview from '../components/TablePreview';
import EmbedingsViz from '../components/EmbedingsViz';
import ColumnInfo from '../components/ColumnInfo';
import {useStateValue} from '../contexts/app_context';
import {saveMappingsJSON, saveMappingsCSV} from '../utils/file_parsing';
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
          <button
            onClick={() =>
              saveMappingsJSON(columns, mappings, dataset.name + '.json')
            }>
            Export mappings as JSON
          </button>
          <button
            onClick={() =>
              saveMappingsCSV(columns, mappings, dataset.name + '.csv')
            }>
            Export mappings as CSV
          </button>
          <button>Export mapped data</button>
          <Link to={`/dataset/${datasetID}/apply`}>
            <button>Apply mapping to file</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <h2>Could not find dataset</h2>
  );
}
