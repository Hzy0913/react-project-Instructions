import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Steps, Button, message, Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const {Step} = Steps;
const steps = [{
  title: 'First',
  content: 'First-content',
}, {
  title: 'Second',
  content: 'Second-content',
}, {
  title: 'Last',
  content: 'Last-content',
}];

class List extends Component {
  state = {
    current: 0,
  };

  next() {
    const current = this.state.current + 1;
    this.setState({current});
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({current});
  }

  render() {
    const {current} = this.state;
    const contentStyle = {
      background: '#fff',
      padding: 24,
      margin: 0,
      minHeight: 280
    };
    return (
      <div>
        <Layout className="main-layout">
          <Layout className="main-content">
            <Sider width={200} className="main-sider">
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                  <Menu.Item key="1"><Link to="/list/img">Img</Link></Menu.Item>
                  <Menu.Item key="3"><Link to="/list/svg">Svg</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/list/icon">Icon</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content className="list-content" style={{contentStyle}}>{this.props.children}</Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}


//导出组件
export default List;
