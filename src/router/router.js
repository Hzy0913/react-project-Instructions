import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from '../redux';
import App from '../containers/app';
import Main from '../containers/main';
import NotFound from '../containers/notfound';
import List from '../containers/list';


const Root = () => (
  <BrowserRouter>
    <Provider store={Store}>
      <div>
        <Main>
          <Switch>
            <Route exact path="/home" component={App}/>
            <Route exact path="/list" component={List}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </Main>
      </div>
    </Provider>
  </BrowserRouter>
);

export default Root;
