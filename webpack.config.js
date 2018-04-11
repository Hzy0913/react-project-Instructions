var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CompressionWebpackPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),  // 生成文件目录，__dirname（为绝对路径） 下的dist 目录
    publicPath: '/',
    filename: 'process.env.NODE_ENV' === 'production' ? '[name].[hash].js' : '[hash].js', // 在配置文件中使用`process.env.NODE_ENV',
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime', 'transform-decorators-legacy', ['import', {
            'libraryName': 'antd',
            'style': 'css'
          }]],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {test: /\.js$/, use: 'eslint-loader', exclude: /node_modules/, enforce: 'pre'},//eslint处理器,如需要关闭eslint只需要注释掉该行
      {test: /\.css$/, loader: 'style-loader!css-loader'}, //对.css文件，使用loader里的加载器处理
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'}, //对.styl文件，使用loader里的加载器处理
      {
        test: /\.(png|jpg|gif|svg)$/,  //对图片文件，使用 url-loader里的加载器处理
        loader: 'url-loader',
        options: {
          limit: 8192,   //限制图片文件字节，大于8KB则不生成base64 用路径引用替代（相当于file－loader）
          name: '[name].[ext]?[hash]' //文件名
        }
      },
      {
        test: /\.(woff|ttf|eot|svg)$/,  //对字体文件，使用 url-loader里的加载器处理
        loader: 'url-loader',
        options: {
          limit: 8192,   //限制文件字节，大于8KB则不生成base64 用路径引用替代（相当于file－loader）
          name: '[name].[ext]?[hash]' //文件名
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      __DEVTOOLS__: process.env.NODE_ENV === 'development', //判断node环境变量为development是赋值为true
      __PRO__: process.env.NODE_ENV === 'production', //判断node环境变量为development是赋值为true
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ],
  devtool: 'inline-source-map', // map文件追踪错误提示
  devServer: {                  // 启动本地开发的node服务器环境（webpack-dev-server）
    port: 8080,                 // 端口
    contentBase: './dist',      // 开发环境的服务目录
    historyApiFallback: true,
    inline: true,
    hot: true,                  // 启用热更新
    proxy: {                    // 跨域代理
      '/api': {
        target: 'http://localhost:7000',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api'    //后面可以使重写的新路径，一般不做更改
        }
      },
      '/auth': {
        target: 'http://localhost:7000',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/auth': '/auth'    //后面可以使重写的新路径，一般不做更改
        }
      },
    }
  },
};
// 根据 process.env.NODE_ENV 判断 是否为生产环境
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CleanWebpackPlugin(['dist']), // 清除dist目录下的旧文件
    new webpack.optimize.UglifyJsPlugin({ // 压缩js文件
      sourceMap: true,
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),// 抽离css
    new CompressionWebpackPlugin({ //gzip 压缩
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),
  ]);
}
