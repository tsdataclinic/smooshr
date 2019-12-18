import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useStateValue } from '../contexts/app_context';

export default function ProjectModal({ match, history }) {
  const onClose = () => history.goBack();
  const [, dispatch] = useStateValue();

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const createProject = () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: { name, description },
    });
    onClose();
  };

  return (
    <ReactModal

      isOpen={true}

      className="Modal"
      overlayClassName="Overlay"
      onRequestClose={onClose}>
      <div className="new-project-modal">
        <h1>New Project</h1>
        <p>Project Name</p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="name"
        />
        <p>Description</p>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="description"
        />
        <div className="buttons">
          <button onClick={createProject}>Create</button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
