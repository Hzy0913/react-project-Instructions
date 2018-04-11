import React, {Component} from 'react';
import {Alert} from 'antd';

class Notfound extends Component {
  render() {
    return (
      <div
        style={{
          width: 800,
          height: 500,
          margin: '0 auto',
          marginTop: '10%'
        }}
      >
        <Alert
          message="404"
          description="页面丢失，请检查您的地址"
          type="warning"
          showIcon
        />
      </div>
    );
  }
}

//导出组件
export default Notfound;
