import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Root from './Root.js'
import './index.css';
import * as serviceWorker from './serviceWorker';

const RoutedApp = () => {
  return(
    <Router>
      {
        Root.map((root, i)=>{
          return <Route key={i} path={root.path} component={root.Component}/>
        })
      }
    </Router>
  )
}

ReactDOM.render(
  <RoutedApp />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
