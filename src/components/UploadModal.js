import React from 'react';
import ReactModal from 'react-modal';
import FileLoader from './FileLoader';
import {useStateValue} from '../contexts/app_context';

export default function UploadModal({match, history}) {
  const {projectID} = match.params;
  const onClose = () => history.goBack();
  const [_, dispatch]= useStateValue();

  const addDatasetToStore = (newDataset,columns,entries) => {

    dispatch({
      type: 'ADD_DATASETS',
      payload: [{...newDataset,project_id: projectID}],
    });

    dispatch({
      type: 'ADD_COLUMNS',
      payload: columns
    });

    dispatch({
      type: 'ADD_ENTRIES',
      payload: entries,
    });

    onClose();
  };

  return (
    <ReactModal isOpen={true} onRequestClose={onClose}>
      <FileLoader
        onAddDataset= {addDatasetToStore}
        onClose={onClose}
      />
    </ReactModal>
  );
}
