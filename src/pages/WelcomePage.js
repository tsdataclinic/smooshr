import React from 'react';
import ProjectCard from '../components/ProjectCard';
import {useStateValue} from '../contexts/app_context';
import {Link} from 'react-router-dom';

export default function WelcomePage() {
  const [{projects}, dispatch] = useStateValue();
  return (
    <div className="welcome-page page">
      <h1 className='large-title-header'>smooshr</h1>
          <p>Wrangle those messy datasets</p>
              <p>We need your help to make smooshr better! Try out our <a href="https://docs.google.com/document/1ANrFqNZKCYR4LohOKPvYVHZAbp1iiK3gpknPINZF6Lw/">tutorial</a> and leave your thoughts on our <a href="https://airtable.com/shrMCZrvP7467LNG7">feedback form</a></p>
      {projects && (
        <div>
          <div className="">
            <div className="region-header">
              <h2>your projects</h2>
              <Link to={'/new_project'}>
                <button>New Project</button>
              </Link>
            </div>
            <div className="region-list">
              {projects.map(p => (
                <Link to={`/project/${p.id}`}>
                  <ProjectCard project={p} />
                </Link>
              ))}
            </div>
          </div>

          <div className="">
            <div className="region-header">
              <h2>community projects</h2>
            </div>
            <div className="region-list">
              {[].map(p => (
                <Link to={`/project/${p.id}`}>
                  <ProjectCard project={p} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
