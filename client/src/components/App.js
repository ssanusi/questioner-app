import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Header from './Header';

const App = () => (
  <Router>
    <div>
      <Header className="navbar" />
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  </Router>
);

export default App;
