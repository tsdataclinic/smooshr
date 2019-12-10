import React, { useState, useCallback } from 'react';
import ReactModal from 'react-modal';
import { useStateValue } from '../contexts/app_context';
import { useDropzone } from 'react-dropzone';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loadProject } from '../contexts/actions';

import {
  faColumns,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';

export default function ProjectModal({ match, history }) {
  const onClose = () => history.goBack();
  const [, dispatch] = useStateValue();
  const [error,] = useState(null);

  const [project, setProject] = useState(null);

  const onDrop = useCallback(files => {
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = f => {
      setProject(JSON.parse(reader.result));
    };
  }, []);

  const loadIt = () => {
    loadProject(project, dispatch);
    history.goBack();
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      style={{
        content: { height: '50%', width: '60%', transform: 'translate(25%,15%)' },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}>
      <div className="load-project-modal">
        <h1>Load Project</h1>
        <div className="content">
          {project ? (
            <div>
              <h1>{project.project.name}</h1>
              <section>
                <header
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon={faDatabase}
                    style={{ marginRight: '20px' }}
                  />
                  <h2>Datasets</h2>
                </header>
                <p>{project.project.description}</p>
                {project.datasets.map(d => (
                  <p>{d.name}</p>
                ))}
              </section>
              <section>
                <header
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <FontAwesomeIcon
                    icon={faColumns}
                    style={{ marginRight: '20px' }}
                  />
                  <h2>Coumns</h2>
                </header>
                {project.meta_columns.map(mc => (
                  <p>{mc.name}</p>
                ))}
              </section>
              <button onClick={loadIt}>Load</button>
            </div>
          ) : (
              <div {...getRootProps()}>
                <div className="file-tab" style={{ cursor: 'p' }}>
                  <FontAwesomeIcon icon={faFile} />
                  <input
                    {...getInputProps({
                      accept: ['text/csv', 'application/vnd.ms-excel'],
                    })}
                  />
                  {isDragActive ? (
                    <p>Drop the files here ... </p>
                  ) : (
                      <p>
                        Drag 'n' drop project file here or click to load project
                  </p>
                    )}
                </div>
                {error && <p>{error}</p>}
              </div>
            )}
        </div>
      </div>
    </ReactModal>
  );
}
