import React from 'react';
import ReactModal from 'react-modal';
import FileLoader from './FileLoader';
import { useStateValue } from '../contexts/app_context';
const uuidv1 = require('uuid/v1');

export default function UploadModal({ match, history }) {
  const { projectID } = match.params;
  const onClose = () => history.goBack();
  const [, dispatch] = useStateValue();

  const addDatasetToStore = (newDataset, columns, entries) => {
    const metaColumns = columns
      .filter(c => c.focusCol)
      .map(column => ({
        columns: [column.id],
        name: column.name,
        description: '',
        project_id: projectID,
        id: uuidv1(),
      }));

    dispatch({
      type: 'ADD_DATASETS',
      payload: [{ ...newDataset, project_id: projectID }],
    });

    dispatch({
      type: 'ADD_COLUMNS',
      payload: columns,
    });

    dispatch({
      type: 'ADD_ENTRIES',
      payload: entries,
    });

    dispatch({
      type: 'ADD_META_COLUMNS',
      payload: metaColumns,
    });

    onClose();
  };

  return (
    <ReactModal
      style={{
        content: { height: '60%', width: '80%', transform: 'translate(10%,15%)' },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}
      isOpen={true}
      onRequestClose={onClose}>
      <FileLoader onAddDataset={addDatasetToStore} onClose={onClose} />
    </ReactModal>
  );
}
