import React from 'react';
import TablePreview from '../components/TablePreview';
import { useStateValue } from '../contexts/app_context';

export default function DatasetPage({ match }) {
  const datasetID = match.params.datasetID;

  const [{ datasets, columns },] = useStateValue();
  const dataset = datasets.find(d => d.id === datasetID);

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

