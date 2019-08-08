import React, {useState} from 'react';
import logo from './logo.svg';
import DatasetPicker from './components/DatasetPicker'
import UploadModal from './components/UploadModal'
import ColumnsList from './components/ColumnsList'
import DatasetPage from './pages/DatasetPage'
import ColumnPage from './pages/ColumnPage'
import WelcomePage from './pages/WelcomePage'
import {useStateValue} from './contexts/app_context'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import './App.css';


function App() {
  const [{datasets, showUploadModal}, dispatch] = useStateValue()


  return (
    <Router>
        <div className="App">
          <header className="header">
              <Route path='/dataset/:datasetID' render={datasetID=>
                <h3>Dataset</h3>} 
              />
              <Route path='/' exact={true} render={()=>
                <h3>Smoosher</h3>} 
              />
          </header>

          <div className='main'>
              <Route path='/dataset/:datasetID' exact={true} component={DatasetPage} />
              <Route path='/dataset/:datasetID/column/:columnID' component={ColumnPage} />
              <Route path='/' exact={true} component={WelcomePage} />
          </div>

          <div className='sidenav'>
              <Route path='/' exact={true} render={() =>
                  <DatasetPicker 
                      datasets={datasets} 
                      onShowUploadModal={()=>dispatch({ type: 'SHOW_UPLOAD_MODAL'})}
                  />
              }/>
          
              <Route path='/dataset/:datasetID' component={ColumnsList}/>
          </div>
          
          <footer className='footer'>
              <h3>Footer</h3>
          </footer>

          <UploadModal 
              visible={showUploadModal} 
              onClose={()=>dispatch({ type: 'HIDE_UPLOAD_MODAL'})}
              onGotDatasets={(newDatasets)=> 
                  dispatch({
                     type: 'ADD_DATASETS',
                     payload: [newDatasets]
                  })
              }
          />

        </div>
     </Router>
  );
}

export default App;
