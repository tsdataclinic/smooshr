import React, {useState, useEffect} from 'react';
import {useProject} from '../contexts/app_context';
import {Link} from 'react-router-dom';
import SideList from '../components/SideList';

export default function ProjectPage(props) {
  const {match} = props;
  const {projectID} = match.params;
  const {project, datasets} = useProject(projectID);

  return (
    <div>
      {project ? (
        <React.Fragment>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <div className="datasets">
            
          </div>
          <Link to={`/project/${projectID}/add_datasets`}>
            <button>Add Datasets</button>
          </Link>
        </React.Fragment>
      ) : (
        <h1>Project not found</h1>
      )}
    </div>
  );
}

export function ProjectPageSidebar(props) {
  const {match} = props;
  const {projectID} = match.params;

  const {project, datasets} = useProject(projectID);
  return (
    datasets && (
      <SideList
        title={'Datasets'}
        entries={datasets.map(d => (
          <Link to={`/project/${projectID}/dataset/${d.id}`}>{d.name}</Link>
        ))}
        actionPrompt="Add Datasets"
        actionLink={`/project/${projectID}/add_datasets`}
      />
    )
  );
}
