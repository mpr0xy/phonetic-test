import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from '../pages/Home';
import Practice from '../pages/Practice';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
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
