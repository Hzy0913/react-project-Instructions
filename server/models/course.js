const mongoose = require('mongoose');

const {Schema} = mongoose;
// 课程对象模型
const courseSchema = new Schema({
  title: String,
  bannerselect: String, //banner图选择
  introduce: String, //描述
  score: Number, //积分
  star: Number, //收藏课程
  learns: Number, //学习课程
  tag: String,
  avatar: String,
  address: String, //资源地址
  passworld: String, //提取密码
  content: Array, //展示图片
  text: String,
});

//  banner对象模型
const bannerListSchema = new Schema({
  title: String,
  bannerurl: String,
  link: String,
  sort: Number,
});


const course = {
  Course: mongoose.model('Course', courseSchema),
  BannerList: mongoose.model('BannerList', bannerListSchema),
};
module.exports = course;
