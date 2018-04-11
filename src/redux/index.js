import {createStore, applyMiddleware, compose} from 'redux';
import reduxOrder from 'redux-order';
import reducers from './reduces';
import DevTools from './DevTools';

const enhancer = compose(
  //你要使用的中间件，放在前面
  applyMiddleware(reduxOrder()),
  //启用带有monitors（监视显示）的redux DevTools
  DevTools.instrument()
);

const store = createStore(
  reducers,
  enhancer
);

export default store;
