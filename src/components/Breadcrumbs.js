import React from 'react';
import {Link} from 'react-router-dom';
import {useProject, useMetaColumn} from '../contexts/app_context';

export default function Breadcrumbs({match}) {
  const {projectID, columnID} = match.params;
  const {project} = useProject(projectID);
  const {meta_column} = useMetaColumn(columnID);
  return (
    <h2>
      {project ? (
        <Link to={`/project/${project.id}`}>{project.name} </Link>
      ) : (
        ''
      )}{' '}
      {meta_column ? `> ${meta_column.name}` : ''}
    </h2>
  );
}
