import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import home from './templates/home';
import index from './templates/index';
import userDetail from './templates/userDetail';
import createProject from './templates/createProject';
import projectPage from './templates/projectPage';

function App() {
  return (
  	<Router>
	    <div className="App">

	      <Route path = "/" exact component = {home} />
	      <Route path = "/index" exact component = {index} />
	      <Route path = "/user/userdetails" exact component = {userDetail} />
	      <Route path = "/user/createProject" exact component = {createProject} />
	      <Route path = "/project/details" component = {projectPage} />
 
	    </div>
    </Router>
  );
}

export default App;
