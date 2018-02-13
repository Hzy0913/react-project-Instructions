const mongoose = require('mongoose');
const auth = require('./auth');
const course = require('./course');

mongoose.connect('mongodb://localhost:27017/db'); // 连接mongodb


const Models = Object.assign(
  auth,
  course
);

module.exports = Models;

