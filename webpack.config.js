const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'index'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'babel-loader',
    },{
      test: /\.css$/,
      use: [
          {
              loader: "style-loader"
          }, {
              loader: "css-loader",
              // options: {
              //     modules: true
              // }
          }, {
              loader: "postcss-loader"
          }
        ]
      },{ 
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192'
      }
      ]
    
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.scss']
  },
  devServer:{
    publicPath:'/'
  },

  plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'src/index.tmpl.html',
            title:'xuanhuan'
        })
  ],
};