const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var SpritesmithPlugin = require('webpack-spritesmith');

var getHtmlConfig = function (name,title) {
  return {
    filename: 'view/' + name + '.html',
    template: 'src/view/' + name + '.tmp.html',
    title: 'xuanhuan',
    inject: true,
    hash: true,
    title:title,
    chunks: ['common', name]
  }
}

module.exports = {
  entry: {
    'common': path.resolve(__dirname, 'src', 'page', 'common', 'index'),
    'index': path.resolve(__dirname, 'src', 'page', 'index', 'index'),
    'result': path.resolve(__dirname, 'src', 'page', 'result', 'index'),
    'user-login': path.resolve(__dirname, 'src', 'page', 'user-login', 'index'),
    'user-register': path.resolve(__dirname, 'src', 'page', 'user-register', 'index'),
    'user-pw-reset': path.resolve(__dirname, 'src', 'page', 'user-pw-reset', 'index'),
    'user-center': path.resolve(__dirname, 'src', 'page', 'user-center', 'index'),
    'user-center-update': path.resolve(__dirname, 'src', 'page', 'user-center-update', 'index'),
    'user-pw-update': path.resolve(__dirname, 'src', 'page', 'user-pw-update', 'index'),
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    //devserver
    publicPath: '/',
    //build
    // publicPath:"../"
  },

  module: {
    rules: [{
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }, {
        test: /\.(gif|png|jpg|woff|woff2|eot|svg|ttf)\??.*$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'url-loader?limit=128&name=assets/[name].[ext]'
      },{
        test: /\.string$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'html-loader',
      }
    ]
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      util: path.resolve(__dirname, 'src', 'util'),
      page: path.resolve(__dirname, 'src', 'page'),
      server: path.resolve(__dirname, 'src', 'server'),
      img: path.resolve(__dirname, 'src', 'image')
    },
    modules: ["node_modules", "build/image"]
  },

  externals: {
    'jquery': 'window.jQuery',
  },

  devServer: {
    publicPath: '/',
    port: 9090,
    contentBase:path.resolve(__dirname, 'dist'),
    openPage: 'view/',
    inline: true,
    // inline:false,
    // stats: "errors-only",
    // hot:true
  },

  plugins: [
    //html模板处理
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('result','结果')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pw-reset','注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pw-update','修改密码')),


    // 独立通用模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js',
    }),

    // 抽离css文件
    new ExtractTextPlugin('css/[name].css'),

    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/image/icon'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/build', 'image', 'sprite.png'),
        css: path.resolve(__dirname, 'src/build', 'css', '_sprite.scss'),
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    })

    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
};