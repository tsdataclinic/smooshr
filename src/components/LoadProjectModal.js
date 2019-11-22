import React, {useState, useCallback} from 'react';
import ReactModal from 'react-modal';
import {useStateValue} from '../contexts/app_context';
import {useDropzone} from 'react-dropzone';
import {faFile, faDownload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {loadProject} from '../contexts/actions';

export default function ProjectModal({match, history}) {
  const onClose = () => history.goBack();
  const [_, dispatch] = useStateValue();
  const [error, setError] = useState(null);

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [project, setProject] = useState(null);

  const onDrop = useCallback(files => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = f => {
      setProject(JSON.parse(reader.result));
    };
  });

  const loadIt = () => {
    loadProject(project, dispatch);
    history.goBack();
  };
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <ReactModal isOpen={true} onRequestClose={onClose}>
      <div className="load-project-modal">
        {project ? (
          <div>
            <h1>{project.project.name}</h1>
            <button onClick={loadIt}>Load</button>
          </div>
        ) : (
          <div {...getRootProps()}>
            <div className="file-tab" style={{cursor: 'p'}}>
              <FontAwesomeIcon icon={faFile} />
              <input
                {...getInputProps({
                  accept: ['text/csv', 'application/vnd.ms-excel'],
                })}
              />
              {isDragActive ? (
                <p>Drop the files here ... </p>
              ) : (
                <p>Drag 'n' drop project file here or click to load project</p>
              )}
            </div>
            {error && <p>{error}</p>}
          </div>
        )}
      </div>
    </ReactModal>
  );
}
