import React, {useState} from 'react';
import ReactModal from 'react-modal';
import {useStateValue} from '../contexts/app_context';

export default function ProjectModal({match, history}) {
  const onClose = () => history.goBack();
  const [_, dispatch]= useStateValue();

  const [name,setName] = useState();
  const [description,setDescription] = useState();

  const createProject= () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: {name, description},
    });
    onClose();
  };

  return (
    <ReactModal isOpen={true} onRequestClose={onClose}>
        <h1>New Project</h1>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder='name' />
        <input value={description} onChange={e=>setDescription(e.target.value)} placeholder='description' />
        <div className='buttons'>
            <button onClick={createProject}>Submit</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    </ReactModal>
  );
}
