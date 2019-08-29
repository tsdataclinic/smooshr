import React, {useState} from 'react';
import logo from './logo.svg';
import SideList from './components/SideList';
import UploadModal from './components/UploadModal';
import ProjectModal from './components/ProjectModal';
import ShowApplyMappingsModal from './components/ApplyMappingsModal';
import AutoClusterModal from './components/AutoClusterModal';
import DatasetPage, {DatasetPageSidebar} from './pages/DatasetPage';
import ColumnPage from './pages/ColumnPage';
import WelcomePage from './pages/WelcomePage';
import ProjectPage, {ProjectPageSidebar} from './pages/ProjectPage';

import {useStateValue} from './contexts/app_context';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import './App.css';

function App() {
  const [{projects}, dispatch] = useStateValue();

  return (
    <Router>
      <div className="App">
        <header className="header">
          <Route
            path="/dataset/:datasetID"
            render={datasetID => <h3>Dataset</h3>}
          />
          <Route path="/" exact={true} render={() => <h3>Smoosher</h3>} />
        </header>

        <div className="main">
          <Route
            path="/project/:projectID/dataset/:datasetID"
            exact={true}
            component={DatasetPage}
          />
          <Route
              path="/project/:projectID/dataset/:datasetID/column/:columnID"
            component={ColumnPage}
          />
          <Route
            path="/project/:projectID"
            exact={true}
            component={ProjectPage}
          />
          <Route path="/" exact={true} component={WelcomePage} />
        </div>

        <div className="sidenav">
          <Route
            path="/"
            exact={true}
            render={() => (
              <SideList
                entries={projects.map(project => (
                  <Link to={`/project/${project.id}`}>{project.name}</Link>
                ))}
                actionPrompt="New Project"
                actionLink="/new_project"
                title="Projects"
              />
            )}
          />

          <Route
            path="/project/:projectID/dataset/:datasetID"
            exact={true}
            component={DatasetPageSidebar}
          />
          <Route path="/project/:projectID" component={ProjectPageSidebar} />
        </div>

        <footer className="footer">
          <h3>Footer</h3>
        </footer>

        <Route path="/new_project" component={ProjectModal} />

        <Route
          path="/project/:projectID/add_datasets"
          component={UploadModal}
        />

        <Route
          path="/dataset/:datasetID/apply"
          component={ShowApplyMappingsModal}
        />
        <Route
            path="/project/:projectID/dataset/:datasetID/column/:columnID/guess_categories"
          component={AutoClusterModal}
        />
      </div>
    </Router>
  );
}

export default App;
