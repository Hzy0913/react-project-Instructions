import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Layout, Menu, Breadcrumb, Icon, Form, Input, Button, Checkbox, message, Tabs} from 'antd';
import Mavatar from 'mavatar';
import loginImg from '../assets/login-img.jpg';
import regImg from '../assets/reg-img.jpg';

import * as authActions from '../redux/reduces/auth';

const FormItem = Form.Item;


const {SubMenu} = Menu;
const {TabPane} = Tabs;
const {Header, Content, Footer} = Layout;

@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Login extends Component {
  static propTypes = {
    auth: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    const {emptyStatu} = nextProps;
    const {
      auth: {
        auth = '',
        message: messageinfo,
        err,
      }
    } = nextProps;
    if (err && err !== 200 && messageinfo) {
      message.error(messageinfo);
      emptyStatu();
    } else if (messageinfo) {
      message.success(messageinfo);
      emptyStatu();
    }
    if (auth) {
      const tid = localStorage.getItem('tid');
      axios.defaults.headers.tid = tid || ''; // 全局axios 设置请求头token
      return this.context.router.history.push('/home');
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
      }
    });
  };
  caijian = () => {
    window.avatar.imageClipper();
  }
  czheadel = () => {
    const a = window.avatar.resetImage();
  }
  loginSubmit = (e) => {
    const {login} = this.props;
    e.preventDefault();
    const validateArr = ['userName', 'password'];
    this.props.form.validateFields(validateArr, (err, values) => {
      if (!err) {
        login(values.userName, values.password);
      }
    });
  };
  registerSubmit = (e) => {
    const {register} = this.props;
    e.preventDefault();
    const validateArr = ['reguserName', 'regpassword', 'regpasswordagain'];
    this.props.form.validateFields(validateArr, (err, values) => {
      if (!err) {
        register(values.reguserName, values.regpassword);
      }
    });
  };
  onTabClick =(index) => {
    if (index === '1') {
      this.context.router.history.push('/login');
    } else {
      this.context.router.history.push('/login#register');
    }
  }
  render() {
    const emailreg = new RegExp('^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@(' +
      '[A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$');
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const {auth: {requesting = false}} = this.props;
    const loginDom =
    (<Form className="login-form" >
      <img src="http://img.binlive.cn/upload/1509024953810" className="login-logo" />
      <p className="login-admin-text"><span>React</span>Admin</p>
      <FormItem hasFeedback>
        {getFieldDecorator('userName', {
          rules: [
            {required: true, message: '请输入您的邮箱账号'},
            {pattern: emailreg, message: '账号格式不正确'}
          ],
        })(<Input
          prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
          placeholder="请输入您的账号"
        />)}
      </FormItem>
      <FormItem hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {required: true, message: '请输入您的密码'},
            {min: 6, message: '密码不能小于6位数'}
          ],
        })(<Input
          prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
          type="password"
          placeholder="请输入您的密码"
        />)}
      </FormItem>
      <Button
        type="primary"
        loading={requesting}
        onClick={this.loginSubmit}
        style={{width: '100%'}}
      >登录</Button>
    </Form>);
    const register = (<Form onSubmit={this.handleSubmit} className="login-form">
      <FormItem hasFeedback>
        {getFieldDecorator('reguserName', {
          rules: [{required: true, message: '请输入您的邮箱账号'},
            {pattern: emailreg, message: '账号格式不正确'}],
        })(<Input
          prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
          placeholder="请输入您的注册邮箱"
        />)}
      </FormItem>
      <FormItem hasFeedback>
        {getFieldDecorator('regpassword', {
          rules: [{required: true, message: '请输入您的密码'}, {min: 6, message: '密码不能小于6位数'}],
        })(<Input
          prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
          type="password"
          placeholder="请输入您的密码"
        />)}
      </FormItem>
      <FormItem hasFeedback>
        {getFieldDecorator('regpasswordagain', {
          rules: [
            {message: '两次密码输入不一致'}, {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback('两次密码输入不一致');
                } else if (value !== getFieldValue('regpassword')) {
                  callback('两次密码输入不一致');
                } else {
                  callback();
                }
              }
            }]
        })(<Input
          prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
          type="password"
          placeholder="请再次输入您的密码"
        />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(<Checkbox>记住</Checkbox>)}
      </FormItem>
      <Button
        type="primary"
        loading={requesting}
        onClick={this.registerSubmit}
        style={{width: '100%'}}
      >注册</Button>
    </Form>);
    return (
      <Layout style={{position: 'fixed', width: '100%', height: '100%'}}>
        <Content className="form-Content">
          <Tabs onTabClick={this.onTabClick} defaultActiveKey={window.location.hash ? '2' : '1'}>
            <TabPane tab="登录" key="1">
              <div className="form-box">
                <div className="form-content">
                  {loginDom}
                </div>
                <div className="form-image">
                  <img src={loginImg} alt="" />
                </div>
              </div>
            </TabPane>
            <TabPane tab="注册" key="2">
              <div className="form-box">
                <div className="form-content">
                  {register}
                </div>
                <div className="form-image" >
                  <img src={regImg} alt="" style={{left: -20}} />
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    );
  }
}


//导出组件
export default Form.create()(Login);
