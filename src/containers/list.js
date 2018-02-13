import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Steps, Button, message} from 'antd';

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
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">{steps[this.state.current].content}</div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    );
  }
}


//导出组件
export default List;
