const router = require('express').Router();
const db = require('../models'); //models

router.get('/auth', (req, res, next) => {
  const auth = req.session.auth;
  if (auth) {
    res.json({auth});
    return;
  }
  res.json({statu: 0});
});

router.post('/login', (req, res, next) => {
  console.log();
  const {user: userName, pass} = req.body;
  if (!userName && !pass) {
    res.json({
      statu: 0,
      message: '账号密码未输入'
    });
    return;
  }
  const output = {
    name: 1,
    user: 1,
    passworld: 1,
  };
  console.log(userName);
  db.MUser.findOne({user: userName}, output, (err, docs) => {
    console.log(err);
    console.log(docs);
    if (err) { res.json({err: 404, message: '账号或密码不正确'}); return; }
    if (!docs) { res.json({err: 404, message: '账号或密码不正确'}); return; }
    // if (!docs.isregister) {
    //   res.json({err: 301, message: '您还未验证邮箱'});
    // }
    if (docs.passworld !== pass) {
      res.json({err: 403, message: '您输入的账号密码不正确'});
    } else {
      req.session.auth = docs;
      res.json({auth: docs});
    }
  });
});

router.post('/register', async (req, res, next) => {
  const {user, pass} = req.body;
  if (!user && !pass) { res.json({err: 500, message: '未输入注册账号密码'}); return; }
  const hasUser = await db.MUser.findOne({user}, (err, docs) => {
    console.log(err);
    console.log(docs);
    if (err) { res.status(500).json({err: 500, message: '服务器错误'}); return; }
    if (docs) { res.json({err: 2, message: '该账号已存在!'}); return; }
    return false;
  });
  console.log(hasUser);
  if (!hasUser) {
    const userobj = {
      user,
      passworld: pass,
    };
    new db.MUser(userobj).save((err) => {
      if (err) { res.status(500).json({err: 500, message: '服务器错误'}); return; }
      res.json({message: '注册成功'});
    });
  }
});

router.get('/test', (req, res, next) => {
  db.MUser.count({}, (err, docs) => {
    res.json({docs});
    console.log(docs);
  });
});

module.exports = router;
