import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Header from './Header';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

const App = () => (
  <Router>
    <div>
      <Header className="navbar" />
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </div>
  </Router>
);

export default App;
