import React, { useState, useEffect } from 'react';
import { useStateValue, useProject } from '../contexts/app_context';
import { Link } from 'react-router-dom';
import ColumnCard from '../components/ColumnCard';
import TablePreview from '../components/TablePreview';
import {
  mergeMetaColumns,
  updateMetaColumn,
  unMergeMetaColumn,
} from '../contexts/actions';
import {
  saveProject,
} from '../utils/file_parsing';

import {
  faColumns,
  faDatabase,
  faFistRaised,
  faInfoCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProjectPage(props) {
  const { match, history } = props;
  const { projectID } = match.params;
  const {
    project,
    datasets,
    metaColumns,
    columns,
    mappings,
    entries,
    deleteProject,
  } = useProject(projectID);

  const [selectedDatasetName, setSelectedDatasetName] = useState(
    datasets && datasets.length > 0 ? datasets[0].name : null,
  );

  // Used to set the selected dataset to the first one on inital load
  useEffect(() => {
    if (datasets.length > 0 && !selectedDatasetName) {
      setSelectedDatasetName(datasets[0].name);
    }
  }, [datasets, selectedDatasetName]);

  const selectedDataset = datasets.find(d => d.name === selectedDatasetName);

  const [, dispatch] = useStateValue();
  const [selectedColumns, setSelectedColumns] = useState([]);

  const onSaveProject = () => {
    saveProject(
      project,
      datasets,
      metaColumns,
      columns,
      mappings,
      entries,
      {},
    );
  };

  const changeMCName = (mc, name) => {
    updateMetaColumn(mc.id, { name }, dispatch);
  };
  const deleteThisProject = () => {
    deleteProject();
    history.push('/');
  };

  const toggleSelectedColumn = id => {
    if (selectedColumns.includes(id)) {
      setSelectedColumns(selectedColumns.filter(cid => cid !== id));
    } else {
      setSelectedColumns([...selectedColumns, id]);
    }
  };

  const seperateMetaDataColumn = id => {
    unMergeMetaColumn(metaColumns.find(mc => mc.id === id), dispatch);
  };

  const dereferenceColumn = colID => {
    const column = columns.find(c => c.id === colID);
    return {
      dataset: datasets.find(d => d.id === column.dataset_id),
      name: column.name,
      id: column.id,
      unique: column.unique,
    };
  };

  const mergeColumns = () => {
    const toMerge = metaColumns.filter(mc => selectedColumns.includes(mc.id));
    mergeMetaColumns(toMerge, dispatch);
    setSelectedColumns([]);
  };

  return (
    <div className="dataset-page page">
      {project ? (
        <React.Fragment>
          <p>{project.description}</p>

          <div className="metadata region">
            <div className="region-header">
              <h2>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ marginRight: '20px' }}
                />
                Metadata
              </h2>
              <div className="metadata"></div>
            </div>
          </div>

          <div className="columns region">
            <div className="region-header">
              <h2>
                <FontAwesomeIcon
                  icon={faColumns}
                  style={{ marginRight: '20px' }}
                />
                Columns
              </h2>
              {selectedColumns.length > 0 ? (
                <button
                  onClick={
                    mergeColumns
                  }>{`Merge ${selectedColumns.length} columns`}</button>
              ) : (
                  ''
                )}
            </div>
            <div className="region-list column-list">
              {metaColumns.map(mc => (
                <ColumnCard
                  name={mc.name}
                  description={mc.description}
                  fromColumns={mc.columns.map(dereferenceColumn)}
                  selected={selectedColumns.includes(mc.id)}
                  onClick={() => toggleSelectedColumn(mc.id)}
                  onUpdate={newName => changeMCName(mc, newName)}
                  onUnmerge={() => seperateMetaDataColumn(mc.id)}
                  link={`/project/${project.id}/column/${mc.id}`}
                  key={mc.id}
                />
              ))}
            </div>
          </div>

          <div className="datasets region">
            <div className="region-header">
              <h2>
                <FontAwesomeIcon
                  icon={faDatabase}
                  style={{ marginRight: '20px' }}
                />
                Datasets
              </h2>
            </div>
            <div className="dataset-tabs">
              {datasets.map(dataset => (
                <p
                  key={dataset.name}
                  className={
                    selectedDatasetName === dataset.name
                      ? 'selected-dataset dataset-tab'
                      : 'dataset-tab'
                  }
                  onClick={() => setSelectedDatasetName(dataset.name)}>
                  {dataset.name}
                </p>
              ))}
              <p className="final-dataset dataset-tab">Final Dataset Preview</p>
              <div className="spacer" />
              <Link
                to={`/project/${projectID}/add_datasets`}
                className="add-dataset dataset-tab">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add Dataset</span>
              </Link>
            </div>

            {datasets.length > 0 && selectedDataset && (
              <TablePreview
                data={selectedDataset.sample}
                columns={selectedDataset.columns}
              />
            )}
          </div>

          <div className="actions region">
            <div className="region-header">
              <h2>
                <FontAwesomeIcon
                  icon={faFistRaised}
                  style={{ marginRight: '20px' }}
                />
                Actions
              </h2>
            </div>
            <div className="region-list action-list">
              <button onClick={onSaveProject}>Export Project</button>
              <Link to={`/project/${projectID}/export`}>
                <button>Export Python code</button>
              </Link>
              <button onClick={deleteThisProject}>Delete Project</button>
            </div>
          </div>
        </React.Fragment>
      ) : (
          <h1>Project not found</h1>
        )}
    </div>
  );
}
