import React, {useState} from 'react';
import logo from './logo.svg';
import SideBar from './components/SideBar';
import UploadModal from './components/UploadModal';
import ProjectModal from './components/ProjectModal';
import ShowApplyMappingsModal from './components/ApplyMappingsModal';
import CodeExportModal from './components/CodeExportModal';
import AutoClusterModal from './components/AutoClusterModal';
import DatasetPage, {DatasetPageSidebar} from './pages/DatasetPage';
import ColumnPage from './pages/ColumnPage';
import WelcomePage from './pages/WelcomePage';
import ProjectPage, {ProjectPageSidebar} from './pages/ProjectPage';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import 'typeface-lato';

import {useStateValue} from './contexts/app_context';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import './App.scss';

function App() {
  const [{projects}, dispatch] = useStateValue();

  return (
    <Router>
      <div className="App">
        <div className="main">
          <Route
            path="/project/:projectID/dataset/:datasetID"
            exact={true}
            component={DatasetPage}
          />
          <Route
            path="/project/:projectID/column/:columnID"
            exact={true}
            component={ColumnPage}
          />
          <Route
            path="/project/:projectID"
            exact={true}
            component={ProjectPage}
          />
          <Route path="/" exact={true} component={WelcomePage} />
        </div>

        <Route path="/" component={SideBar} />

        <Route path="/new_project" component={ProjectModal} />
        <Route path="/project/:projectID/export" component={CodeExportModal} />
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
