import React from 'react';
import {message} from 'antd';
import ReactDOM from 'react-dom'; // react-dom 中的ReactDOM方法
import browserHistory from 'react-router';
import axios from 'axios'; // 引入 axios
import createHistory from 'history/createBrowserHistory';
import Root from './router/router'; // 引入 router
import store from './redux'; // 引入 store

// 全局css
import './style/index.styl';
// 字体图标
import './assets/iconfont.css';
import './assets/iconfont.js';

const history = createHistory();
export default history;
// 给window 定义全局对象下
window.store = store;
window.axios = axios;
const tid = localStorage.getItem('tid');
axios.defaults.headers.tid = tid || ''; // 全局axios 设置请求头token
axios.interceptors.response.use(
  res => res,
  err => {
    const {data: {error}} = (err || {}).response;
    if (error) {
      message.error(error);
    }
    if (err.response.status === 401) {
      message.info('您的登录已过期，请重新登录');
      setTimeout(() => {
        history.replace('/login');
        localStorage.removeItem('tid');
        window.location.reload();
      }, 600);
    }
  }
);
ReactDOM.render(<Root />, document.getElementById('app')); // 渲染路由并且挂载到app ID的节点上
