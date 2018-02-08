import React from 'react';
import ReactDOM from 'react-dom'; // react-dom 中的ReactDOM方法
import axios from 'axios'; // 引入 axios
import Root from './router/router'; // 引入 router
import store from './redux'; // 引入 store

import './style/index.styl';

import './assets/iconfont.css';
import './assets/iconfont.js';

window.store = store;
window.axios = axios;
ReactDOM.render(<Root />, document.getElementById('app')); // 渲染路由并且挂载到app ID的节点上
