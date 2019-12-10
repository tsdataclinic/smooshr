import React from 'react';
import ProjectCard, { EmptyProjectCard } from '../components/ProjectCard';
import { useProjectStats, useStorage } from '../contexts/app_context';
import { Link } from 'react-router-dom';

import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

export default function WelcomePage() {
  const projects = useProjectStats();
  const { quota, usage } = useStorage();

  return (
    <div className="welcome-page page">
      <header className="welcome-page-header">
        <h1 className="large-title-header">smooshr</h1>
        <p>Wrangle those messy datasets</p>
        <p className="feedback">
          We need your help to make smooshr better! Try out our{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/1ANrFqNZKCYR4LogOKPvYVHZAbp1iiK3gpknPlNZF6Lw/">
            tutorial
          </a>{' '}
          and leave your thoughts on our{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://airtable.com/shrMCZrvP7467LNG7">
            feedback form
          </a>
        </p>
      </header>
      {projects && (
        <div className="projects-area">
          <div className="">
            <div className="region-header">
              <h2>local projects</h2>
            </div>
            <div className="region-list">
              {projects.map(p => (
                <Link to={`/project/${p.project.id}`}>
                  <ProjectCard project={p.project} stats={p.stats} />
                </Link>
              ))}
              <Link to={'/new_project'}>
                <EmptyProjectCard prompt={'New Project'} icon={faPlus} />
              </Link>
              <Link to={'/load_project'}>
                <EmptyProjectCard prompt={'Load Project'} icon={faUpload} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="Storage">
        <p>smooshr processes and stores all data locally on your machine.</p>
        {quota && (
          <p>
            It is currently using {usage.toLocaleString()} Mb of{' '}
            {quota.toLocaleString()} Mb.
          </p>
        )}
      </div>
    </div>
  );
}
