import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from '../redux';
import App from '../containers/app';
import Login from '../containers/login';
import Main from '../containers/main';
import NotFound from '../containers/notfound';
import List from '../containers/list';
import DevTools from '../redux/DevTools';

const Root = () => (
  <BrowserRouter>
    <Provider store={Store}>
      <div>
        {__DEVTOOLS__ && <DevTools />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Login} />
          <Main>
            <Route exact path="/home" component={App} />
            <Route exact path="/list" component={List} />
            <Route path="*" component={NotFound} />
          </Main>
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default Root;
