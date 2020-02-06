import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import home from './components/home';
import login from './components/login';

export default (
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/home" />)}/>
      <Route exact path="/login" component={login} />
      <Route exact path="/home" component={home} />
    </Switch>
  );