const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var getHtmlConfig = function (name, title) {
  return {
    filename: 'view/' + name + '.html',
    template: 'src/view/' + name + '.tmp.html',
    title: 'xuanhuan',
    favicon: './favicon.ico',
    inject: true,
    title: title,
    chunks: ['common', name]
  }
}

module.exports = {
  devtool: 'source-map',
  entry: {
    'common': path.resolve(__dirname, 'src', 'page', 'common', 'index'),
    'index': path.resolve(__dirname, 'src', 'page', 'index', 'index'),
    'list': path.resolve(__dirname, 'src', 'page', 'list', 'index'),
    'result': path.resolve(__dirname, 'src', 'page', 'result', 'index'),
    'user-login': path.resolve(__dirname, 'src', 'page', 'user-login', 'index'),
    'user-register': path.resolve(__dirname, 'src', 'page', 'user-register', 'index'),
    'user-pw-reset': path.resolve(__dirname, 'src', 'page', 'user-pw-reset', 'index'),
    'user-center': path.resolve(__dirname, 'src', 'page', 'user-center', 'index'),
    'user-center-update': path.resolve(__dirname, 'src', 'page', 'user-center-update', 'index'),
    'user-pw-update': path.resolve(__dirname, 'src', 'page', 'user-pw-update', 'index'),
    'detail': path.resolve(__dirname, 'src', 'page', 'detail', 'index'),
    'wishlist-add': path.resolve(__dirname, 'src', 'page', 'wishlist-add', 'index'),
    'wishlist': path.resolve(__dirname, 'src', 'page', 'wishlist', 'index'),
    'userGoods': path.resolve(__dirname, 'src', 'page', 'userGoods', 'index'),
    'userGoods-detail': path.resolve(__dirname, 'src', 'page', 'userGoods-detail', 'index'),
    'userGoods-trading': path.resolve(__dirname, 'src', 'page', 'userGoods-trading', 'index'),
    'about': path.resolve(__dirname, 'src', 'page', 'about', 'index'),
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '//s.xuanhuan.com/fe/dist/',
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
          use: ['css-loader?minimize=true', 'postcss-loader', 'sass-loader']
        })
      }, {
        test: /\.(gif|png|jpg|woff|woff2|eot|svg|ttf)\??.*$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'url-loader?limit=128&name=assets/[name].[ext]'
      }, {
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
  },

  externals: {
    'jquery': 'window.jQuery',
  },

  

  plugins: [
    //html模板处理
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '结果')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '物品列表')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register', '注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pw-reset', '注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center', '用户中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pw-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '物品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('wishlist-add', '加入愿望单')),
    new HtmlWebpackPlugin(getHtmlConfig('wishlist', '愿望清单')),
    new HtmlWebpackPlugin(getHtmlConfig('userGoods', '我的闲置')),
    new HtmlWebpackPlugin(getHtmlConfig('userGoods-detail', '闲置物品信息')),
    new HtmlWebpackPlugin(getHtmlConfig('userGoods-trading', '闲置物品交换')),
    new HtmlWebpackPlugin(getHtmlConfig('about', '关于玄换')),


    // 独立通用模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js',
    }),

    // 抽离css文件
    new ExtractTextPlugin('css/[name].css'),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ],
};