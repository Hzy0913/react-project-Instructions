import React, {Component} from 'react';
import {connect} from 'react-redux';
import bgimg from '../assets/bg.jpg'
import {Artboard, Artboard1} from '../assets/svgs'
import { Button, Menu, Icon } from 'antd';
import {bindActionCreators} from 'redux';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import * as authActions from '../redux/reduces/auth';

@connect(
    state => ({auth: state.auth}),
    dispatch => bindActionCreators(authActions, dispatch)
)
class App extends Component {
    handleClick = (e) => {
        console.log(this.props)
        store.dispatch(authActions.login(test));
        const test = {
            node: '1122'
        }
    }
    render() {
        console.log(this.props.auth)
        return (
            <div className="node">
                <img src={bgimg} alt=""/>
                <p>雪上风景</p>
                <Button type="primary" onClick={this.handleClick}>Primary</Button>
                <i className="iconfont icon-shoucang"/>
                <svg className="icon" aria-hidden="true" dangerouslySetInnerHTML={{__html: Artboard1 }}/>
                <svg className="icon" aria-hidden="true" dangerouslySetInnerHTML={{__html: Artboard }}/>
            </div>
        );
    }
}


//导出组件
export default App;