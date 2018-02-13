import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Menu, Icon} from 'antd';
import {bindActionCreators} from 'redux';
import bgimg from '../assets/bg.jpg';
import {Artboard, Artboard1} from '../assets/svgs';
import * as authActions from '../redux/reduces/auth';

const {SubMenu} = Menu;
const MenuItemGroup = Menu.ItemGroup;

@connect(
  state => ({auth: state.auth}),
  dispatch => bindActionCreators(authActions, dispatch)
)
class App extends Component {
  state = {
    id: ''
  }
  componentWillMount() {
    this.setState({id: 1});
    this.setState({i123d: '漂亮'});
  }
  componentDidMount() {
  }
  handleClick = (e) => {
    const test = {
      node: '1122'
    };
    store.dispatch(authActions.login(test));
  };
  render() {
    const asd = {asd: 1};
    const asdasd = {};
    console.log(this.props);
    return (
      <div className="node">
        <img src={bgimg} alt="" />
        <p>雪上风景</p>
        <p>{this.state.id}</p>
        <p>{this.state.i123d}</p>
        <Button type="primary" onClick={this.handleClick}>Primary</Button>
        <i className="iconfont icon-shoucang" />
        <svg className="icon" aria-hidden="true" dangerouslySetInnerHTML={{__html: Artboard1}} />
        <svg className="icon" aria-hidden="true" dangerouslySetInnerHTML={{__html: Artboard}} />
      </div>
    );
  }
}


//导出组件
export default App;
