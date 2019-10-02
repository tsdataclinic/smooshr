import React from 'react';
import {
  faColumns,
  faDatabase,
  faAlignJustify,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function ProjectCard({project}) {
  return (
    <div className="project-card card">
      <h2 className="title">{project.name}</h2>
      <p className="description">{project.description}</p>
      <div className="project-card-stats">
            <span>{20} <FontAwesomeIcon icon={faColumns} /></span>
            <span>{2} <FontAwesomeIcon icon={faDatabase} /></span>
            <span>{300000} <FontAwesomeIcon icon={faDatabase} /></span>
      </div>
    </div>
  );
}
