import React from 'react';
import {
  faColumns,
  faDatabase,
  faAlignJustify,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProjectCard({ project, stats }) {
  return (
    <div className="project-card card">
      <h2 className="title">{project.name}</h2>
      <p className="description">{project.description}</p>
      <div className="project-card-stats">
        <span>{stats.columns} <FontAwesomeIcon icon={faColumns} /></span>
        <span>{stats.datasets} <FontAwesomeIcon icon={faDatabase} /></span>
        <span>{stats.meta_columns} <FontAwesomeIcon icon={faDatabase} /></span>
      </div>
    </div>
  );
}
