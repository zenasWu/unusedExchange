const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var getHtmlConfig = function (name) {
  return {
    filename: name + '.html',
    template: 'src/view/' + name + '.tmp.html',
    title: 'xuanhuan',
    inject: true,
    hash: true,
    chunks: ['common', name],
    cache:false
  }
}

module.exports = {
  entry: {
    'common': path.resolve(__dirname, 'src', 'page', 'common', 'index'),
    'index': path.resolve(__dirname, 'src', 'page', 'index', 'index'),
    'login': path.resolve(__dirname, 'src', 'page', 'login', 'index')
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [{
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules'),
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
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
        test: /\.(gif|png|jpg)\??.*$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]'
      }
    ]
  },

  resolve: {
    extensions: ['.json', '.js', '.jsx', '.scss']
  },

  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'dist'),
    port:9090,
    // inline:false,
    inline:true,
    // hot:true,
    // stats: "errors-only"
  },

  plugins: [
    //html模板处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),

    // 独立通用模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js',
    }),

    // 抽离css文件
    new ExtractTextPlugin('css/[name].css'),

    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ],
};