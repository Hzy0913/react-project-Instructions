# react项目
## 项目组成

__项目使用react+react-router-redux__,异步redux（redux-thunk）,请求工具为axios,按需引入antd ui组件。

-----

## webpack配置
 webpack.config文件中配置了生产环境和开发环境代码区分，并有具体说明。

-----

## eslint代码检测
 代码使用基于eslint-config-airbnb的eslint检测规则，加强代码质量。(如不需要eslint只需注释掉webpack.config.js中掉eslint-loader即可)

-----

## 图片及图标
 静态资源目录为assets,使用iconfont字体图标[iconfont](http://www.iconfont.cn/)。svg图标需要在assets目录中svgs.js中引入并导出。
