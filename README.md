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


-----

## 增加node后台接口服务
后台使用node(express)，加mongodb并用redis存储session。app.js 为住服务目录，server目录下models为mongodb文档对象模型，routes为路由处理。


  启动node服务需要先本地安装mongdb和redis，并保证能正常启动数据库服务。执行node app运行node服务
-----

## 增加依赖包大小查看器
执行npm run build打包以后本地访问http://127.0.0.1:8888/ 即可查看
-----

## 增加redux-devtools
在开发环境中按h键可切换显示redux-stroe内容面板，按q切换面板位置
