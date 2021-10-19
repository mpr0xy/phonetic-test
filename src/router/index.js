import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from '../pages/Home';
import Practice from '../pages/Practice';
import Learn from '../pages/Learn';
import LearnDetail from '../pages/Learn/detail.js';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/learn/:day'>
          <LearnDetail />
        </Route>
        <Route path='/learn'>
          <Learn />
        </Route>
        <Route path='/practice'>
          <Practice />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
