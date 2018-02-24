//Redux的DevTools调试面板
import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

//创建DevTools组件
const DevTools = createDevTools(<DockMonitor
  toggleVisibilityKey="h" // 按h键切换面板
  changePositionKey="q" // 改变面板位置
  defaultIsVisible={false} // 默认显示
  defaultSize={0.2}
>
  <LogMonitor />
</DockMonitor>);

export default DevTools;
