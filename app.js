const express = require('express');
const http = require('http');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');// cookie 模块
const session = require('express-session');// session 模块
const redis = require('redis'); //redis 模块


const app = express();
const server = http.Server(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //打印请求日志
app.use(compression());//开启gzip 压缩
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); //格式化req
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //静态资源目录

const client = redis.createClient('6379', '127.0.0.1');// 默认监听6379端口,'127.0.0.1'为你本地ip(默认不需要修改)
const RedisStore = require('connect-redis')(session);

// 检测redis 链接错误
client.on('error', (error) => {
  if (error) {
    console.log(error);
  }
});

// session配置
app.use(session({
  name: 'names',
  secret: 'chyingp', // 用来对session id相关的cookie进行签名
  store: new RedisStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000  // 有效期，单位是毫秒, 这里设置的是2分钟
  }
}));

// 检测 session是否正常
app.use((req, res, next) => {
  if (!req.session) {
    console.log(1);
    return next(new Error('session错误'));
  }
  next(); // 正常载入下一个中间件
});

// routers
app.use('/api', require('./server/routes/auth'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 监听端口启动服务
server.listen(process.env.PORT || 9000, () => {
  console.log('应用实例，访问地址为 localhost:9000');
});
