/* eslint-disable import/no-named-as-default */
import {combineReducers} from 'redux';
import auth from './auth'; // 引入auth reduce
// 合并多个reduce
export default combineReducers({
  auth,
});
