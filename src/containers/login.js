import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {Layout, Menu, Breadcrumb, Icon, Form, Input, Button, Checkbox, message, Tabs} from 'antd';

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
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const {
      auth: {
        auth = '',
        status: {err, message: tipmessage} = {}, requesting = '', requested = ''
      },
      emptyStatu
    } = nextProps;
    if (auth) {
      return this.context.router.history.push('/');
    } else if (requested) {
      if (err) {
        message.error(tipmessage);
      } else {
        message.success(tipmessage);
      }
      emptyStatu();
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
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
  render() {
    console.log(this.props);
    console.log(__PRO__);
    const emailreg = new RegExp('^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@(' +
      '[A-Za-zd0-9]+[-.])+[A-Za-zd]{2,5}$');
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const {auth: {requesting = false}} = this.props;
    const loginDom =
    (<Form className="login-form" >
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
      <Button type="primary" loading={requesting} onClick={this.loginSubmit} style={{width: '100%'}} >登录</Button>
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
      <Button type="primary" loading={requesting} onClick={this.registerSubmit} style={{width: '100%'}}>注册</Button>
    </Form>);
    return (
      <Layout style={{position: 'fixed', width: '100%', height: '100%'}}>
        <Header>Header</Header>
        <Content>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="登录" key="1">{loginDom}</TabPane>
            <TabPane tab="注册" key="2">{register}</TabPane>
          </Tabs>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}


//导出组件
export default Form.create()(Login);
