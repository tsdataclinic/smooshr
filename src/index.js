import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {StateProvider} from './contexts/app_context'
import {DCThemeProvider} from "@dataclinic/dataclinic"

ReactDOM.render(
<StateProvider>
  <DCThemeProvider>
    <App />
  </DCThemeProvider>
</StateProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
