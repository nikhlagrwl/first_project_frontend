import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import home from './templates/home';
import index from './templates/index';

function App() {
  return (
  	<Router>
	    <div className="App">

	      <Route path = "/" exact component = {home} />
	      <Route path = "/index" exact component = {index} />
 
	    </div>
    </Router>
  );
}

export default App;
