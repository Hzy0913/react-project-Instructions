import React, {Component} from 'react';
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Icon, message, Dropdown, Button} from 'antd';
import {bindActionCreators} from 'redux';
import * as authActions from '../redux/reduces/auth';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class Main extends Component {
  static propTypes = {
    auth: PropTypes.object
  }
  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };
  state = {
    path: 'home'
  }
  componentWillMount() {
    const {history: {location: {pathname}}} = this.props;
    const path = pathname.substr(1).split('/')[0];
    this.setState({path});
    const {authed} = this.props;
    const tid = localStorage.getItem('tid');
    if (!tid) {
      this.context.router.history.push('/login');
    }
  }
  logout = (e) => {
    localStorage.removeItem('tid');
    message.info('您已登出');
    setTimeout(() => {
      this.context.router.history.push('/login');
      window.location.reload();
    }, 800);
  }
  render() {
    const contentStyle = {
      background: '#fff',
      padding: 24,
      margin: 0,
      minHeight: 280
    };
    const self = this;
    const menu = (
      <Menu onClick={this.logout}>
        <Menu.Item >
          <Icon type="logout" style={{marginRight: 10}} />退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{paddingTop: 64, minHeight: '100%'}}>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.state.path]}
            style={{lineHeight: '64px'}}
          >
            <Menu.Item key="home" >
              <Link to="/home"><Icon type="home" className="menu-icon" /></Link>
            </Menu.Item>
            <Menu.Item key="list" className="menu-icon" >
              <Link to="/list/img" ><Icon type="tag" /></Link>
            </Menu.Item>
            <Menu.Item key="user" className="menu-icon" >
              <Link to="/user" ><Icon type="user" /></Link>
            </Menu.Item>
            <Menu.Item key="3" className="menu-icon" >
              <Link to="/uerr122/asddasd" ><Icon type="rocket" /></Link>
            </Menu.Item>
          </Menu>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button className="logout">
              <Icon type="ant-design" style={{fontSize: 16}} />
              Admin
            </Button>
          </Dropdown>
        </Header>
        <Layout className="main-layout">
          <Layout className="main-content">
            <Content style={{contentStyle}}>{this.props.children}</Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}


//导出组件
export default Main;
